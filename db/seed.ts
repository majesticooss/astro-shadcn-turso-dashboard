import { Session, User, db } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(User).values([
		{
			id: "1",
			username: "astro",
			hashed_password: "k36NX7tIvUlJU2zWW401xCa4DS+DDFwwjizexCKuIkQ=", // "test1234"
		},
		{
			id: "2",
			username: "db",
			hashed_password: "k36NX7tIvUlJU2zWW401xCa4DS+DDFwwjizexCKuIkQ=", // "test1234"
		},
	]);

	await db
		.insert(Session)
		.values([{ id: "1", expiresAt: new Date(), userId: "1" }]);
}
