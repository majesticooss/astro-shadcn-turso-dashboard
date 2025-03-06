import {
	adminClient,
	magicLinkClient,
	multiSessionClient,
	organizationClient,
	passkeyClient,
	phoneNumberClient,
	twoFactorClient
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";

export const client = createAuthClient({
	baseURL: "https://astro-shadcn-turso-dashboard.pages.dev",
	plugins: [
		organizationClient(),
		twoFactorClient(),
		passkeyClient(),
		adminClient(),
		multiSessionClient(),
		magicLinkClient(),
		phoneNumberClient(),
		adminClient()
	],
	fetchOptions: {
		onError(e) {
			if (e.error.status === 429) {
				toast.error("Too many requests. Please try again later.");
			}
		},
	},
});
export const {
	signUp,
	signIn,
	signOut,
	useSession,
	organization,
	useListOrganizations,
	useActiveOrganization,
	sendVerificationEmail,
} = client;
