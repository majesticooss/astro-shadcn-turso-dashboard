import { randomUUID } from "node:crypto";
import { db } from "astro:db";
import { Account, Member, Organization, Session, User } from "astro:db";

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

	// Create accounts
	const test1234 = "8aa4e3c417ae301b30bb282ba46a297d:1ae40a78100fa97a4f3e9ad4434cbb83ff3d909fd330e304c46fc99bdfacec41a4947e88e7ea9f15b84b914ece5780c92e4b913cea734c1a25ba4633af6f74ad";

	for (const accountData of [
		{
			id: randomUUID(),
			accountId: randomUUID(),
			providerId: "credential",
			userId: users[0].id,
			accessToken: null,
			refreshToken: null,
			idToken: null,
			accessTokenExpiresAt: null,
			refreshTokenExpiresAt: null,
			scope: null,
			password: test1234,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	]) {
		await db.insert(Account).values(accountData).returning();
	}
}
