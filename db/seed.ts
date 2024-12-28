import { db } from "astro:db";
import { Account, Session, User, Organization, Member } from "astro:db";
import { randomUUID } from "crypto";

export default async function seed() {
	// Create test users
	const users = [];
	for (const userData of [
		{
			id: randomUUID(),
			name: "John Doe",
			email: "john@example.com",
			emailVerified: true,
			createdAt: new Date(),
			updatedAt: new Date(),
			twoFactorEnabled: false,
			phoneNumber: "+1234567890",
			phoneNumberVerified: true,
			role: "admin",
			banned: false,
			banReason: null,
			banExpires: null,
		},
		{
			id: randomUUID(),
			name: "Jane Smith",
			email: "jane@example.com",
			emailVerified: true,
			createdAt: new Date(),
			updatedAt: new Date(),
			twoFactorEnabled: true,
			phoneNumber: "+1987654321",
			phoneNumberVerified: true,
			role: "user",
			banned: false,
			banReason: null,
			banExpires: null,
		},
		{
			id: randomUUID(),
			name: "Bob Wilson",
			email: "bob@example.com",
			emailVerified: false,
			createdAt: new Date(),
			updatedAt: new Date(),
			twoFactorEnabled: false,
			phoneNumber: null,
			phoneNumberVerified: false,
			role: "user",
			banned: true,
			banReason: "Violation of terms of service",
			banExpires: new Date("2024-12-31"),
		},
	]) {
		const [user] = await db.insert(User).values(userData).returning();
		users.push(user);
	}

	// Create organizations
	const organizations = [];
	for (const orgData of [
		{
			id: randomUUID(),
			name: "Acme Corp",
			slug: "acme-corp",
			logo: "https://ui-avatars.com/api/?name=Acme+Corp",
			createdAt: new Date(),
			metadata: JSON.stringify({
				industry: "Technology",
				size: "Enterprise",
				plan: "pro",
			}),
		},
		{
			id: randomUUID(),
			name: "Startup Inc",
			slug: "startup-inc",
			logo: "https://ui-avatars.com/api/?name=Startup+Inc",
			createdAt: new Date(),
			metadata: JSON.stringify({
				industry: "Software",
				size: "Startup",
				plan: "basic",
			}),
		},
	]) {
		const [org] = await db.insert(Organization).values(orgData).returning();
		organizations.push(org);
	}

	// Create organization members
	for (const memberData of [
		{
			id: randomUUID(),
			organizationId: organizations[0].id,
			userId: users[0].id,
			role: "owner",
			createdAt: new Date(),
		},
		{
			id: randomUUID(),
			organizationId: organizations[0].id,
			userId: users[1].id,
			role: "admin",
			createdAt: new Date(),
		},
		{
			id: randomUUID(),
			organizationId: organizations[1].id,
			userId: users[1].id,
			role: "owner",
			createdAt: new Date(),
		},
	]) {
		await db.insert(Member).values(memberData).returning();
	}

	// Create sessions
	for (const sessionData of [
		{
			id: randomUUID(),
			userId: users[0].id,
			token: randomUUID(),
			expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
			createdAt: new Date(),
			updatedAt: new Date(),
			ipAddress: "192.168.1.1",
			userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
			activeOrganizationId: organizations[0].id,
			impersonatedBy: null,
		},
		{
			id: randomUUID(),
			userId: users[1].id,
			token: randomUUID(),
			expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
			createdAt: new Date(),
			updatedAt: new Date(),
			ipAddress: "10.0.0.1",
			userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15",
			activeOrganizationId: organizations[1].id,
			impersonatedBy: null,
		},
	]) {
		await db.insert(Session).values(sessionData).returning();
	}

	// Create accounts with different providers
	for (const accountData of [
		{
			id: randomUUID(),
			userId: users[0].id,
			accountId: "local_1",
			providerId: "credentials",
			password: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u", // "password123" hashed
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			id: randomUUID(),
			userId: users[1].id,
			accountId: "github_123456",
			providerId: "github",
			accessToken: "gho_" + randomUUID().replace(/-/g, ""),
			refreshToken: "ghr_" + randomUUID().replace(/-/g, ""),
			accessTokenExpiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours from now
			refreshTokenExpiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
			scope: "read:user user:email",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			id: randomUUID(),
			userId: users[1].id,
			accountId: "google_789012",
			providerId: "google",
			accessToken: "ya29." + randomUUID().replace(/-/g, ""),
			refreshToken: "1//04d" + randomUUID().replace(/-/g, ""),
			accessTokenExpiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
			refreshTokenExpiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 180 days from now
			scope: "openid email profile",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	]) {
		await db.insert(Account).values(accountData).returning();
	}
}
