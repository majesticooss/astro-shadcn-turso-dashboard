"use client";

import { Activity, Calendar, DollarSign, Download, Users } from "lucide-react";
import * as React from "react";
import type { DateRange } from "react-day-picker";

import { MonthlyRevenueChart } from "@/components/charts/monthly-revenue-chart";
import { OverviewChart } from "@/components/charts/overview-chart";
import { TreatmentDistributionChart } from "@/components/charts/treatment-distribution-chart";
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
		<div className="flex-1 space-y-4">
			<Tabs defaultValue="overview" className="space-y-4">
				<div className="flex justify-between items-center">
					<TabsList>
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="patients">Patients</TabsTrigger>
						<TabsTrigger value="appointments">Appointments</TabsTrigger>
						<TabsTrigger value="treatments">Treatments</TabsTrigger>
					</TabsList>
					<div className="flex items-center space-x-2">
						<DateRangePicker
							date={date}
							onDateChange={setDate}
							className="hidden md:flex"
						/>
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
									New Patients
								</CardTitle>
								<Users className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">+48</div>
								<p className="text-xs text-muted-foreground">
									+12% from last month
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Appointments
								</CardTitle>
								<Calendar className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">284</div>
								<p className="text-xs text-muted-foreground">
									+5% from last month
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Treatment Success Rate
								</CardTitle>
								<Activity className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">98.5%</div>
								<p className="text-xs text-muted-foreground">
									+0.5% from last month
								</p>
							</CardContent>
						</Card>
					</div>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						<Card className="col-span-4">
							<CardHeader>
								<CardTitle>Appointment Overview</CardTitle>
							</CardHeader>
							<CardContent className="pl-2">
								<OverviewChart />
							</CardContent>
						</Card>
						<Card className="col-span-3">
							<CardHeader>
								<CardTitle>Recent Patients</CardTitle>
								<div className="text-sm text-muted-foreground">
									You've seen 32 patients this week.
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
											<p className="text-sm text-muted-foreground">Cleaning</p>
										</div>
										<div className="ml-auto font-medium">+$150.00</div>
									</div>
									<div className="flex items-center">
										<Avatar className="h-9 w-9">
											<AvatarFallback>JL</AvatarFallback>
										</Avatar>
										<div className="ml-4 space-y-1">
											<p className="text-sm font-medium leading-none">
												Jackson Lee
											</p>
											<p className="text-sm text-muted-foreground">Filling</p>
										</div>
										<div className="ml-auto font-medium">+$250.00</div>
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
												Root Canal
											</p>
										</div>
										<div className="ml-auto font-medium">+$890.00</div>
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
												Extraction
											</p>
										</div>
										<div className="ml-auto font-medium">+$350.00</div>
									</div>
									<div className="flex items-center">
										<Avatar className="h-9 w-9">
											<AvatarFallback>SD</AvatarFallback>
										</Avatar>
										<div className="ml-4 space-y-1">
											<p className="text-sm font-medium leading-none">
												Sofia Davis
											</p>
											<p className="text-sm text-muted-foreground">Cleaning</p>
										</div>
										<div className="ml-auto font-medium">+$150.00</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						<Card className="col-span-4">
							<CardHeader>
								<CardTitle>Monthly Revenue</CardTitle>
							</CardHeader>
							<CardContent className="pl-2">
								<MonthlyRevenueChart />
							</CardContent>
						</Card>
						<Card className="col-span-3">
							<CardHeader>
								<CardTitle>Treatment Distribution</CardTitle>
							</CardHeader>
							<CardContent>
								<TreatmentDistributionChart />
							</CardContent>
						</Card>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
