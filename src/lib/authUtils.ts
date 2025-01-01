import { auth } from "@/lib/auth";

const DASHBOARD_PATH = "/dashboard";
const LOGIN_PATH = "/login";
const ONBOARDING_PATH = "/onboarding";

// Paths that should be accessible without an organization
const PUBLIC_PATHS = [
	LOGIN_PATH,
	"/signup",
	"/forgot-password",
];

export async function checkPageRedirect(url: URL, user: User | null, session: Session | null): Promise<string | null> {
	// If user is not authenticated and isn't on a public page,
	// redirect them to login
	if (!session && !PUBLIC_PATHS.includes(url.pathname)) {
		return LOGIN_PATH;
	}

	const isPublicPath = PUBLIC_PATHS.some(path => url.pathname.startsWith(path));

	// Check if user has an active organization using the session
	const hasOrganization = (session as any)?.activeOrganizationId;

	// If user has no organization and isn't on a public page,
	// redirect them to onboarding
	if (!isPublicPath && !hasOrganization && !url.pathname.startsWith(ONBOARDING_PATH)) {
		return ONBOARDING_PATH;
	}

	// If user has an organization and tries to access login page,
	// redirect to dashboard
	if (hasOrganization && url.pathname === LOGIN_PATH) {
		return DASHBOARD_PATH;
	}

	return null;
}

export async function userCanAccessResource(user: User | null, resource: URL) {
	// Check if the user has access to the resource
	return true;
}
