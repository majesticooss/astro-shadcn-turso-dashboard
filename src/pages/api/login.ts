import { User, db, eq } from "astro:db";
import { comparePasswords, lucia } from "@/lib/auth";
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
		return new Response(JSON.stringify({ error: "Invalid password" }), {
			status: 400,
		});
	}

	const existingUser = await db
		.select()
		.from(User)
		.where(eq(User.email, email))
		.get();
	if (!existingUser) {
		return new Response(
			JSON.stringify({
				error: "Incorrect email or password",
			}),
			{
				status: 400,
			},
		);
	}

	const validPassword = await comparePasswords(
		existingUser.hashed_password,
		password,
	);
	if (!validPassword) {
		return new Response(
			JSON.stringify({
				error: "Incorrect email or password",
			}),
			{
				status: 400,
			},
		);
	}

	const session = await lucia.createSession(existingUser.id.toString(), {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	context.cookies.set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);

	return new Response();
}
