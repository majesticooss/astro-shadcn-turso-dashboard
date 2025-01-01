import { defineAction } from "astro:actions";
import { z } from "astro/zod";

// Schemas
const updateUsernameSchema = z.object({
	id: z.string(),
	name: z.string().min(2).max(32),
});

const UserRole = {
	ADMIN: "ADMIN",
	USER: "USER",
} as const;

const userRoleSchema = z.object({
	userId: z.string(),
	role: z.enum(Object.values(UserRole) as [string, ...string[]]),
});

// Actions
export const updateUsername = defineAction({
	input: updateUsernameSchema,
	handler: async ({ name }, { cookies, locals }) => {
		const user = locals.user;
		if (!user) {
			throw new Error("User not authenticated");
		}

		return { name };
	},
});

export const updateUserRole = defineAction({
	input: userRoleSchema,
	handler: async ({ role }, { cookies, locals }) => {
		const user = locals.user;
		if (!user) {
			throw new Error("User not authenticated");
		}

		return { role };
	},
});

