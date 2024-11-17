import { defineMiddleware } from "astro:middleware";
import { auth, userCanAccessResource } from "@/lib/auth";

export const onRequest = defineMiddleware(async (context, next) => {
	const session = await auth.api
		.getSession({
			headers: context.request.headers,
		})
		.catch((e) => {
			return null;
		});

	// Add session to locals so it's accessible in pages
	context.locals.session = session;

	if (context.url.pathname === "/dashboard" && !session) {
		return context.redirect("/");
	}
	return next();
});
