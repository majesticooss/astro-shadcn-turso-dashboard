export interface NodeTypeData {
	id: string;
	name: string;
	description: string;
	icon: string;
	category: 'trigger' | 'action' | 'condition';
}

export const nodeTypes: NodeTypeData[] = [
	{
		id: "appointment-trigger",
		name: "Appointment Trigger",
		description: "Triggers when an appointment is scheduled",
		icon: "Calendar",
		category: "trigger",
	},
	{
		id: "contact-preference",
		name: "Contact Preference",
		description: "Checks patient contact preferences",
		icon: "GitBranch",
		category: "condition",
	},
	{
		id: "send-sms",
		name: "Send SMS",
		description: "Sends an SMS message to the patient",
		icon: "MessageSquare",
		category: "action",
	},
	{
		id: "send-email",
		name: "Send Email",
		description: "Sends an email to the patient",
		icon: "Mail",
		category: "action",
	},
	{
		id: "send-whatsapp",
		name: "Send WhatsApp",
		description: "Sends a WhatsApp message to the patient",
		icon: "MessageCircle",
		category: "action",
	},
	{
		id: "time-delay",
		name: "Time Delay",
		description: "Waits for a specified time before continuing",
		icon: "Clock",
		category: "condition",
	},
	{
		id: "birthday-trigger",
		name: "Birthday Trigger",
		description: "Triggers on patient's birthday",
		icon: "Gift",
		category: "trigger",
	},
	{
		id: "treatment-complete",
		name: "Treatment Complete",
		description: "Triggers when a treatment is marked as complete",
		icon: "CheckCircle",
		category: "trigger",
	},
];

