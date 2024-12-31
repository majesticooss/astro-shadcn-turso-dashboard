import { DeleteAccountSection } from "@/components/routes/dashboard/DeleteAccount";
import { DashboardHeader } from "@/components/routes/dashboard/Header";
import { UserNameForm } from "@/components/routes/settings/UserNameForm";
import { UserRoleForm } from "@/components/routes/settings/UserRoleForm";

interface SettingsPageProps {
	user: User | null;
}

export default function SettingsPage({ user }: SettingsPageProps) {
	if (!user) {
		return <div>Loading...</div>; // Or some other placeholder/error state
	}

	return (
		<>
			<DashboardHeader
				heading="Settings"
				text="Manage account and website settings."
			/>
			<div className="divide-y divide-muted pb-10">
				<UserNameForm user={{ id: user.id, name: user.name }} />
				<UserRoleForm user={{ id: user.id, role: null }} />
				<DeleteAccountSection
					user={{ id: user.id, name: user.name, image: user?.image }}
				/>
			</div>
		</>
	);
}
