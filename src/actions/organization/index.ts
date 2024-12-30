import { defineAction } from "astro:actions";
import { createOrganizationDatabase } from "@/lib/db";
import { z } from "astro/zod";

const organizationSchema = z.object({
	slug: z.string(),
	name: z.string()
});

export const createOrganization = defineAction({
	input: organizationSchema,
	handler: async ({ slug, name }, { cookies, locals }) => {
		try {
			const database = await createOrganizationDatabase({ slug, name });
			return {
				success: true,
				data: database
			};
		} catch (error) {
			console.error("Error creating organization:", error);
			return {
				success: false,
				error: "Failed to create organization database"
			};
		}
	}
});
