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

const UserRole = {
	ADMIN: "ADMIN",
	USER: "USER",
	// Add other roles as needed
};

const userRoleSchema = z.object({
	role: z.enum(Object.values(UserRole) as [string, ...string[]]),
});

export const updateUserRole = defineAction({
	input: userRoleSchema,
	handler: async ({ role }, { cookies, locals }) => {
		try {
			// Assuming you have a user in locals from your auth setup
			const user = locals.user;
			if (!user) {
				throw new Error("User not authenticated");
			}

			// Update the user role in your database

			// For Astro, you might need to handle cache invalidation differently
			// instead of using Next.js's revalidatePath
			// You could potentially set a cookie or return a value to trigger a reload

			return {
				success: true,
				data: { role },
			};
		} catch (error) {
			console.error(error);
			return {
				success: false,
				error: "Failed to update user role",
			};
		}
	},
});
