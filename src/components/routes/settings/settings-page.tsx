interface SettingsPageProps {
	user: User | null;
	member: Member | null;
}

export default function SettingsPage({ user, member }: SettingsPageProps) {
	if (!user) {
		return <div>Loading...</div>; // Or some other placeholder/error state
	}

	return <div className="divide-y divide-muted pb-10" />;
}
