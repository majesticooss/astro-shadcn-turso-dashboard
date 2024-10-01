import { DeleteAccountSection } from "@/components/dashboard/DeleteAccount";
import { DashboardHeader } from "@/components/dashboard/Header";
import { UserNameForm } from "@/components/forms/UserNameForm";
import { UserRoleForm } from "@/components/forms/UserRoleForm";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
	title: "Settings - Next Template",
	description: "Configure your account and website settings.",
});

export default async function SettingsPage({ user }: { user: User }) {
	return (
		<>
			<DashboardHeader
				heading="Settings"
				text="Manage account and website settings."
			/>
			<div className="divide-y divide-muted pb-10">
				<UserNameForm user={{ id: user.id, name: user?.username || "" }} />
				<UserRoleForm user={{ id: user.id, role: user.role }} />
				<DeleteAccountSection />
			</div>
		</>
	);
}
