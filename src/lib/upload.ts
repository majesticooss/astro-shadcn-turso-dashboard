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

export interface UploadOptions {
	file: File;
	folder?: string;
	allowedTypes?: string[];
	maxSize?: number;
}

export async function uploadFile({
	file,
	folder = "uploads",
	allowedTypes = ["image/*"],
	maxSize = 200 * 1024, // 200KB default
}: UploadOptions): Promise<string> {
	// Validate file type
	const isValidType = allowedTypes.some(type => {
		if (type.endsWith('/*')) {
			const baseType = type.split('/')[0];
			return file.type.startsWith(`${baseType}/`);
		}
		return file.type === type;
	});

	if (!isValidType) {
		throw new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
	}

	// Validate file size
	if (file.size > maxSize) {
		throw new Error(`File size exceeds ${maxSize / 1024}KB limit`);
	}

	const buffer = await file.arrayBuffer();
	const fileKey = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

	await S3.send(
		new PutObjectCommand({
			Bucket: R2_BUCKET_NAME,
			Key: fileKey,
			Body: Buffer.from(buffer),
			ContentType: file.type,
			CacheControl: 'public, max-age=31536000', // Cache for 1 year
		})
	);

	return `${R2_PUBLIC_URL}/${fileKey}`;
}
