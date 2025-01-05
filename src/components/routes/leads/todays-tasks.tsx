"use client";

import TaskCard from "@/components/routes/leads/task-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	AlertCircle,
	Calendar,
	ChevronDown,
	ChevronUp,
	Clock,
	Phone,
} from "lucide-react";
import { useMemo, useState } from "react";

const mockTasks = {
	"New Calls": [
		{
			id: 2,
			title: "You received a call from +1 (555) 123-4567",
			timestamp: "2 hours ago",
			type: "call",
		},
		{
			id: 3,
			title: "You received a call from +1 (555) 987-6543",
			timestamp: "3 hours ago",
			type: "call",
		},
	],
	"New Leads": [
		{
			id: 4,
			title: "Call Manmohan Kundi to talk about implants",
			timestamp: "1 hour ago",
			type: "lead",
			leadDetails: {
				name: "Manmohan Kundi",
				topic: "implants",
				gdprStatus: "LEGITIMATE INTEREST",
				contactPreferences: "Call or email lead at any time",
				mobile: "07883 506906",
				email: "manmohankundi27@gmail.com",
				lastContact: {
					date: "10 December 2024, 18:26",
					method: "Mobile",
				},
				isExistingPatient: false,
				paymentPlan: "Unspecified",
			},
		},
		{
			id: 5,
			title: "Email Jane Smith about teeth whitening",
			timestamp: "4 hours ago",
			type: "lead",
			leadDetails: {
				name: "Jane Smith",
				topic: "teeth whitening",
				gdprStatus: "LEGITIMATE INTEREST",
				contactPreferences: "Email only",
				mobile: "07123 456789",
				email: "jane.smith@email.com",
				lastContact: {
					date: "15 December 2024, 14:30",
					method: "Email",
				},
				isExistingPatient: true,
				paymentPlan: "Standard",
			},
		},
	],
	"Follow Up": [
		{
			id: 6,
			title: "Follow up with Mike Johnson about his appointment",
			timestamp: "5 hours ago",
			type: "followup",
			status: "Confirmed",
			notes: "Patient expressed interest in veneers",
			dueDate: new Date().toISOString(),
		},
		{
			id: 7,
			title: "Check on Sarah Williams' Invisalign progress",
			timestamp: "1 day ago",
			type: "followup",
			status: "Overdue",
			notes: "Missed appointment yesterday",
			dueDate: new Date(
				new Date().setDate(new Date().getDate() + 1),
			).toISOString(),
		},
		{
			id: 8,
			title: "Review treatment plan with Emily Brown",
			timestamp: "2 days ago",
			type: "followup",
			status: "Scheduled",
			notes: "Discuss options for dental implants",
			dueDate: new Date(
				new Date().setDate(new Date().getDate() + 2),
			).toISOString(),
		},
		{
			id: 9,
			title: "Check healing progress for David Lee",
			timestamp: "3 days ago",
			type: "followup",
			status: "Pending",
			notes: "Post-extraction follow-up",
			dueDate: new Date(
				new Date().setDate(new Date().getDate() + 3),
			).toISOString(),
		},
	],
};

const DateNavigation = ({ selectedDate, onDateSelect, activityCounts }) => {
	const today = new Date();
	const dates = Array.from({ length: 7 }, (_, i) => {
		const date = new Date(today);
		date.setDate(today.getDate() + i);
		return date;
	});

	const formatDate = (date) => {
		const options = { weekday: "short", day: "numeric", month: "short" };
		return date.toLocaleDateString("en-US", options);
	};

	return (
		<div className="flex mb-4 gap-4">
			{dates.map((date, index) => {
				const count = activityCounts[date.toDateString()] || 0;
				return (
					<Button
						key={date.toISOString()}
						variant={
							date.toDateString() === selectedDate.toDateString()
								? "default"
								: "outline"
						}
						className="px-3 py-2 text-sm relative flex-1"
						onClick={() => onDateSelect(date)}
					>
						<div className="relative w-full flex items-center justify-center">
							<span
								className={
									date.toDateString() === selectedDate.toDateString()
										? "font-bold"
										: ""
								}
							>
								{formatDate(date)}
							</span>
							{count > 0 && (
								<Badge
									variant="secondary"
									className="absolute -top-4 -right-4 px-1 min-w-[1.5rem] h-5 flex items-center justify-center z-10"
								>
									{count}
								</Badge>
							)}
						</div>
					</Button>
				);
			})}
		</div>
	);
};

const TaskCategory = ({ title, tasks }) => {
	const [expanded, setExpanded] = useState(true);
	const [visibleTasks, setVisibleTasks] = useState(3);

	return (
		<div className="mb-6">
			<div className="flex items-center justify-between mb-2">
				<h2 className="text-xl font-bold">{title}</h2>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => setExpanded(!expanded)}
				>
					{expanded ? (
						<ChevronUp className="w-4 h-4" />
					) : (
						<ChevronDown className="w-4 h-4" />
					)}
				</Button>
			</div>
			{expanded && (
				<>
					{tasks.slice(0, visibleTasks).map((task) => (
						<TaskCard key={task.id} task={task} />
					))}
					{visibleTasks < tasks.length && (
						<Button
							variant="outline"
							className="w-full mt-2"
							onClick={() => setVisibleTasks(visibleTasks + 3)}
						>
							Load More
						</Button>
					)}
				</>
			)}
		</div>
	);
};

export function TodaysTasks() {
	const [selectedDate, setSelectedDate] = useState(new Date());

	const activityCounts = useMemo(() => {
		const counts = {};
		const today = new Date();

		// Initialize counts for the next 7 days
		for (let i = 0; i < 7; i++) {
			const date = new Date(today);
			date.setDate(today.getDate() + i);
			counts[date.toDateString()] = 0;
		}

		// Count activities for each day
		Object.values(mockTasks).forEach((categoryTasks) => {
			categoryTasks.forEach((task) => {
				const taskDate = task.dueDate ? new Date(task.dueDate) : today;
				if (counts.hasOwnProperty(taskDate.toDateString())) {
					counts[taskDate.toDateString()]++;
				}
			});
		});

		return counts;
	}, []);

	const filterTasksByDate = (tasks, date) => {
		return Object.entries(tasks).reduce((acc, [category, categoryTasks]) => {
			const filteredTasks = categoryTasks.filter((task) => {
				if (category === "Follow Up") {
					return new Date(task.dueDate).toDateString() === date.toDateString();
				}
				return new Date().toDateString() === date.toDateString();
			});
			if (filteredTasks.length > 0) {
				acc[category] = filteredTasks;
			}
			return acc;
		}, {});
	};

	const filteredTasks = filterTasksByDate(mockTasks, selectedDate);

	return (
		<div className="max-w-4xl mx-auto pt-8">
			<DateNavigation
				selectedDate={selectedDate}
				onDateSelect={setSelectedDate}
				activityCounts={activityCounts}
			/>
			{Object.entries(filteredTasks).map(([category, tasks]) => (
				<TaskCategory key={category} title={category} tasks={tasks} />
			))}
			{Object.keys(filteredTasks).length === 0 && (
				<p className="text-center text-gray-500 mt-8">
					No tasks scheduled for this date.
				</p>
			)}
		</div>
	);
}
