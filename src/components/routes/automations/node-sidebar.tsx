import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";
import { nodeTypes } from "./node-types";
import type { NodeTypeData } from "./node-types";

interface NodeSidebarProps {
	onDragStart: (
		event: React.DragEvent<HTMLDivElement>,
		node: NodeTypeData,
	) => void;
}

export function NodeSidebar({ onDragStart }: NodeSidebarProps) {
	const [search, setSearch] = useState("");
	const [typeFilter, setTypeFilter] = useState("all");

	const handleDragStart = (
		e: React.DragEvent<HTMLDivElement>,
		node: NodeTypeData,
	) => {
		e.stopPropagation();
		onDragStart(e, node);
	};

	const filteredNodes = nodeTypes.filter((node) => {
		const matchesSearch =
			node.name.toLowerCase().includes(search.toLowerCase()) ||
			node.description.toLowerCase().includes(search.toLowerCase());
		const matchesType = typeFilter === "all" || node.category === typeFilter;

		return matchesSearch && matchesType;
	});

	return (
		<div className="w-64 flex flex-col flex-shrink-0 bg-muted/10">
			<div className="p-4 border-b space-y-4">
				<div>
					<h3 className="font-medium">Node Types</h3>
					<p className="text-sm text-muted-foreground">
						Drag and drop nodes to create your automation
					</p>
				</div>
				<div className="space-y-2">
					<div className="relative">
						<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search nodes..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="pl-8"
						/>
					</div>
					<Select value={typeFilter} onValueChange={setTypeFilter}>
						<SelectTrigger>
							<SelectValue placeholder="Filter by type" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All types</SelectItem>
							<SelectItem value="trigger">Triggers</SelectItem>
							<SelectItem value="action">Actions</SelectItem>
							<SelectItem value="condition">Conditions</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<ScrollArea className="flex-1 py-4">
				<div className="px-4 space-y-2 h-0">
					{filteredNodes.map((node) => (
						<div
							key={node.id}
							className="p-3 rounded-md bg-background border shadow-sm cursor-move hover:border-primary/50 transition-colors"
							draggable
							onDragStart={(e) => handleDragStart(e, node)}
						>
							<div className="text-sm font-medium">{node.name}</div>
							<div className="text-xs text-muted-foreground mt-1">
								{node.description}
							</div>
						</div>
					))}
				</div>
			</ScrollArea>
		</div>
	);
}
