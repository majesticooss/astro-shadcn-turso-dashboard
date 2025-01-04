"use client";

import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type PatientRecord = {
	id: string;
	patientId: string;
	patientName: string;
	treatmentDate: string;
	treatmentType: string;
	description: string;
	dentist: string;
	cost: number;
	status: "completed" | "scheduled" | "cancelled";
};

export const columns = (): ColumnDef<PatientRecord>[] => [
	{
		accessorKey: "treatmentDate",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Date
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
	},
	{
		accessorKey: "patientName",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Patient Name
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
	},
	{
		accessorKey: "treatmentType",
		header: "Treatment",
	},
	{
		accessorKey: "description",
		header: "Description",
	},
	{
		accessorKey: "dentist",
		header: "Dentist",
	},
	{
		accessorKey: "cost",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Cost
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => {
			const amount = Number.parseFloat(row.getValue("cost"));
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(amount);

			return <div className="text-right font-medium">{formatted}</div>;
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.getValue("status") as string;
			return (
				<div
					className={`capitalize ${
						status === "completed"
							? "text-green-600"
							: status === "scheduled"
								? "text-blue-600"
								: "text-red-600"
					}`}
				>
					{status}
				</div>
			);
		},
	},
];
