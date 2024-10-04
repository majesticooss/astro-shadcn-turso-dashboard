import { defineAction } from "astro:actions";
import { z } from "astro/zod";

const updateUsernameSchema = z.object({
	name: z.string().min(2).max(32),
});

export const updateUsername = defineAction({
	input: updateUsernameSchema,
	handler: async ({ name }, { cookies, locals }) => {
		// Assuming you have a user in locals from your auth setup
		const user = locals.user;
		if (!user) {
			throw new Error("User not authenticated");
		}

		// Update the user's name in your database
		// This is a placeholder - replace with your actual database update logic
		// await db.user.update({ where: { id: user.id }, data: { name } });

		// For demonstration, we'll just return the new name
		return {
			success: true,
			data: { name },
		};
	},
});
