import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const R2_ACCOUNT_ID = import.meta.env.R2_ACCOUNT_ID || process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = import.meta.env.R2_ACCESS_KEY_ID || process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = import.meta.env.R2_SECRET_ACCESS_KEY || process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = import.meta.env.R2_BUCKET_NAME || process.env.R2_BUCKET_NAME;
const R2_PUBLIC_URL = import.meta.env.R2_PUBLIC_URL || process.env.R2_PUBLIC_URL;

if (!R2_ACCOUNT_ID) throw new Error("R2_ACCOUNT_ID is required");
if (!R2_ACCESS_KEY_ID) throw new Error("R2_ACCESS_KEY_ID is required");
if (!R2_SECRET_ACCESS_KEY) throw new Error("R2_SECRET_ACCESS_KEY is required");
if (!R2_BUCKET_NAME) throw new Error("R2_BUCKET_NAME is required");
if (!R2_PUBLIC_URL) throw new Error("R2_PUBLIC_URL is required");

const S3 = new S3Client({
	region: "auto",
	endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: R2_ACCESS_KEY_ID,
		secretAccessKey: R2_SECRET_ACCESS_KEY,
	},
});

export const config = {
	api: {
		bodyParser: false,
	},
};

export async function POST({ request }: { request: Request }) {
	try {
		const formData = await request.formData();
		const file = formData.get("file");

		if (!file || !(file instanceof File)) {
			return new Response(
				JSON.stringify({ error: "No file provided or invalid file" }),
				{
					status: 400,
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
		}

		// Validate file type
		if (!file.type.startsWith('image/')) {
			return new Response(
				JSON.stringify({ error: "Only image files are allowed" }),
				{
					status: 400,
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
		}

		const buffer = await file.arrayBuffer();
		const fileKey = `organizations/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

		await S3.send(
			new PutObjectCommand({
				Bucket: R2_BUCKET_NAME,
				Key: fileKey,
				Body: Buffer.from(buffer),
				ContentType: file.type,
				CacheControl: 'public, max-age=31536000', // Cache for 1 year
			})
		);

		const publicUrl = `${R2_PUBLIC_URL}/${fileKey}`;

		return new Response(
			JSON.stringify({ url: publicUrl }),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	} catch (error) {
		console.error("Upload error:", error);
		return new Response(
			JSON.stringify({
				error: "Upload failed",
				details: error instanceof Error ? error.message : "Unknown error"
			}),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	}
}
