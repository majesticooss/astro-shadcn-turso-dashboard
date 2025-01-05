import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AutomationHeaderProps {
	initialIsActive: boolean;
	onToggleActive: (isActive: boolean) => void;
	onSave: () => void;
}

export function AutomationHeader({
	initialIsActive,
	onToggleActive,
	onSave,
}: AutomationHeaderProps) {
	const [isActive, setIsActive] = useState(initialIsActive);

	const handleToggle = () => {
		const newState = !isActive;
		setIsActive(newState);
		onToggleActive(newState);
	};

	return (
		<div className="flex items-center justify-between pb-3">
			<a href="/automations" className="inline-flex">
				<Button variant="outline">Back to List</Button>
			</a>
			<div className="flex gap-2">
				<Button
					variant={isActive ? "secondary" : "success"}
					onClick={handleToggle}
				>
					{isActive ? "Deactivate" : "Activate"} Automation
				</Button>
				<Button onClick={onSave}>Save Changes</Button>
			</div>
		</div>
	);
}
