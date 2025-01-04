"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export type Patient = {
	id: string;
	name: string;
	email: string;
	phone: string;
	dateOfBirth: string;
	lastVisit: string | null;
	nextAppointment: string | null;
	status: "active" | "inactive";
};

const PatientActions = ({ patient }: PatientActionsProps) => {
	return (
		<Button
			variant="outline"
			size="sm"
			onClick={() => (window.location.href = `/patients/${patient.id}`)}
		>
			View
		</Button>
	);
};

export const columns = (): ColumnDef<Patient>[] => [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Name
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
	},
	{
		accessorKey: "email",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Email
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
	},
	{
		accessorKey: "phone",
		header: "Phone",
	},
	{
		accessorKey: "lastVisit",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Last Visit
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
	},
	{
		accessorKey: "nextAppointment",
		header: "Next Appointment",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<div
				className={`capitalize ${row.getValue("status") === "active" ? "text-green-600" : "text-red-600"}`}
			>
				{row.getValue("status")}
			</div>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const patient = row.original;
			return <PatientActions patient={patient} />;
		},
	},
];
