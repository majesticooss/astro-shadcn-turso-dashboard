import { Link } from "@/components/core/Link";
import {
	Bell,
	Home,
	LineChart,
	Package,
	Package2,
	ShoppingCart,
	Users,
} from "lucide-react";
import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface SidebarProps {
	className?: string;
	currentPath: string; // Add this prop
}

const Sidebar: React.FC<SidebarProps> = ({ className = "", currentPath }) => {
	// Helper function to determine if a link is active
	const isLinkActive = (href: string) => {
		return (
			currentPath === href || (href !== "/" && currentPath.startsWith(href))
		);
	};

	// Helper function to get link classes
	const getLinkClasses = (href: string) => {
		const baseClasses =
			"flex items-center gap-3 rounded-lg px-3 py-2 transition-all";
		return isLinkActive(href)
			? `${baseClasses} bg-muted text-primary`
			: `${baseClasses} text-muted-foreground hover:text-primary`;
	};

	return (
		<aside
			className={`h-full w-full hidden md:border-r bg-background md:bg-muted/20 border-muted md:block fixed md:relative z-30 ${className}`}
		>
			<div className="flex h-full max-h-screen flex-col gap-2">
				<div className="flex h-14 items-center border-b border-muted px-4 lg:h-12 lg:px-6">
					<Link href="/" className="flex items-center gap-2 font-semibold">
						<Package2 className="h-6 w-6" />
						<span className="">Acme Inc</span>
					</Link>
				</div>
				<div className="flex-1 pt-1">
					<nav className="grid items-start gap-0.5 px-2 text-sm font-medium lg:px-4">
						<a href="/dashboard" className={getLinkClasses("/dashboard")}>
							<Home className="h-4 w-4" />
							Dashboard
						</a>
						<a href="/orders" className={getLinkClasses("/orders")}>
							<ShoppingCart className="h-4 w-4" />
							Orders
							<Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
								6
							</Badge>
						</a>
						<a href="/products" className={getLinkClasses("/products")}>
							<Package className="h-4 w-4" />
							Products
						</a>
						<a href="/customers" className={getLinkClasses("/customers")}>
							<Users className="h-4 w-4" />
							Customers
						</a>
						<a href="/analytics" className={getLinkClasses("/analytics")}>
							<LineChart className="h-4 w-4" />
							Analytics
						</a>
					</nav>
				</div>
				<div className="mt-auto p-4">
					<Card>
						<CardHeader className="p-2 pt-0 md:p-4">
							<CardTitle>Upgrade to Pro</CardTitle>
							<CardDescription>
								Unlock all features and get unlimited access to our support
								team.
							</CardDescription>
						</CardHeader>
						<CardContent className="p-2 pt-0 md:p-4 md:pt-0">
							<Button size="sm" className="w-full">
								Upgrade
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
