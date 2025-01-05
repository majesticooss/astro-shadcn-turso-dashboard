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
import type { Node } from "@xyflow/react";
import { Trash } from "lucide-react";

interface NodePropertiesDialogProps {
	isOpen: boolean;
	onClose: () => void;
	node: Node | null;
	onDelete: () => void;
	onUpdate: (data: any) => void;
}

export function NodePropertiesDialog({
	isOpen,
	onClose,
	node,
	onDelete,
	onUpdate,
}: NodePropertiesDialogProps) {
	if (!node) return null;

	const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const label = formData.get("label") as string;

		onUpdate({
			...node.data,
			label,
		});
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Node Properties</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleUpdate} className="space-y-4">
					<div>
						<Label htmlFor="label">Label</Label>
						<Input
							id="label"
							name="label"
							defaultValue={node.data.label}
							className="mt-2"
						/>
					</div>
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
