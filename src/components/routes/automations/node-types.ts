import {
	AlertTriangle,
	Bell,
	Calendar,
	CheckCircle,
	Clock,
	CreditCard,
	Database,
	DollarSign,
	Filter,
	Flag,
	Gift,
	GitBranch,
	HeartPulse,
	History,
	Mail,
	MessageCircle,
	MessageSquare,
	Phone,
	PieChart,
	Repeat,
	Settings,
	Stethoscope,
	Tag,
	Timer,
	UserCheck,
	Users,
	Webhook,
	Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NodeTypeData {
	id: string;
	name: string;
	description: string;
	category: "trigger" | "action" | "condition";
	icon: LucideIcon;
	properties?: {
		name: string;
		label: string;
		type: "text" | "select" | "number" | "textarea" | "date";
		options?: string[];
		placeholder?: string;
		required?: boolean;
	}[];
}

export const nodeTypes: NodeTypeData[] = [
	// Triggers
	{
		id: "appointment-trigger",
		name: "Appointment Trigger",
		description: "Triggers when an appointment is scheduled",
		category: "trigger",
		icon: Calendar,
		properties: [
			{
				name: "beforeTime",
				label: "Time Before Appointment",
				type: "select",
				options: ["1 hour", "24 hours", "48 hours", "1 week"],
				required: true,
			},
			{
				name: "appointmentType",
				label: "Appointment Type",
				type: "select",
				options: ["All", "Checkup", "Treatment", "Emergency"],
			},
		],
	},
	{
		id: "birthday-trigger",
		name: "Birthday Trigger",
		description: "Triggers on patient's birthday",
		category: "trigger",
		icon: Gift,
		properties: [
			{
				name: "daysBeforeBirthday",
				label: "Days Before Birthday",
				type: "number",
				required: true,
			},
		],
	},
	{
		id: "recall-trigger",
		name: "Recall Trigger",
		description: "Triggers when patient needs a recall",
		category: "trigger",
		icon: Repeat,
		properties: [
			{
				name: "recallType",
				label: "Recall Type",
				type: "select",
				options: ["Checkup", "Cleaning", "X-Ray"],
				required: true,
			},
		],
	},
	// Actions
	{
		id: "send-email",
		name: "Send Email",
		description: "Sends an email to the patient",
		category: "action",
		icon: Mail,
		properties: [
			{
				name: "template",
				label: "Email Template",
				type: "select",
				options: ["Appointment Reminder", "Birthday Wishes", "Treatment Follow-up"],
				required: true,
			},
			{
				name: "subject",
				label: "Subject",
				type: "text",
				required: true,
			},
			{
				name: "content",
				label: "Content",
				type: "textarea",
				required: true,
			},
		],
	},
	{
		id: "send-sms",
		name: "Send SMS",
		description: "Sends an SMS to the patient",
		category: "action",
		icon: MessageSquare,
		properties: [
			{
				name: "template",
				label: "SMS Template",
				type: "select",
				options: ["Quick Reminder", "Confirmation", "Follow-up"],
				required: true,
			},
			{
				name: "message",
				label: "Message",
				type: "textarea",
				required: true,
			},
		],
	},
	{
		id: "send-whatsapp",
		name: "Send WhatsApp",
		description: "Sends a WhatsApp message",
		category: "action",
		icon: MessageCircle,
		properties: [
			{
				name: "template",
				label: "WhatsApp Template",
				type: "select",
				options: ["Reminder", "Confirmation", "Follow-up"],
				required: true,
			},
			{
				name: "message",
				label: "Message",
				type: "textarea",
				required: true,
			},
		],
	},
	{
		id: "make-call",
		name: "Make Call",
		description: "Initiates an automated call",
		category: "action",
		icon: Phone,
		properties: [
			{
				name: "script",
				label: "Call Script",
				type: "textarea",
				required: true,
			},
			{
				name: "attempts",
				label: "Max Attempts",
				type: "number",
				required: true,
			},
		],
	},
	{
		id: "update-tag",
		name: "Update Tag",
		description: "Updates patient tags",
		category: "action",
		icon: Tag,
		properties: [
			{
				name: "tag",
				label: "Tag",
				type: "text",
				required: true,
			},
			{
				name: "action",
				label: "Action",
				type: "select",
				options: ["Add", "Remove"],
				required: true,
			},
		],
	},
	// Conditions
	{
		id: "check-condition",
		name: "Check Condition",
		description: "Checks if a condition is met",
		category: "condition",
		icon: GitBranch,
		properties: [
			{
				name: "condition",
				label: "Condition",
				type: "select",
				options: ["Age", "Gender", "Last Visit", "Insurance"],
				required: true,
			},
			{
				name: "operator",
				label: "Operator",
				type: "select",
				options: ["equals", "not equals", "greater than", "less than"],
				required: true,
			},
			{
				name: "value",
				label: "Value",
				type: "text",
				required: true,
			},
		],
	},
	{
		id: "contact-preference",
		name: "Contact Preference",
		description: "Checks patient contact preferences",
		category: "condition",
		icon: UserCheck,
		properties: [
			{
				name: "channel",
				label: "Channel",
				type: "select",
				options: ["Email", "SMS", "WhatsApp", "Phone"],
				required: true,
			},
		],
	},
	{
		id: "time-condition",
		name: "Time Condition",
		description: "Checks time-based conditions",
		category: "condition",
		icon: Clock,
		properties: [
			{
				name: "timeFrame",
				label: "Time Frame",
				type: "select",
				options: ["Business Hours", "Weekend", "Holiday"],
				required: true,
			},
		],
	},
	{
		id: "patient-segment",
		name: "Patient Segment",
		description: "Checks patient segment membership",
		category: "condition",
		icon: Users,
		properties: [
			{
				name: "segment",
				label: "Segment",
				type: "select",
				options: ["VIP", "New Patient", "Regular", "Inactive"],
				required: true,
			},
		],
	},
	// Additional Triggers
	{
		id: "payment-trigger",
		name: "Payment Trigger",
		description: "Triggers when a payment is made or due",
		category: "trigger",
		icon: DollarSign,
		properties: [
			{
				name: "event",
				label: "Payment Event",
				type: "select",
				options: ["Payment Made", "Payment Due", "Payment Overdue"],
				required: true,
			},
			{
				name: "amount",
				label: "Amount Threshold",
				type: "number",
				required: false,
			},
		],
	},
	{
		id: "treatment-complete",
		name: "Treatment Complete",
		description: "Triggers when a treatment is marked as complete",
		category: "trigger",
		icon: CheckCircle,
		properties: [
			{
				name: "treatmentType",
				label: "Treatment Type",
				type: "select",
				options: ["All", "Surgery", "Cleaning", "Consultation"],
			},
		],
	},
	{
		id: "form-submission",
		name: "Form Submission",
		description: "Triggers when a patient submits a form",
		category: "trigger",
		icon: Flag,
		properties: [
			{
				name: "formId",
				label: "Form Type",
				type: "select",
				options: ["Feedback", "Medical History", "Consent Form"],
				required: true,
			},
		],
	},
	// Additional Actions
	{
		id: "create-task",
		name: "Create Task",
		description: "Creates a task for staff",
		category: "action",
		icon: Bell,
		properties: [
			{
				name: "title",
				label: "Task Title",
				type: "text",
				required: true,
			},
			{
				name: "assignee",
				label: "Assign To",
				type: "select",
				options: ["Doctor", "Nurse", "Reception", "Admin"],
				required: true,
			},
			{
				name: "dueDate",
				label: "Due Date",
				type: "date",
				required: true,
			},
		],
	},
	{
		id: "update-record",
		name: "Update Record",
		description: "Updates patient medical record",
		category: "action",
		icon: Database,
		properties: [
			{
				name: "field",
				label: "Field to Update",
				type: "select",
				options: ["Status", "Notes", "Next Appointment", "Treatment Plan"],
				required: true,
			},
			{
				name: "value",
				label: "New Value",
				type: "text",
				required: true,
			},
		],
	},
	{
		id: "generate-invoice",
		name: "Generate Invoice",
		description: "Creates and sends an invoice",
		category: "action",
		icon: CreditCard,
		properties: [
			{
				name: "amount",
				label: "Amount",
				type: "number",
				required: true,
			},
			{
				name: "dueDate",
				label: "Due Date",
				type: "date",
				required: true,
			},
			{
				name: "items",
				label: "Line Items",
				type: "textarea",
				required: true,
			},
		],
	},
	// Additional Conditions
	{
		id: "medical-history",
		name: "Medical History",
		description: "Checks patient medical history",
		category: "condition",
		icon: HeartPulse,
		properties: [
			{
				name: "condition",
				label: "Medical Condition",
				type: "select",
				options: ["Diabetes", "Hypertension", "Allergies", "None"],
				required: true,
			},
		],
	},
	{
		id: "visit-frequency",
		name: "Visit Frequency",
		description: "Checks patient visit patterns",
		category: "condition",
		icon: History,
		properties: [
			{
				name: "period",
				label: "Time Period",
				type: "select",
				options: ["Last Month", "Last 3 Months", "Last Year"],
				required: true,
			},
			{
				name: "visits",
				label: "Number of Visits",
				type: "number",
				required: true,
			},
		],
	},
	{
		id: "treatment-status",
		name: "Treatment Status",
		description: "Checks status of ongoing treatments",
		category: "condition",
		icon: Stethoscope,
		properties: [
			{
				name: "status",
				label: "Treatment Status",
				type: "select",
				options: ["Not Started", "In Progress", "Completed", "Cancelled"],
				required: true,
			},
		],
	},
];

