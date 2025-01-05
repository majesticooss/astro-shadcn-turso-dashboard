import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Handle, type NodeProps, Position } from "@xyflow/react";
import * as Icons from "lucide-react";
import React, { memo } from "react";
import type { NodeTypeData } from "./node-types";
import { nodeTypes } from "./node-types";

interface CustomNodeData {
	label: string;
	properties: Record<string, unknown>;
	nodeId?: string;
	type?: string;
}

const nodeTypeIcons = {
	trigger: "Zap",
	action: "Play",
	condition: "GitBranch",
} as const;

const CustomNode = ({ data, type, id }: NodeProps<CustomNodeData>) => {
	const nodeType = nodeTypes.find((n) => n.id === type);
	if (!nodeType) return null;

	const IconComponent = Icons[nodeType.icon as keyof typeof Icons];
	const TypeIconComponent =
		Icons[nodeTypeIcons[nodeType.category] as keyof typeof Icons];
	const hasProperties = Object.keys(data.properties || {}).length > 0;

	// Get a summary of configured properties
	const propertySummary =
		hasProperties && nodeType.properties
			? nodeType.properties
					.filter((prop) => data.properties?.[prop.name])
					.map((prop) => `${prop.label}: ${data.properties[prop.name]}`)
					.slice(0, 2)
					.join(", ")
			: null;

	const isCondition = nodeType.category === "condition";

	return (
		<Card className="w-[200px] shadow-lg border-none dark:bg-background">
			{nodeType.category !== "trigger" && (
				<Handle
					id={`${id}-target`}
					type="target"
					position={Position.Top}
					className="!bg-primary/50 w-3 h-3 !border-2 border-background dark:border-background"
				/>
			)}
			<div className="p-3">
				<div className="flex items-center gap-2">
					{IconComponent && <IconComponent className="w-4 h-4 text-primary" />}
					<span className="font-medium text-sm">{nodeType.name}</span>
					{TypeIconComponent && (
						<TypeIconComponent className="w-3 h-3 ml-auto text-muted-foreground" />
					)}
				</div>
				<p className="text-xs text-muted-foreground mt-1">
					{nodeType.description}
				</p>
				{hasProperties && propertySummary && (
					<div className="mt-2">
						<Badge variant="secondary" className="text-[10px] rounded-lg">
							{propertySummary}
							{nodeType.properties && nodeType.properties.length > 2 && "..."}
						</Badge>
					</div>
				)}
			</div>
			{isCondition ? (
				<>
					<Handle
						id={`${id}-source-true`}
						type="source"
						position={Position.Bottom}
						className="!bg-green-500/50 w-3 h-3 !border-2 border-background dark:border-background"
						style={{ left: "30%" }}
					/>
					<Handle
						id={`${id}-source-false`}
						type="source"
						position={Position.Bottom}
						className="!bg-red-500/50 w-3 h-3 !border-2 border-background dark:border-background"
						style={{ left: "70%" }}
					/>
				</>
			) : (
				<Handle
					id={`${id}-source`}
					type="source"
					position={Position.Bottom}
					className="!bg-primary/50 w-3 h-3 !border-2 border-background dark:border-background"
				/>
			)}
		</Card>
	);
};

export default memo(CustomNode);
