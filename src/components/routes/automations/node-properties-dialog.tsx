import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
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
import { useEffect, useState } from "react";
import type { NodeTypeData } from "./node-types";

interface NodePropertiesDialogProps {
	isOpen: boolean;
	onClose: () => void;
	node: any | null;
	onDelete: () => void;
	onUpdate: (data: any) => void;
}

const nodeProperties = {
	webhook: [
		{ name: "url", label: "Webhook URL", type: "text" },
		{
			name: "method",
			label: "HTTP Method",
			type: "select",
			options: ["GET", "POST", "PUT", "DELETE"],
		},
	],
	schedule: [
		{ name: "cron", label: "Cron Expression", type: "text" },
		{ name: "timezone", label: "Timezone", type: "text" },
	],
	"send-email": [
		{ name: "to", label: "To", type: "text" },
		{ name: "subject", label: "Subject", type: "text" },
		{ name: "body", label: "Body", type: "text" },
	],
	"http-request": [
		{ name: "url", label: "URL", type: "text" },
		{
			name: "method",
			label: "Method",
			type: "select",
			options: ["GET", "POST", "PUT", "DELETE"],
		},
	],
	"if-then": [{ name: "condition", label: "Condition", type: "text" }],
	// Add more properties for other node types as needed
};

export function NodePropertiesDialog({
	isOpen,
	onClose,
	node,
	onDelete,
	onUpdate,
}: NodePropertiesDialogProps) {
	const [formData, setFormData] = useState<Record<string, any>>({});

	useEffect(() => {
		if (node) {
			setFormData(node.data.properties || {});
		}
	}, [node]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onUpdate({ ...node.data, properties: formData });
		onClose();
	};

	if (!node) return null;

	const nodeType = node.data.type as NodeTypeData;
	const properties =
		nodeProperties[nodeType.id as keyof typeof nodeProperties] || [];

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{nodeType.name} Properties</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					{properties.map((property) => (
						<div key={property.name} className="space-y-2">
							<Label htmlFor={property.name}>{property.label}</Label>
							{property.type === "select" ? (
								<Select
									value={formData[property.name] || ""}
									onValueChange={(value) =>
										setFormData({ ...formData, [property.name]: value })
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select..." />
									</SelectTrigger>
									<SelectContent>
										{property.options?.map((option) => (
											<SelectItem key={option} value={option}>
												{option}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							) : (
								<Input
									id={property.name}
									value={formData[property.name] || ""}
									onChange={(e) =>
										setFormData({
											...formData,
											[property.name]: e.target.value,
										})
									}
								/>
							)}
						</div>
					))}
					<div className="flex justify-between">
						<Button type="button" variant="destructive" onClick={onDelete}>
							Delete Node
						</Button>
						<div className="space-x-2">
							<Button type="button" variant="outline" onClick={onClose}>
								Cancel
							</Button>
							<Button type="submit">Save Changes</Button>
						</div>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
