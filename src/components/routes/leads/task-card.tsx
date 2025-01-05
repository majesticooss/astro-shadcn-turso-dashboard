"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	AlertCircle,
	Calendar,
	ChevronDown,
	ChevronUp,
	Clock,
	Phone,
} from "lucide-react";
import { useState } from "react";
import LeadDetails from "./lead-details";

interface TaskCardProps {
	task: {
		id: number;
		title: string;
		timestamp: string;
		type: "call" | "lead" | "followup";
		status?: string;
		notes?: string;
		leadDetails?: {
			name: string;
			topic: string;
			gdprStatus: string;
			contactPreferences: string;
			mobile: string;
			email: string;
			lastContact: {
				date: string;
				method: string;
			};
			isExistingPatient: boolean;
			paymentPlan: string;
		};
	};
}

export default function TaskCard({ task }: TaskCardProps) {
	const [expanded, setExpanded] = useState(false);
	const [showLeadDetails, setShowLeadDetails] = useState(false);

	const getIcon = (type: "call" | "lead" | "followup") => {
		switch (type) {
			case "call":
				return <Phone className="w-4 h-4 text-blue-500" />;
			case "lead":
				return <Calendar className="w-4 h-4 text-blue-500" />;
			case "followup":
				return <Clock className="w-4 h-4 text-blue-500" />;
		}
	};

	const handleClick = () => {
		if (task.type === "lead" && task.leadDetails) {
			setShowLeadDetails(!showLeadDetails);
		} else {
			setExpanded(!expanded);
		}
	};

	return (
		<Card
			className={`mb-2 ${task.status === "Overdue" ? "border-red-500" : ""}`}
		>
			<CardContent className="p-4">
				<div className="flex items-center justify-between">
					<div
						className="flex items-center space-x-2 flex-1 cursor-pointer"
						onClick={handleClick}
					>
						{getIcon(task.type)}
						<span className="font-medium">{task.title}</span>
					</div>
					<Button variant="ghost" size="sm" onClick={handleClick}>
						{showLeadDetails || expanded ? (
							<ChevronUp className="w-4 h-4" />
						) : (
							<ChevronDown className="w-4 h-4" />
						)}
					</Button>
				</div>
				<div className="text-sm text-gray-500 mt-1">{task.timestamp}</div>

				{expanded && task.status && (
					<div className="mt-2">
						<p>
							<strong>Status:</strong> {task.status}
						</p>
						<p>
							<strong>Notes:</strong> {task.notes}
						</p>
					</div>
				)}

				{task.status === "Overdue" && (
					<div className="flex items-center space-x-1 text-red-500 mt-2">
						<AlertCircle className="w-4 h-4" />
						<span className="text-sm">Overdue: {task.notes}</span>
					</div>
				)}

				{showLeadDetails && task.leadDetails && (
					<LeadDetails
						lead={task.leadDetails}
						onClose={() => setShowLeadDetails(false)}
					/>
				)}
			</CardContent>
		</Card>
	);
}
