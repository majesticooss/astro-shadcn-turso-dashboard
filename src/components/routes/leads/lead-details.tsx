"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Edit,
	Mail,
	MessageCircle,
	MessageSquare,
	MoreVertical,
	Phone,
	Tag,
	X,
} from "lucide-react";

interface LeadDetailsProps {
	lead: {
		name: string;
		topic: string;
		gdprStatus: string;
		contactPreferences: string;
		mobile: string;
		email: string;
		lastContact: {
			date: string;
			method: string;
		};
		isExistingPatient: boolean;
		paymentPlan: string;
	};
	onClose: () => void;
}

export default function LeadDetails({ lead, onClose }: LeadDetailsProps) {
	return (
		<div className="mt-4 border-t pt-4">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-semibold">
					Call {lead.name} to talk about {lead.topic}
				</h3>
				<div className="flex items-center space-x-2">
					<Button variant="outline" size="icon">
						<Tag className="h-4 w-4" />
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="default">
								<MessageCircle className="h-4 w-4 mr-2" />
								Send Message
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>
								<Phone className="h-4 w-4 mr-2" />
								Call
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Mail className="h-4 w-4 mr-2" />
								Email
							</DropdownMenuItem>
							<DropdownMenuItem>
								<MessageSquare className="h-4 w-4 mr-2" />
								SMS
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="icon">
								<MoreVertical className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>Summary</DropdownMenuItem>
							<DropdownMenuItem>View Lead</DropdownMenuItem>
							<DropdownMenuItem>View Contact History</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<Button variant="ghost" size="icon" onClick={onClose}>
						<X className="h-4 w-4" />
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-6">
				<div className="space-y-4">
					<div>
						<Badge variant="secondary">{lead.gdprStatus}</Badge>
						<p className="text-sm text-gray-500 mt-1">
							{lead.contactPreferences}
						</p>
					</div>
					<div>
						<div className="flex items-center space-x-2">
							<Phone className="h-4 w-4 text-gray-500" />
							<span>{lead.mobile}</span>
						</div>
						<div className="flex items-center space-x-2 mt-2">
							<Mail className="h-4 w-4 text-gray-500" />
							<span>{lead.email}</span>
						</div>
					</div>
				</div>

				<div className="space-y-4">
					<div>
						<p className="text-sm text-gray-500">Last Contact</p>
						<p>{lead.lastContact.date}</p>
						<p>Made Contact via {lead.lastContact.method}</p>
					</div>
					<div className="flex items-center justify-between">
						<span>Existing Patient</span>
						<div className="flex items-center space-x-2">
							<span>{lead.isExistingPatient ? "Yes" : "No"}</span>
							<Button variant="ghost" size="icon">
								<Edit className="h-4 w-4" />
							</Button>
						</div>
					</div>
					<div className="flex items-center justify-between">
						<span>Payment Plan</span>
						<div className="flex items-center space-x-2">
							<span>{lead.paymentPlan}</span>
							<Button variant="ghost" size="icon">
								<Edit className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 border-t pt-4">
				<p className="text-center mb-4">Did you try to contact {lead.name}?</p>
				<div className="flex justify-center space-x-4">
					<Button variant="default">Yes</Button>
					<Button variant="outline">No</Button>
				</div>
			</div>
		</div>
	);
}
