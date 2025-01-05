import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Handle, type NodeProps, Position } from "@xyflow/react";
import * as Icons from "lucide-react";
import React, { memo } from "react";
import type { NodeTypeData } from "./node-types";

interface CustomNodeData {
	label: string;
	type: NodeTypeData;
	properties: Record<string, any>;
}

const CustomNode = ({ data }: NodeProps<CustomNodeData>) => {
	const IconComponent = Icons[data.type.icon as keyof typeof Icons];
	const hasProperties = Object.keys(data.properties || {}).length > 0;

	return (
		<Card className="w-[200px] bg-white shadow-lg border-none">
			<Handle
				type="target"
				position={Position.Top}
				className="!bg-primary/50 w-3 h-3 !border-2 border-background"
			/>
			<div className="p-3">
				<div className="flex items-center gap-2">
					{IconComponent && <IconComponent className="w-4 h-4 text-primary" />}
					<span className="font-medium text-sm">{data.type.name}</span>
					{hasProperties && (
						<Badge variant="secondary" className="ml-auto">
							Configured
						</Badge>
					)}
				</div>
				<p className="text-xs text-muted-foreground mt-1">
					{data.type.description}
				</p>
			</div>
			<Handle
				type="source"
				position={Position.Bottom}
				className="!bg-primary/50 w-3 h-3 !border-2 border-background"
			/>
		</Card>
	);
};

export default memo(CustomNode);
