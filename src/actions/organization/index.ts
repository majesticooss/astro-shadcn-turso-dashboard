import { defineAction } from "astro:actions";
import { uploadFile } from '@/lib/upload';
import { z } from "astro/zod";

const uploadSchema = z.object({
	file: z.instanceof(File, { message: "File is required" })
		.refine(
			file => file.type.startsWith('image/'),
			"Only image files are allowed"
		)
		.refine(
			file => file.size <= 200 * 1024,
			"File size must be less than 200KB"
		)
});

export const uploadOrganizationLogo = defineAction({
	input: uploadSchema,
	accept: 'form',
	async handler({ file }) {
		const url = await uploadFile({
			file,
			folder: 'organizations',
			allowedTypes: ['image/*'],
			maxSize: 200 * 1024,
		});
		return { url };
	}
});
