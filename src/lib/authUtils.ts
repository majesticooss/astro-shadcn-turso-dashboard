import { Member, Organization, Session, db, eq } from 'astro:db';
import { auth } from "@/lib/auth";
import { organization } from "@/lib/authClient";
import type { AstroGlobal } from "astro";

const DASHBOARD_PATH = "/dashboard";
const LOGIN_PATH = "/login";
const ONBOARDING_PATH = "/onboarding";

// Paths that should be accessible without an organization
const PUBLIC_PATHS = [
	LOGIN_PATH,
	"/signup",
	"/forgot-password",
];

export async function getPageData(ctx: AstroGlobal) {
	const { session, user } = ctx.locals;

	let currentOrganization = null;

	let userOrganizations: OrganizationAndMember[] = [];

	if (session) {
		const results = await db.select()
			.from(Member)
			.leftJoin(Organization, eq(Member.organizationId, Organization.id))
			.where(eq(Member.userId, session.userId));

		userOrganizations = results.map(r => ({
			...r.Organization,
			Member: r.Member
		})) as OrganizationAndMember[];

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		if ((session as any).activeOrganizationId && userOrganizations.length > 0) {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			currentOrganization = userOrganizations.find(org => org?.id === (session as any).activeOrganizationId);

			if (!currentOrganization) {
				currentOrganization = userOrganizations[0].id;
			}
		}
	}

	const redirect = await checkPageRedirect(ctx.url, user, session, userOrganizations);

	const { data: member, error } = await organization.getActiveMember();

	return {
		currentOrganization: currentOrganization,
		user: user,
		session: session,
		currentPath: ctx.url.pathname,
		redirect: redirect,
		member: member,
	}
}

export async function checkPageRedirect(
	url: URL,
	user: User | null,
	session: Session | null,
	userOrganizations: OrganizationAndMember[]
): Promise<string | null> {
	// If user is not authenticated and isn't on a public page,
	// redirect them to login
	if (!session && !PUBLIC_PATHS.includes(url.pathname)) {
		return LOGIN_PATH;
	}

	const isPublicPath = PUBLIC_PATHS.some(path => url.pathname.startsWith(path));

	if (session) {
		// Check if user has an active organization using the session
		let hasOrganization = (session as any)?.activeOrganizationId;

		// If there is no active organization
		// Check if the user has at least one organization
		if (!isPublicPath && !hasOrganization && !url.pathname.startsWith(ONBOARDING_PATH)) {
			// If user has no organization and isn't on a public page,
			// redirect them to onboarding
			if (userOrganizations.length === 0) {
				return ONBOARDING_PATH;
			}

			// Set the session activeOrganizationId to the first organization
			await db.update(Session).set({
				activeOrganizationId: userOrganizations[0].id,
			}).where(eq(Session.id, session.id));

			hasOrganization = true;
		}

		// If user has an organization and tries to access login page or onboarding page,
		// redirect to dashboard
		if (hasOrganization && (url.pathname === LOGIN_PATH || url.pathname === ONBOARDING_PATH)) {
			return DASHBOARD_PATH;
		}
	}

	return null;
}

export async function userCanAccessResource(user: User | null, resource: URL) {
	// Check if the user has access to the resource
	return true;
}
