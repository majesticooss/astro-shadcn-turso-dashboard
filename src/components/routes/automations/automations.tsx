"use client";

import { PlusCircle, Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DataTable } from "./automations-table";

// Use the same mock data from before
const automations = [
	{
		id: 1,
		name: "Appointment Reminder",
		trigger: "24h before appointment",
		status: "active",
		actions: ["Send SMS", "Send Email"],
		lastModified: "2024-03-15",
	},
	{
		id: 2,
		name: "Follow-up After Treatment",
		trigger: "2 days after treatment",
		status: "active",
		actions: ["Send Email"],
		lastModified: "2024-03-14",
	},
	{
		id: 3,
		name: "Recall Reminder",
		trigger: "6 months after last visit",
		status: "inactive",
		actions: ["Send SMS", "Send Email"],
		lastModified: "2024-03-10",
	},
	{
		id: 4,
		name: "Birthday Greeting",
		trigger: "On patient birthday",
		status: "active",
		actions: ["Send Email"],
		lastModified: "2024-03-08",
	},
	{
		id: 5,
		name: "Treatment Plan Follow-up",
		trigger: "Manual trigger",
		status: "draft",
		actions: ["Send WhatsApp"],
		lastModified: "2024-03-01",
	},
];

export function Automations() {
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");

	const filteredAutomations = automations.filter((automation) => {
		const matchesSearch = automation.name
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesStatus =
			statusFilter === "all" || automation.status === statusFilter;

		return matchesSearch && matchesStatus;
	});

	return (
		<div className="w-full space-y-4">
			<div className="flex items-center gap-4">
				<div className="relative flex-1 max-w-sm">
					<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search automations"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-8 pr-4 py-2"
					/>
				</div>
				<Select value={statusFilter} onValueChange={setStatusFilter}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Select status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All statuses</SelectItem>
						<SelectItem value="active">Active</SelectItem>
						<SelectItem value="inactive">Inactive</SelectItem>
						<SelectItem value="draft">Draft</SelectItem>
					</SelectContent>
				</Select>
				<Link href="/automations/new" className="ml-auto">
					<Button>
						<PlusCircle className="mr-2 h-4 w-4" /> New Automation
					</Button>
				</Link>
			</div>
			<DataTable data={filteredAutomations} />
		</div>
	);
}
