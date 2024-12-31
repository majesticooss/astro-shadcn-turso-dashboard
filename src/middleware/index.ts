import { defineMiddleware } from "astro:middleware";
import { auth } from "@/lib/auth";

const DASHBOARD_PATH = "/dashboard";
const LOGIN_PATH = "/login";
const PRIVATE_PATHS = [DASHBOARD_PATH, "/settings"];

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

	if (PRIVATE_PATHS.some(path => context.url.pathname.startsWith(path))) {
		// If user is not authenticated, redirect to login
		if (!session) {
			return context.redirect(LOGIN_PATH);
		}
	}
	// If user is authenticated and the route is login go to dashboard
	if (session && context.url.pathname === LOGIN_PATH) {
		return context.redirect(DASHBOARD_PATH);
	}

	return next();
});
