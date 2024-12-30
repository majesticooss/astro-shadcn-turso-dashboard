import { LibsqlDialect } from "@libsql/kysely-libsql";
import { type BetterAuthOptions, betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { admin, emailOTP, magicLink, organization, phoneNumber, twoFactor } from "better-auth/plugins";
import { mailConfig } from "config";
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY);

// Primary database connection for auth and organizations
function getPrimaryDatabaseUrl() {
	if (import.meta.env.DEV) {
		return 'file:./.astro/content.db'
	}
	return import.meta.env.ASTRO_DB_REMOTE_URL || process.env.ASTRO_DB_REMOTE_URL
}

const config: BetterAuthOptions = {
	database: {
		dialect: new LibsqlDialect({
			url: getPrimaryDatabaseUrl(),
			// Only include authToken for remote database
			...(import.meta.env.DEV
				? {}
				: { authToken: import.meta.env.ASTRO_DB_APP_TOKEN || process.env.ASTRO_DB_APP_TOKEN }
			),
		}),
		type: "sqlite",
		// schema: {
		// 	usersTable: "users",
		// 	sessionsTable: "sessions",
		// 	userColumns: {
		// 		role: "text",
		// 	},
		// },
	},
	account: {
		accountLinking: {
			enabled: true,
			trustedProviders: ["google"],
		},
	},
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ user, url, token }, request) => {
			await resend.emails.send({
				from: mailConfig.from,
				to: user.email,
				subject: "Verify your email",
				html: `Click this link to verify your account: <a href="${url}">${url}</a>`,
			});
		}
	},
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		autoSignIn: true,
		sendResetPassword: async ({ user, url, token }, request) => {
			await resend.emails.send({
				from: mailConfig.from,
				to: user.email,
				subject: "Reset your password",
				html: `Click this link to reset your password: <a href="${url}">${url}</a>`,
			});
		}
	},
	plugins: [
		phoneNumber({
			sendOTP: ({ phoneNumber, code }, request) => {
				// Implement sending OTP code via SMS
			},
			signUpOnVerification: {
				getTempEmail: (phoneNumber) => {
					return `${phoneNumber}@my-site.com`
				},
				//optionally you can alos pass `getTempName` function to generate a temporary name for the user
				getTempName: (phoneNumber) => {
					return phoneNumber //by default it will use the phone number as the name
				}
			}
		}),
		emailOTP({
			async sendVerificationOTP({
				email,
				otp,
				type
			}) {
				if (type === "sign-in") {
					// Send the OTP for sign-in
				} else if (type === "email-verification") {
					// Send the OTP for email verification
				} else {
					// Send the OTP for password reset
				}
			},
		}),
		magicLink({
			sendMagicLink: async ({ email, token, url }, request) => {
				// send email to user
			}
		}),
		organization({
			async sendInvitationEmail(data) {
				await resend.emails.send({
					from: mailConfig.from,
					to: data.email,
					subject: "You've been invited to join an organization",
					html: `You've been invited to join an organization:`,
				});
			},
			allowUserToCreateOrganization: async (user) => {
				return true;
			},
		}),
		admin(),
		twoFactor({
			otpOptions: {
				async sendOTP({ user, otp }, request) {
					console.log(`Sending OTP to ${user.email}: ${otp}`);
					await resend.emails.send({
						from: mailConfig.from,
						to: user.email,
						subject: "Your OTP",
						html: `Your OTP is ${otp}`,
					});
				},
			},
		}),
	],
	rateLimit: {
		enabled: true,
	},
}

export const auth = betterAuth(config);

export async function userCanAccessResource(user: User | null, resource: URL) {
	// Check if the user has access to the resource
	return true;
}
