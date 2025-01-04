import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
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
import { Plus } from "lucide-react";
import { useState } from "react";

interface NewChatDialogProps {
	onCreateChat: (name: string, channel: string) => void;
}

export function NewChatDialog({ onCreateChat }: NewChatDialogProps) {
	const [name, setName] = useState("");
	const [channel, setChannel] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (name && channel) {
			onCreateChat(name, channel);
			setName("");
			setChannel("");
			setIsOpen(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="rounded-full"
					onClick={() => setIsOpen(true)}
				>
					<Plus className="h-4 w-4 mr-1" />
					New
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create New Chat</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<Label htmlFor="name">Contact Name</Label>
						<Input
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Enter contact name"
						/>
					</div>
					<div>
						<Label htmlFor="channel">Channel</Label>
						<Select value={channel} onValueChange={setChannel}>
							<SelectTrigger>
								<SelectValue placeholder="Select a channel" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="sms">SMS</SelectItem>
								<SelectItem value="email">Email</SelectItem>
								<SelectItem value="whatsapp">WhatsApp</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<Button type="submit" disabled={!name || !channel}>
						Create Chat
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
