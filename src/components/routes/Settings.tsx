import { DeleteAccountSection } from "@/components/dashboard/DeleteAccount";
import { DashboardHeader } from "@/components/dashboard/Header";
import { UserNameForm } from "@/components/forms/UserNameForm";
import { UserRoleForm } from "@/components/forms/UserRoleForm";
import React from "react";

interface User {
	id: string;
	username: string;
	role: string;
}

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
				<UserNameForm user={{ id: user.id, name: user.username || "" }} />
				<UserRoleForm user={{ id: user.id, role: user.role }} />
				<DeleteAccountSection />
			</div>
		</>
	);
}
