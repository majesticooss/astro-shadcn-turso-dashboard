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
			image: null,
			createdAt: new Date(),
			updatedAt: new Date(),
			phoneNumber: "+1234567890",
			phoneNumberVerified: true,
			role: "admin",
			banned: false,
			banReason: null,
			banExpires: null,
			twoFactorEnabled: false,
		},
		{
			id: randomUUID(),
			name: "Jane Smith",
			email: "jane@example.com",
			emailVerified: true,
			image: null,
			createdAt: new Date(),
			updatedAt: new Date(),
			phoneNumber: "+1987654321",
			phoneNumberVerified: true,
			role: "user",
			banned: false,
			banReason: null,
			banExpires: null,
			twoFactorEnabled: true,
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
			logo: null,
			createdAt: new Date(),
			metadata: JSON.stringify({ plan: "pro" }),
		},
		{
			id: randomUUID(),
			name: "Startup Inc",
			slug: "startup-inc",
			logo: null,
			createdAt: new Date(),
			metadata: JSON.stringify({ plan: "basic" }),
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
			role: "member",
			createdAt: new Date(),
		},
	]) {
		await db.insert(Member).values(memberData).returning();
	}

	// Create sessions
	for (const sessionData of [
		{
			id: randomUUID(),
			expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
			token: randomUUID(),
			createdAt: new Date(),
			updatedAt: new Date(),
			ipAddress: "192.168.1.1",
			userAgent: "Mozilla/5.0",
			userId: users[0].id,
			activeOrganizationId: organizations[0].id,
			impersonatedBy: null,
		},
	]) {
		await db.insert(Session).values(sessionData).returning();
	}

	// Create accounts
	const TEST_PASSWORD = "password123";
	const TEST_PASSWORD_HASH = "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u";

	for (const accountData of [
		{
			id: randomUUID(),
			accountId: "local_1",
			providerId: "credentials",
			userId: users[0].id,
			accessToken: null,
			refreshToken: null,
			idToken: null,
			accessTokenExpiresAt: null,
			refreshTokenExpiresAt: null,
			scope: null,
			password: TEST_PASSWORD_HASH,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			id: randomUUID(),
			accountId: "github_123",
			providerId: "github",
			userId: users[1].id,
			accessToken: "gho_token",
			refreshToken: "ghr_token",
			idToken: null,
			accessTokenExpiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000),
			refreshTokenExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
			scope: "read:user",
			password: null,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	]) {
		await db.insert(Account).values(accountData).returning();
	}
}
