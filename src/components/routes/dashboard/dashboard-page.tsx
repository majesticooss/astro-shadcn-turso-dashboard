"use client";

import {
	Activity,
	DollarSign,
	Download,
	ShoppingCart,
	Users,
} from "lucide-react";
import * as React from "react";
import type { DateRange } from "react-day-picker";

import { SalesOverview } from "@/components/charts/sales-overview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Dashboard() {
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: new Date(2023, 0, 20),
		to: new Date(2023, 1, 9),
	});

	return (
		<div className="flex-1 space-y-4 py-4">
			<Tabs defaultValue="overview" className="space-y-4">
				<div className="flex justify-between items-center">
					<TabsList>
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="analytics">Analytics</TabsTrigger>
						<TabsTrigger value="reports">Reports</TabsTrigger>
						<TabsTrigger value="notifications">Notifications</TabsTrigger>
					</TabsList>
					<div className="flex items-center space-x-2">
						<DateRangePicker
							date={date}
							onDateChange={setDate}
							className="hidden md:flex"
						/>
						<Button>
							<Download className="mr-2 h-4 w-4" />
							Download
						</Button>
					</div>
				</div>
				<TabsContent value="overview" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Total Revenue
								</CardTitle>
								<DollarSign className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">$45,231.89</div>
								<p className="text-xs text-muted-foreground">
									+20.1% from last month
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Subscriptions
								</CardTitle>
								<Users className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">+2350</div>
								<p className="text-xs text-muted-foreground">
									+180.1% from last month
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">Sales</CardTitle>
								<ShoppingCart className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">+12,234</div>
								<p className="text-xs text-muted-foreground">
									+19% from last month
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Active Now
								</CardTitle>
								<Activity className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">+573</div>
								<p className="text-xs text-muted-foreground">
									+201 since last hour
								</p>
							</CardContent>
						</Card>
					</div>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						<Card className="col-span-4">
							<CardHeader>
								<CardTitle>Overview</CardTitle>
							</CardHeader>
							<CardContent className="pl-2">
								<SalesOverview />
							</CardContent>
						</Card>
						<Card className="col-span-3">
							<CardHeader>
								<CardTitle>Recent Sales</CardTitle>
								<div className="text-sm text-muted-foreground">
									You made 265 sales this month.
								</div>
							</CardHeader>
							<CardContent>
								<div className="space-y-8">
									<div className="flex items-center">
										<Avatar className="h-9 w-9">
											<AvatarFallback>OM</AvatarFallback>
										</Avatar>
										<div className="ml-4 space-y-1">
											<p className="text-sm font-medium leading-none">
												Olivia Martin
											</p>
											<p className="text-sm text-muted-foreground">
												olivia.martin@email.com
											</p>
										</div>
										<div className="ml-auto font-medium">+$1,999.00</div>
									</div>
									<div className="flex items-center">
										<Avatar className="h-9 w-9">
											<AvatarFallback>JL</AvatarFallback>
										</Avatar>
										<div className="ml-4 space-y-1">
											<p className="text-sm font-medium leading-none">
												Jackson Lee
											</p>
											<p className="text-sm text-muted-foreground">
												jackson.lee@email.com
											</p>
										</div>
										<div className="ml-auto font-medium">+$39.00</div>
									</div>
									<div className="flex items-center">
										<Avatar className="h-9 w-9">
											<AvatarFallback>IN</AvatarFallback>
										</Avatar>
										<div className="ml-4 space-y-1">
											<p className="text-sm font-medium leading-none">
												Isabella Nguyen
											</p>
											<p className="text-sm text-muted-foreground">
												isabella.nguyen@email.com
											</p>
										</div>
										<div className="ml-auto font-medium">+$299.00</div>
									</div>
									<div className="flex items-center">
										<Avatar className="h-9 w-9">
											<AvatarFallback>WK</AvatarFallback>
										</Avatar>
										<div className="ml-4 space-y-1">
											<p className="text-sm font-medium leading-none">
												William Kim
											</p>
											<p className="text-sm text-muted-foreground">
												will@email.com
											</p>
										</div>
										<div className="ml-auto font-medium">+$99.00</div>
									</div>
									<div className="flex items-center">
										<Avatar className="h-9 w-9">
											<AvatarFallback>SD</AvatarFallback>
										</Avatar>
										<div className="ml-4 space-y-1">
											<p className="text-sm font-medium leading-none">
												Sofia Davis
											</p>
											<p className="text-sm text-muted-foreground">
												sofia.davis@email.com
											</p>
										</div>
										<div className="ml-auto font-medium">+$39.00</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
