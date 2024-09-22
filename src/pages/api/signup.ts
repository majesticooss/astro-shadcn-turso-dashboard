import { User, db } from "astro:db";
import { hashPassword, lucia } from "@/lib/auth";
import type { APIContext } from "astro";

export async function POST(context: APIContext): Promise<Response> {
	const formData = await context.request.formData();
	const email = formData.get("email");
	if (
		typeof email !== "string" ||
		!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
			email,
		)
	) {
		return new Response(JSON.stringify({ error: "Invalid email" }), {
			status: 400,
		});
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
				email: email,
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
			e.message.includes("UNIQUE constraint failed: User.email")
		) {
			return new Response(
				JSON.stringify({
					error: "email already used",
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
