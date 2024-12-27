import { LibsqlDialect } from "@libsql/kysely-libsql";
import { betterAuth } from "better-auth";
import { twoFactor } from "better-auth/plugins";

export const auth = betterAuth({
	database: {
		dialect: new LibsqlDialect({
			url:
				import.meta.env.ASTRO_DB_REMOTE_URL || process.env.ASTRO_DB_REMOTE_URL,
			authToken:
				import.meta.env.ASTRO_DB_APP_TOKEN || process.env.ASTRO_DB_APP_TOKEN,
		}),
		type: "sqlite",
		schema: {
			usersTable: "users",
			sessionsTable: "sessions",
			userColumns: {
				role: "text",
				customField: "text",
			},
		},
	},
	account: {
		accountLinking: {
			enabled: true,
			trustedProviders: ["google"],
		},
	},
	emailAndPassword: {
		enabled: true,
	},
	plugins: [
		twoFactor({
			otpOptions: {
				async sendOTP({ user, otp }, request) {
					console.log(`Sending OTP to ${user.email}: ${otp}`);
					// await resend.emails.send({
					// 	from: "Acme <no-reply@demo.better-auth.com>",
					// 	to: user.email,
					// 	subject: "Your OTP",
					// 	html: `Your OTP is ${otp}`,
					// });
				},
			},
		}),
	],
	rateLimit: {
		enabled: true,
	},
});

export async function userCanAccessResource(user: User | null, resource: URL) {
	// Check if the user has access to the resource
	return true;
}
