import { defineMiddleware } from "astro:middleware";
import { auth } from "@/lib/auth";

// Pages that don't require authentication
const PUBLIC_PAGES = ["/login", "/signup"];
const EXCLUDED_PAGES = ["/api"];

// All other pages require authentication
export const onRequest = defineMiddleware(async (context, next) => {
	const isAuthed = await auth.api
		.getSession({
			headers: context.request.headers,
		})
		.catch(() => null);

	if (isAuthed) {
		context.locals.user = isAuthed.user;
		context.locals.session = isAuthed.session;
	} else {
		context.locals.user = null;
		context.locals.session = null;
	}

	const currentPath = context.url.pathname;

	return next();
});
