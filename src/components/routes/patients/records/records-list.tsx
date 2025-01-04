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
import { type PatientRecord, columns } from "./columns";

const TREATMENT_TYPES = [
	"Cleaning",
	"Filling",
	"Root Canal",
	"Crown",
	"Extraction",
	"Whitening",
	"Check-up",
	"X-Ray",
];

const DENTISTS = [
	"Dr. Sarah Johnson",
	"Dr. Michael Chen",
	"Dr. Emily Rodriguez",
	"Dr. David Kim",
];

const MOCK_NAMES = [
	"Emma Thompson",
	"James Wilson",
	"Sophia Chen",
	"Michael Rodriguez",
	"Isabella Kim",
	"William Taylor",
	"Olivia Martinez",
	"Benjamin Davis",
	"Ava Johnson",
	"Lucas Anderson",
	"Mia Patel",
	"Alexander Wright",
	"Charlotte Brown",
	"Daniel Lee",
	"Emily White",
	"David Garcia",
	"Sofia Nguyen",
	"Joseph Miller",
	"Victoria Moore",
	"Henry Jackson",
];

const generateMockRecords = (count: number): PatientRecord[] => {
	return Array.from({ length: count }, (_, i) => {
		const today = new Date();
		const treatmentDate = new Date(today);
		treatmentDate.setDate(today.getDate() - Math.floor(Math.random() * 90));

		const treatmentType =
			TREATMENT_TYPES[Math.floor(Math.random() * TREATMENT_TYPES.length)];
		const cost = Math.floor(Math.random() * 1000) + 100;
		const status =
			Math.random() > 0.8
				? "scheduled"
				: Math.random() > 0.1
					? "completed"
					: "cancelled";
		const patientName =
			MOCK_NAMES[Math.floor(Math.random() * MOCK_NAMES.length)];

		return {
			id: `REC${(i + 1).toString().padStart(4, "0")}`,
			patientId: `PAT${Math.floor(Math.random() * 100)
				.toString()
				.padStart(4, "0")}`,
			patientName,
			treatmentDate: treatmentDate.toISOString().split("T")[0],
			treatmentType,
			description: `Standard ${treatmentType.toLowerCase()} procedure`,
			dentist: DENTISTS[Math.floor(Math.random() * DENTISTS.length)],
			cost,
			status: status as "completed" | "scheduled" | "cancelled",
		};
	});
};

const fetchRecords = async (
	page: number,
	pageSize: number,
	sorting: SortingState,
	filters: ColumnFiltersState,
): Promise<{ data: PatientRecord[]; totalCount: number }> => {
	await new Promise((resolve) => setTimeout(resolve, 100));
	const mockData = generateMockRecords(100);

	let filteredData = [...mockData];
	filters.forEach((filter) => {
		filteredData = filteredData.filter((item) =>
			String(item[filter.id as keyof PatientRecord])
				.toLowerCase()
				.includes(String(filter.value).toLowerCase()),
		);
	});

	if (sorting.length > 0) {
		const { id, desc } = sorting[0];
		filteredData.sort((a, b) => {
			const aValue = a[id as keyof PatientRecord];
			const bValue = b[id as keyof PatientRecord];
			if (aValue === bValue) return 0;
			if (aValue === null) return desc ? -1 : 1;
			if (bValue === null) return desc ? 1 : -1;
			return desc ? (aValue < bValue ? 1 : -1) : aValue < bValue ? -1 : 1;
		});
	}

	const start = page * pageSize;
	const paginatedData = filteredData.slice(start, start + pageSize);

	return {
		data: paginatedData,
		totalCount: filteredData.length,
	};
};

export function RecordsList() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [{ pageIndex, pageSize }, setPagination] = React.useState({
		pageIndex: 0,
		pageSize: 10,
	});
	const [data, setData] = React.useState<PatientRecord[]>([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const [totalCount, setTotalCount] = React.useState(0);

	const pagination = React.useMemo(
		() => ({
			pageIndex,
			pageSize,
		}),
		[pageIndex, pageSize],
	);

	const table = useReactTable({
		data,
		columns: columns(),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onPaginationChange: setPagination,
		manualPagination: true,
		pageCount: Math.ceil(totalCount / pageSize),
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			pagination,
		},
	});

	React.useEffect(() => {
		const loadData = async () => {
			setIsLoading(true);
			try {
				const result = await fetchRecords(
					pageIndex,
					pageSize,
					sorting,
					columnFilters,
				);
				setData(result.data);
				setTotalCount(result.totalCount);
			} catch (error) {
				console.error("Error loading records:", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadData();
	}, [pageIndex, pageSize, sorting, columnFilters]);

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Input
						placeholder="Filter by patient name..."
						value={
							(table.getColumn("patientName")?.getFilterValue() as string) ?? ""
						}
						onChange={(event) =>
							table.getColumn("patientName")?.setFilterValue(event.target.value)
						}
						className="max-w-sm"
					/>
					<select
						className="h-9 rounded-md border border-input bg-background px-3"
						value={
							(table.getColumn("treatmentType")?.getFilterValue() as string) ??
							""
						}
						onChange={(event) =>
							table
								.getColumn("treatmentType")
								?.setFilterValue(event.target.value)
						}
					>
						<option value="">All Treatments</option>
						{TREATMENT_TYPES.map((type) => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</select>
					<select
						className="h-9 rounded-md border border-input bg-background px-3"
						value={
							(table.getColumn("status")?.getFilterValue() as string) ?? ""
						}
						onChange={(event) =>
							table.getColumn("status")?.setFilterValue(event.target.value)
						}
					>
						<option value="">All Status</option>
						<option value="completed">Completed</option>
						<option value="scheduled">Scheduled</option>
						<option value="cancelled">Cancelled</option>
					</select>
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
				<Button
					onClick={() => (window.location.href = "/patients/records/new")}
				>
					New Record
				</Button>
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
								<TableRow key={row.id}>
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
					Showing {table.getRowModel().rows.length} of {totalCount} records
				</div>
				<div className="flex items-center gap-6">
					<div className="text-sm text-muted-foreground">
						Page {table.getState().pagination.pageIndex + 1} of{" "}
						{table.getPageCount()}
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
		</div>
	);
}
