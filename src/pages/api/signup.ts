import { User, db } from "astro:db";
import { hashPassword, lucia } from "@/lib/auth";
import type { APIContext } from "astro";

export async function POST(context: APIContext): Promise<Response> {
	const formData = await context.request.formData();
	const username = formData.get("username");
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return new Response(
			JSON.stringify({
				error: "Invalid username",
			}),
			{
				status: 400,
			},
		);
	}
	const password = formData.get("password");
	if (
		typeof password !== "string" ||
		password.length < 6 ||
		password.length > 255
	) {
		return new Response(
			JSON.stringify({
				error: "Invalid password",
			}),
			{
				status: 400,
			},
		);
	}

	const hashedPassword = await hashPassword(password);

	try {
		const result = await db
			.insert(User)
			.values({
				username: username,
				hashed_password: hashedPassword,
			})
			.returning({ insertedId: User.id });

		const userId = result[0].insertedId;

		const session = await lucia.createSession(userId.toString(), {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		context.cookies.set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		);

		return new Response();
	} catch (e) {
		if (
			e instanceof Error &&
			e.message.includes("UNIQUE constraint failed: User.username")
		) {
			return new Response(
				JSON.stringify({
					error: "Username already used",
				}),
				{
					status: 400,
				},
			);
		}
		console.error("Signup error:", e);
		return new Response(
			JSON.stringify({
				error: "An unknown error occurred",
			}),
			{
				status: 500,
			},
		);
	}
}
