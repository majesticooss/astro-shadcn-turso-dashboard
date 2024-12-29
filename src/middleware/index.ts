import { defineMiddleware } from "astro:middleware";
import { auth } from "@/lib/auth";

// Pages that don't require authentication
const PUBLIC_PAGES = ["/login", "/signup"];
const EXCLUDED_PAGES = ["/api"];

// All other pages require authentication
export const onRequest = defineMiddleware(async (context, next) => {
	const session = await auth.api
		.getSession({
			headers: context.request.headers,
		})
		.catch(() => null);

	if (session) {
		context.locals.user = session.user;
		context.locals.session = session.session;
	} else {
		context.locals.user = null;
		context.locals.session = null;
	}

	return next();
});
