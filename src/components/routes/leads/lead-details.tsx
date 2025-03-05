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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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
import { useState } from "react";

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
		lastOutcome?: string;
	};
	onClose: () => void;
	onUpdate?: (field: string, value: any) => void;
}

export default function LeadDetails({
	lead,
	onClose,
	onUpdate,
}: LeadDetailsProps) {
	const [isEditing, setIsEditing] = useState({
		existingPatient: false,
		paymentPlan: false,
	});
	const [existingPatient, setExistingPatient] = useState(
		lead.isExistingPatient,
	);
	const [paymentPlan, setPaymentPlan] = useState(lead.paymentPlan);
	const [showOutcomeSelect, setShowOutcomeSelect] = useState(false);
	const [selectedOutcome, setSelectedOutcome] = useState<string>(
		lead.lastOutcome || "",
	);
	const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
	const [additionalInfo, setAdditionalInfo] = useState({
		reason: "",
		contactMethod: "",
		notes: "",
	});

	const paymentPlans = [
		"Unspecified",
		"Practice Plan",
		"Denplan",
		"NHS",
		"Private",
	];

	const outcomeOptions = [
		"I booked a new appointment",
		"They're thinking about it",
		"They want to be contacted again later",
		"Not proceeding with treatment",
		"I called but didn't speak to them",
		"I didn't call, I sent a message",
	];

	const reasonOptions = [
		"Unsuitable for treatment",
		"Credit check failed",
		"Too expensive",
		"Follow up at a later date",
		"Opted for a different treatment",
		"Changed mind",
		"No valid contact details available",
		"Unable to contact",
		"Practice too far away",
		"Went somewhere else",
		"Looking for treatment on the NHS",
		"Referred to another practice",
		"Other",
	];

	const contactMethodOptions = [
		"Phone",
		"Email",
		"SMS",
		"WhatsApp",
		"In Person",
	];

	const handleExistingPatientChange = (value: string) => {
		const newValue = value === "true";
		setExistingPatient(newValue);
		setIsEditing((prev) => ({
			...prev,
			existingPatient: false,
		}));
		onUpdate?.("isExistingPatient", newValue);
	};

	const handlePaymentPlanChange = (value: string) => {
		setPaymentPlan(value);
		setIsEditing((prev) => ({
			...prev,
			paymentPlan: false,
		}));
		onUpdate?.("paymentPlan", value);
	};

	const handleYesClick = () => {
		setShowOutcomeSelect(true);
	};

	const handleOutcomeSelect = (value: string) => {
		setSelectedOutcome(value);
		if (value === "Not proceeding with treatment") {
			setShowAdditionalInfo(true);
		} else {
			setShowAdditionalInfo(false);
			setShowOutcomeSelect(false);
			onUpdate?.("contactOutcome", value);
		}
	};

	const handleAdditionalInfoSubmit = () => {
		onUpdate?.("contactOutcome", {
			outcome: selectedOutcome,
			reason: additionalInfo.reason,
			contactMethod: additionalInfo.contactMethod,
			notes: additionalInfo.notes,
		});
		setShowOutcomeSelect(false);
		setShowAdditionalInfo(false);
	};

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
							{isEditing.existingPatient ? (
								<Select
									value={existingPatient.toString()}
									onValueChange={handleExistingPatientChange}
								>
									<SelectTrigger className="w-[100px]">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="true">Yes</SelectItem>
										<SelectItem value="false">No</SelectItem>
									</SelectContent>
								</Select>
							) : (
								<>
									<span>{existingPatient ? "Yes" : "No"}</span>
									<Button
										variant="ghost"
										size="icon"
										onClick={() =>
											setIsEditing((prev) => ({
												...prev,
												existingPatient: true,
											}))
										}
									>
										<Edit className="h-4 w-4" />
									</Button>
								</>
							)}
						</div>
					</div>
					<div className="flex items-center justify-between">
						<span>Payment Plan</span>
						<div className="flex items-center space-x-2">
							{isEditing.paymentPlan ? (
								<Select
									value={paymentPlan}
									onValueChange={handlePaymentPlanChange}
								>
									<SelectTrigger className="w-[140px]">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{paymentPlans.map((plan) => (
											<SelectItem key={plan} value={plan}>
												{plan}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							) : (
								<>
									<span>{paymentPlan}</span>
									<Button
										variant="ghost"
										size="icon"
										onClick={() =>
											setIsEditing((prev) => ({
												...prev,
												paymentPlan: true,
											}))
										}
									>
										<Edit className="h-4 w-4" />
									</Button>
								</>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 border-t pt-4">
				{selectedOutcome && !showOutcomeSelect ? (
					<div className="space-y-4">
						<p className="text-center font-medium">Last contact outcome:</p>
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<p>
										{typeof selectedOutcome === "string"
											? selectedOutcome
											: (selectedOutcome as { outcome: string }).outcome}
									</p>
									{typeof selectedOutcome !== "string" && (
										<>
											<p className="text-sm text-gray-500">
												Reason: {(selectedOutcome as { reason: string }).reason}
											</p>
											<p className="text-sm text-gray-500">
												Contact method:{" "}
												{
													(selectedOutcome as { contactMethod: string })
														.contactMethod
												}
											</p>
											{(selectedOutcome as { notes?: string }).notes && (
												<p className="text-sm text-gray-500">
													Notes: {(selectedOutcome as { notes: string }).notes}
												</p>
											)}
										</>
									)}
								</div>
								<Button
									variant="outline"
									size="sm"
									onClick={() => setShowOutcomeSelect(true)}
								>
									Update
								</Button>
							</div>
						</div>
					</div>
				) : showOutcomeSelect ? (
					<div className="space-y-4">
						<p className="text-center font-medium">
							{selectedOutcome
								? "Update the outcome:"
								: "Great, what happened when you contacted them?"}
						</p>
						<Select value={selectedOutcome} onValueChange={handleOutcomeSelect}>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="- Select outcome -" />
							</SelectTrigger>
							<SelectContent>
								{outcomeOptions.map((outcome) => (
									<SelectItem key={outcome} value={outcome}>
										{outcome}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						{showAdditionalInfo && (
							<div className="space-y-4 mt-4">
								<div className="space-y-2">
									<p className="font-medium">Why not?</p>
									<Select
										value={additionalInfo.reason}
										onValueChange={(value) =>
											setAdditionalInfo((prev) => ({
												...prev,
												reason: value,
											}))
										}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="- Select reason -" />
										</SelectTrigger>
										<SelectContent>
											{reasonOptions.map((reason) => (
												<SelectItem key={reason} value={reason}>
													{reason}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<p className="font-medium">I contacted them via</p>
									<Select
										value={additionalInfo.contactMethod}
										onValueChange={(value) =>
											setAdditionalInfo((prev) => ({
												...prev,
												contactMethod: value,
											}))
										}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="- Select contact method -" />
										</SelectTrigger>
										<SelectContent>
											{contactMethodOptions.map((method) => (
												<SelectItem key={method} value={method}>
													{method}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<p className="font-medium">Additional notes</p>
									<Textarea
										value={additionalInfo.notes}
										onChange={(e) =>
											setAdditionalInfo((prev) => ({
												...prev,
												notes: e.target.value,
											}))
										}
										placeholder="Add any additional notes here..."
										className="min-h-[100px]"
									/>
								</div>

								<div className="flex justify-end space-x-2">
									<Button
										variant="ghost"
										onClick={() => {
											setShowAdditionalInfo(false);
											setShowOutcomeSelect(false);
										}}
									>
										Cancel
									</Button>
									<Button
										variant="default"
										onClick={handleAdditionalInfoSubmit}
										disabled={
											!additionalInfo.reason || !additionalInfo.contactMethod
										}
									>
										Submit
									</Button>
								</div>
							</div>
						)}

						{!showAdditionalInfo && selectedOutcome && (
							<div className="flex justify-end">
								<Button
									variant="ghost"
									size="sm"
									onClick={() => setShowOutcomeSelect(false)}
								>
									Cancel
								</Button>
							</div>
						)}
					</div>
				) : (
					<>
						<p className="text-center mb-4">
							Did you try to contact {lead.name}?
						</p>
						<div className="flex justify-center space-x-4">
							<Button variant="default" onClick={handleYesClick}>
								Yes
							</Button>
							<Button variant="outline" onClick={onClose}>
								No
							</Button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
