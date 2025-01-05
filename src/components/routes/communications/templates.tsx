"use client";

import { PlusCircle, Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { templates } from "./templates-client";
import type { TemplateType } from "./templates-client";
import { DataTable } from "./templates-table";

export function Templates() {
	const [activeTab, setActiveTab] = useState<TemplateType>("email");
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");

	const filteredTemplates = templates.filter((template) => {
		const matchesTab = template.type === activeTab;
		const matchesSearch = template.name
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesStatus =
			statusFilter === "all" || template.status === statusFilter;

		return matchesTab && matchesSearch && matchesStatus;
	});

	return (
		<Tabs
			defaultValue="email"
			className="w-full"
			onValueChange={(value) => setActiveTab(value as TemplateType)}
		>
			<TabsList>
				<TabsTrigger value="email">Email</TabsTrigger>
				<TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
				<TabsTrigger value="sms">SMS</TabsTrigger>
			</TabsList>
			<div className="my-4 flex items-center gap-4">
				<div className="relative flex-1 max-w-sm">
					<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search templates"
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
				<Button className="ml-auto">
					<PlusCircle className="mr-2 h-4 w-4" /> New Template
				</Button>
			</div>
			<TabsContent value="email">
				<DataTable data={filteredTemplates} />
			</TabsContent>
			<TabsContent value="whatsapp">
				<DataTable data={filteredTemplates} />
			</TabsContent>
			<TabsContent value="sms">
				<DataTable data={filteredTemplates} />
			</TabsContent>
		</Tabs>
	);
}
