/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type { Session, User } from "lucia";

declare global {
	namespace App {
		interface Locals {
			user: User | null;
			session: Session | null;
		}
	}
}
