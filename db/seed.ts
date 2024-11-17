import { db } from "astro:db";
import { Account, Session, User } from "astro:db";

export default async function seed() {
	// Create test users
	await db.insert(User).values([
		{
			id: "user_1",
			name: "John Doe",
			email: "john@example.com",
			emailVerified: true,
			createdAt: new Date(),
			updatedAt: new Date(),
			twoFactorEnabled: false,
		},
		{
			id: "user_2",
			name: "Jane Smith",
			email: "jane@example.com",
			emailVerified: true,
			createdAt: new Date(),
			updatedAt: new Date(),
			twoFactorEnabled: false,
		},
	]);

	// Create sessions for users
	await db.insert(Session).values([
		{
			id: "session_1",
			userId: "user_1",
			expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
			ipAddress: "127.0.0.1",
			userAgent: "Mozilla/5.0 (Example Browser)",
		},
	]);

	// Create accounts (e.g., password-based authentication)
	await db.insert(Account).values([
		{
			id: "account_1",
			userId: "user_1",
			accountId: "local_1",
			providerId: "credentials",
			password: "hashed_password_here", // In real app, this should be properly hashed
		},
		{
			id: "account_2",
			userId: "user_2",
			accountId: "github_1",
			providerId: "github",
			accessToken: "github_access_token",
			refreshToken: "github_refresh_token",
		},
	]);
}
