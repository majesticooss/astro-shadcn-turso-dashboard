import {
	BarChart,
	Bell,
	Building2,
	Calendar,
	Calendar1,
	CalendarCheck,
	CalendarClock,
	Clipboard,
	ClipboardList,
	Clock,
	CreditCard,
	Currency,
	File,
	FileSpreadsheet,
	FileText,
	Files,
	Home,
	LayoutDashboard,
	LineChart,
	List,
	Mail,
	Megaphone,
	MessageCircle,
	MessageSquare,
	Phone,
	Settings,
	ShieldCheck,
	Star,
	Stethoscope,
	Store,
	Target,
	UserCog,
	UserPlus,
	Users,
	Users2,
	XSquareIcon,
	Zap
} from "lucide-react";
import { LiaToothSolid } from "react-icons/lia";

export const siteDomain = "admin.novafy.app";
export const siteUrl = `https://${siteDomain}`;

export const mailConfig = {
	from: "noreply@mail.majestico.co",
}

export const authConfig: AuthConfig = {
	callbackURL: "/dashboard",
}

export const siteConfig: SiteConfig = {
	name: "Next Starter",
	description:
		"Get your project off to an explosive start with Auth & User Roles! Harness the power of Next.js 14, Prisma, Neon, Auth.js v5, Resend, React Email, Shadcn/ui to build your next big thing.",
	url: siteUrl,
	ogImage: `${siteUrl}/_static/og.jpg`,
	links: {
		twitter: "https://twitter.com/miickasmt",
		github: "https://github.com/mickasmt/next-auth-roles-template",
	},
	mailSupport: "support@next-starter.fake",
	author: "Majestico",
	themeColor: "#ffffff",
};

export const dashboardNavigation: NavItemWithSubItems[] = [
	{
		title: "Operations",
		items: [
			{
				title: "Dashboard",
				href: "/dashboard",
				icon: LayoutDashboard,
			},
			{
				title: "Calendar",
				href: "/calendar",
				icon: Calendar,
			},
			{
				title: "Patients",
				icon: Users,
				items: [
					{ title: "Patient List", href: "/patients" },
					{ title: "New Patient", href: "/patients/new" },
					{ title: "Patient Records", href: "/patients/records" },
				],
			},
			{
				title: "Communications",
				icon: MessageSquare,
				items: [
					{ title: "Conversations", href: "/communications/conversations" },
					{ title: "Edit Templates", href: "/communications/templates" },
				],
			},
			{
				title: "Reception",
				icon: Phone,
				items: [
					{ title: "Check-in", href: "/reception/check-in" },
					{ title: "Appointments", href: "/reception/appointments" },
					{ title: "Quick Notes", href: "/reception/notes" },
					{ title: "Tasks", href: "/reception/tasks" },
				],
			},
		],
	},

	{
		title: "Lead Management",
		items: [
			{
				title: "Today",
				href: "/leads",
				icon: CalendarClock,
			},
			{
				title: "Leads",
				icon: Users2,
				items: [
					{ title: "Lead List", href: "/leads/list" },
					{ title: "Lead Pipeline", href: "/leads/pipeline" },
					{ title: "Enquiries", href: "/leads/enquiries" },
					{ title: "Referrals", href: "/leads/referrals" },
				],
			},
		],
	},

	{
		title: "Clinical",
		items: [
			{
				title: "Patient Care",
				icon: Stethoscope,
				items: [
					{ title: "Clinical Notes", href: "/clinical/notes" },
					{ title: "Treatment Cards", href: "/clinical/treatment-cards" },
					{ title: "Medical History", href: "/clinical/medical-history" },
					{ title: "Prescriptions", href: "/clinical/prescriptions" },
				],
			},
			{
				title: "Imaging",
				icon: FileText,
				items: [
					{ title: "X-Rays", href: "/clinical/imaging/x-rays" },
					{ title: "Photos", href: "/clinical/imaging/photos" },
					{ title: "Scans", href: "/clinical/imaging/scans" },
					{ title: "Documents", href: "/clinical/imaging/documents" },
				],
			},
			{
				title: "Charts",
				icon: ClipboardList,
				items: [
					{ title: "Perio Charts", href: "/clinical/charts/perio" },
					{ title: "Dental Charts", href: "/clinical/charts/dental" },
					{ title: "Treatment Plans", href: "/clinical/charts/treatment" },
				],
			},
		],
	},

	{
		title: "Financial",
		items: [
			{
				title: "Billing",
				icon: CreditCard,
				items: [
					{ title: "Invoices", href: "/financial/billing/invoices" },
					{ title: "Payments", href: "/financial/billing/payments" },
					{ title: "Insurance Claims", href: "/financial/billing/insurance" },
					{ title: "Payment Plans", href: "/financial/billing/plans" },
				],
			},
			{
				title: "Reports",
				icon: BarChart,
				items: [
					{ title: "Financial Summary", href: "/financial/reports/summary" },
					{ title: "Revenue Analysis", href: "/financial/reports/revenue" },
					{ title: "Insurance Reports", href: "/financial/reports/insurance" },
					{ title: "Treatment Analysis", href: "/financial/reports/treatment" },
				],
			},
			{
				title: "Estimates",
				icon: Files,
				items: [
					{ title: "Create Estimate", href: "/financial/estimates/new" },
					{ title: "Estimate List", href: "/financial/estimates/list" },
					{ title: "Templates", href: "/financial/estimates/templates" },
				],
			},
		],
	},

	{
		title: "Practice Management",
		items: [
			{
				title: "Staff",
				icon: UserCog,
				items: [
					{ title: "Staff Directory", href: "/practice/staff/directory" },
					{ title: "Schedules", href: "/practice/staff/schedules" },
					{ title: "Performance", href: "/practice/staff/performance" },
					{ title: "Training", href: "/practice/staff/training" },
				],
			},
			{
				title: "Inventory",
				icon: Store,
				items: [
					{ title: "Stock Control", href: "/practice/inventory/stock" },
					{ title: "Orders", href: "/practice/inventory/orders" },
					{ title: "Suppliers", href: "/practice/inventory/suppliers" },
					{ title: "Reports", href: "/practice/inventory/reports" },
				],
			},
			{
				title: "Automations",
				icon: Zap,
				href: "/automations",
			},
			{
				title: "Settings",
				icon: Settings,
				items: [
					{ title: "Practice Details", href: "/practice/settings/details" },
					{ title: "User Permissions", href: "/practice/settings/permissions" },
					{ title: "Integrations", href: "/practice/settings/integrations" },
					{ title: "Templates", href: "/practice/settings/templates" },
				],
			},
			{
				title: "Analytics",
				icon: LineChart,
				items: [
					{ title: "Practice Overview", href: "/practice/analytics/overview" },
					{ title: "Patient Analytics", href: "/practice/analytics/patients" },
					{ title: "Performance KPIs", href: "/practice/analytics/kpis" },
					{ title: "Custom Reports", href: "/practice/analytics/custom" },
				],
			},
		],
	},

	{
		title: "Academy",
		items: [
			{
				title: "Platform",
				icon: UserCog,
				href: "/academy/platform",
			},
			{
				title: "Inserta",
				icon: Store,
				href: "/academy/inserta",
			},
		],
	},
];
