import { Session, User, db } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(User).values([
		{
			email: "test@test.it",
			hashed_password: "k36NX7tIvUlJU2zWW401xCa4DS+DDFwwjizexCKuIkQ=", // "test1234"
		},
		{
			email: "test2@test.it",
			hashed_password: "k36NX7tIvUlJU2zWW401xCa4DS+DDFwwjizexCKuIkQ=", // "test1234"
		},
	]);

	await db
		.insert(Session)
		.values([{ id: "1", expiresAt: new Date(), userId: 1 }]);
}
