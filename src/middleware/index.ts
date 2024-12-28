import { defineMiddleware } from "astro:middleware";
import { auth } from "@/lib/auth";

// Pages that don't require authentication
const PUBLIC_PAGES = ["/login", "/signup"];

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

	// If user is logged in and tries to access login/signup pages,
	// redirect them to dashboard
	if (session && (PUBLIC_PAGES.includes(currentPath) || currentPath === "/")) {
		return context.redirect("/dashboard");
	}

	// If user is not logged in and tries to access any non-public page,
	// redirect them to login
	if (!session && !PUBLIC_PAGES.includes(currentPath) && currentPath !== "/") {
		return context.redirect("/login");
	}

	return next();
});
