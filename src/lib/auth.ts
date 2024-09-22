import { Session, User, db } from "astro:db";
import { Lucia, type User as UserType } from "lucia";
import { AstroDBAdapter } from "lucia-adapter-astrodb";

const adapter = new AstroDBAdapter(db, Session, User);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: import.meta.env.PROD,
		},
	},
	getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			username: attributes.username,
		};
	},
});

export async function hashPassword(password: string): Promise<string> {
	const encoder = new TextEncoder();
	const data = encoder.encode(password);
	const hash = await crypto.subtle.digest("SHA-256", data);
	return btoa(String.fromCharCode(...new Uint8Array(hash)));
}

export async function userCanAccessResource(user: UserType, resource: string) {
	// Check if the user has access to the resource
	return true;
}

export async function comparePasswords(
	storedHash: string,
	password: string,
): Promise<boolean> {
	const hashedPassword = await hashPassword(password);
	return storedHash === hashedPassword;
}

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	username: string;
}
