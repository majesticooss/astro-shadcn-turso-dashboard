import Header from "@/components/core/Header";
import { Link } from "@/components/core/Link";
import Sidebar from "@/components/core/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
	Home,
	LineChart,
	Package,
	Package2,
	ShoppingCart,
	Users,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

interface AuthenticatedLayoutProps {
	className?: string;
	currentPath: string;
	children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
	className = "",
	currentPath,
	children,
}) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const handleOpenSidebar = () => {
		setIsSidebarOpen(true);
	};

	return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
			<Sidebar
				className="hidden border-r bg-muted/20 border-muted md:block"
				currentPath={currentPath}
			/>
			<Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
				<SheetContent
					side="left"
					className="flex flex-col w-[280px] sm:w-[320px]"
				>
					<nav className="grid gap-2 text-lg font-medium">
						<Link
							href="#"
							className="flex items-center gap-2 text-lg font-semibold"
						>
							<Package2 className="h-6 w-6" />
							<span>Acme Inc</span>
						</Link>
						<Link
							href="#"
							className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
						>
							<Home className="h-5 w-5" />
							Dashboard
						</Link>
						<Link
							href="#"
							className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
						>
							<ShoppingCart className="h-5 w-5" />
							Orders
							<Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
								6
							</Badge>
						</Link>
						<Link
							href="#"
							className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
						>
							<Package className="h-5 w-5" />
							Products
						</Link>
						<Link
							href="#"
							className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
						>
							<Users className="h-5 w-5" />
							Customers
						</Link>
						<Link
							href="#"
							className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
						>
							<LineChart className="h-5 w-5" />
							Analytics
						</Link>
					</nav>
					<div className="mt-auto">
						<Card>
							<CardHeader>
								<CardTitle>Upgrade to Pro</CardTitle>
								<CardDescription>
									Unlock all features and get unlimited access to our support
									team.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Button size="sm" className="w-full">
									Upgrade
								</Button>
							</CardContent>
						</Card>
					</div>
				</SheetContent>
			</Sheet>
			<div className="flex flex-col">
				<Header onOpenSidebar={handleOpenSidebar} />
				<main className="flex flex-1 basis-0 flex-col overflow-auto">
					{children}
				</main>
			</div>
		</div>
	);
};

export default AuthenticatedLayout;
