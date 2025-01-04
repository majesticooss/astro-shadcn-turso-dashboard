"use client";

import {
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	type VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { type Patient, columns } from "./columns";

// Mock data fetching function
const fetchPatients = async (
	page: number,
	pageSize: number,
	sorting: SortingState,
	filters: ColumnFiltersState,
): Promise<{ data: Patient[]; totalCount: number }> => {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 100));

	// Mock data
	const mockData: Patient[] = Array.from({ length: 50 }, (_, i) => ({
		id: `PAT${(i + 1).toString().padStart(4, "0")}`,
		name: `Patient ${i + 1}`,
		email: `patient${i + 1}@example.com`,
		phone: `+1 555-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
		dateOfBirth: "1990-01-01",
		lastVisit: i % 3 === 0 ? "2024-02-15" : null,
		nextAppointment: i % 4 === 0 ? "2024-03-20" : null,
		status: i % 5 === 0 ? "inactive" : "active",
	}));

	// Apply filters
	let filteredData = [...mockData];
	filters.forEach((filter) => {
		filteredData = filteredData.filter((item) =>
			String(item[filter.id as keyof Patient])
				.toLowerCase()
				.includes(String(filter.value).toLowerCase()),
		);
	});

	// Apply sorting
	if (sorting.length > 0) {
		const { id, desc } = sorting[0];
		filteredData.sort((a, b) => {
			const aValue = a[id as keyof Patient];
			const bValue = b[id as keyof Patient];
			if (aValue === bValue) return 0;
			if (aValue === null) return desc ? -1 : 1;
			if (bValue === null) return desc ? 1 : -1;
			return desc ? (aValue < bValue ? 1 : -1) : aValue < bValue ? -1 : 1;
		});
	}

	// Apply pagination
	const start = page * pageSize;
	const paginatedData = filteredData.slice(start, start + pageSize);

	return {
		data: paginatedData,
		totalCount: filteredData.length,
	};
};

export function PatientList() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const [data, setData] = React.useState<Patient[]>([]);
	const [isLoading, setIsLoading] = React.useState(false);

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	React.useEffect(() => {
		const loadData = async () => {
			setIsLoading(true);
			try {
				const result = await fetchPatients(
					table.getState().pagination.pageIndex,
					table.getState().pagination.pageSize,
					sorting,
					columnFilters,
				);
				setData(result.data);
			} catch (error) {
				console.error("Error loading patients:", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadData();
	}, [
		table.getState().pagination.pageIndex,
		table.getState().pagination.pageSize,
		sorting,
		columnFilters,
	]);

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Input
						placeholder="Filter patients..."
						value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
						onChange={(event) =>
							table.getColumn("name")?.setFilterValue(event.target.value)
						}
						className="max-w-sm"
					/>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline">Columns</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize"
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									Loading...
								</TableCell>
							</TableRow>
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-between space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
