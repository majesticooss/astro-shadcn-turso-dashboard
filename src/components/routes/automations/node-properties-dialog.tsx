import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Node } from "@xyflow/react";
import { Trash } from "lucide-react";
import { nodeTypes } from "./node-types";

// Define the structure of node data
interface NodeData {
	label: string;
	properties: Record<string, string>;
	[key: string]: unknown;
}

interface NodePropertiesDialogProps {
	isOpen: boolean;
	onClose: () => void;
	node: Node<NodeData> | null;
	onDelete: () => void;
	onUpdate: (data: NodeData) => void;
}

export function NodePropertiesDialog({
	isOpen,
	onClose,
	node,
	onDelete,
	onUpdate,
}: NodePropertiesDialogProps) {
	if (!node) return null;

	const nodeType = nodeTypes.find((n) => n.id === node.type);
	if (!nodeType) return null;

	const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const properties: Record<string, string> = {};

		for (const prop of nodeType.properties || []) {
			const value = formData.get(prop.name);
			if (value && typeof value === "string") {
				properties[prop.name] = value;
			}
		}

		onUpdate({
			...node.data,
			properties,
		});

		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>{nodeType.name}</DialogTitle>
					<p className="text-sm text-muted-foreground mt-1.5">
						{nodeType.description}
					</p>
				</DialogHeader>
				<form onSubmit={handleUpdate} className="space-y-4">
					{nodeType.properties?.map((property) => (
						<div key={property.name}>
							<Label htmlFor={property.name}>{property.label}</Label>
							{property.type === "select" ? (
								<Select
									name={property.name}
									defaultValue={node.data.properties?.[property.name] || ""}
									required={property.required}
								>
									<SelectTrigger className="mt-2">
										<SelectValue placeholder={property.placeholder} />
									</SelectTrigger>
									<SelectContent>
										{property.options?.map((option) => (
											<SelectItem key={option} value={option}>
												{option}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							) : property.type === "textarea" ? (
								<Textarea
									id={property.name}
									name={property.name}
									defaultValue={node.data.properties?.[property.name] || ""}
									className="mt-2"
									placeholder={property.placeholder}
									required={property.required}
								/>
							) : (
								<Input
									id={property.name}
									name={property.name}
									type={property.type}
									defaultValue={node.data.properties?.[property.name] || ""}
									className="mt-2"
									placeholder={property.placeholder}
									required={property.required}
								/>
							)}
						</div>
					))}
					<DialogFooter className="gap-2">
						<Button
							type="button"
							variant="destructive"
							size="icon"
							onClick={() => {
								onDelete();
								onClose();
							}}
						>
							<Trash className="h-4 w-4" />
						</Button>
						<Button type="submit">Save Changes</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
