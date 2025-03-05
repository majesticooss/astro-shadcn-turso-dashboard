import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Handle, type NodeProps, Position } from "@xyflow/react";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import React, { memo } from "react";
import type { NodeTypeData } from "./node-types";
import { nodeTypes } from "./node-types";

interface CustomNodeData {
	label: string;
	properties: Record<string, unknown>;
	nodeId?: string;
	type?: string;
}

const nodeTypeIcons: Record<string, keyof typeof Icons> = {
	trigger: "Zap",
	action: "Play",
	condition: "GitBranch",
};

// This is a workaround for the NodeProps type issue
// biome-ignore lint/suspicious/noExplicitAny: Using any to bypass type constraints
const CustomNode = (props: any) => {
	const { data, type, id } = props;
	const nodeType = nodeTypes.find((n) => n.id === type);
	if (!nodeType) return null;

	// Use the icon directly
	const IconComponent = nodeType.icon;

	// Get the type icon by name
	const typeIconName = nodeTypeIcons[nodeType.category];
	// biome-ignore lint/suspicious/noExplicitAny: Using any to bypass type constraints
	const TypeIconComponent = typeIconName ? (Icons[typeIconName] as any) : null;

	const hasProperties = Object.keys(data?.properties || {}).length > 0;

	// Get a summary of configured properties
	const propertySummary =
		hasProperties && nodeType.properties
			? nodeType.properties
					.filter((prop) => data?.properties?.[prop.name])
					.map((prop) => `${prop.label}: ${data.properties[prop.name]}`)
					.slice(0, 2)
					.join(", ")
			: null;

	const isCondition = nodeType.category === "condition";

	return (
		<Card className="w-[200px] shadow-lg border-none dark:bg-background">
			{nodeType.category !== "trigger" && (
				<Handle
					type="target"
					position={Position.Left}
					className="w-2 h-2 !bg-primary"
				/>
			)}
			{isCondition ? (
				<>
					<Handle
						type="source"
						position={Position.Right}
						id="true"
						className="w-2 h-2 !bg-green-500"
					/>
					<Handle
						type="source"
						position={Position.Bottom}
						id="false"
						className="w-2 h-2 !bg-red-500"
					/>
				</>
			) : (
				<Handle
					type="source"
					position={Position.Right}
					className="w-2 h-2 !bg-primary"
				/>
			)}

			<div className="p-3">
				<div className="flex items-center gap-2">
					{IconComponent &&
						React.createElement(IconComponent, {
							className: "w-4 h-4 text-primary",
						})}
					<span className="font-medium text-sm">{nodeType.name}</span>
					{TypeIconComponent &&
						React.createElement(TypeIconComponent, {
							className: "w-3 h-3 ml-auto text-muted-foreground",
						})}
				</div>
				<p className="text-xs text-muted-foreground mt-1">
					{propertySummary || nodeType.description}
				</p>
				{isCondition && (
					<div className="flex gap-1 mt-2">
						<Badge variant="outline" className="text-[10px] border-green-500">
							True
						</Badge>
						<Badge variant="outline" className="text-[10px] border-red-500">
							False
						</Badge>
					</div>
				)}
			</div>
		</Card>
	);
};

export default memo(CustomNode);
