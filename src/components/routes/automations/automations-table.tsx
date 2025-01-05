"use client";

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

type Automation = {
	id: number;
	name: string;
	trigger: string;
	status: string;
	actions: string[];
	lastModified: string;
};

type StatusVariant = "default" | "secondary" | "destructive" | "outline";

const columns: ColumnDef<Automation>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "trigger",
		header: "Trigger",
	},
	{
		accessorKey: "actions",
		header: "Actions",
		cell: ({ row }) => (
			<div className="flex gap-1">
				{row.original.actions.map((action) => (
					<Badge key={`${row.original.id}-${action}`} variant="secondary">
						{action}
					</Badge>
				))}
			</div>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.original.status;
			let variant: StatusVariant = "default";

			if (status === "active") variant = "outline";
			else if (status === "inactive") variant = "secondary";

			return <Badge variant={variant}>{status}</Badge>;
		},
	},
	{
		accessorKey: "lastModified",
		header: "Last Modified",
	},
];

interface DataTableProps {
	data: Automation[];
}

export function DataTable({ data }: DataTableProps) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No automations found.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
