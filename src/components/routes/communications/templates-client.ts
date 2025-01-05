export type TemplateType = 'email' | 'whatsapp' | 'sms'

export interface Template {
	id: string
	name: string
	type: TemplateType
	status: 'active' | 'inactive' | 'draft'
	lastEdited: string
}

export interface TemplateFilters {
	search: string
	status: string
}

export const templates: Template[] = [
	{
		id: "1",
		name: "Welcome Email Template",
		type: "email",
		status: "active",
		lastEdited: "2024-01-04T12:00:00Z"
	},
	{
		id: "2",
		name: "Order Confirmation",
		type: "email",
		status: "active",
		lastEdited: "2024-01-03T15:30:00Z"
	},
	{
		id: "3",
		name: "Appointment Reminder",
		type: "whatsapp",
		status: "active",
		lastEdited: "2024-01-02T09:15:00Z"
	},
	{
		id: "4",
		name: "Delivery Status",
		type: "sms",
		status: "draft",
		lastEdited: "2024-01-01T16:45:00Z"
	}
]

