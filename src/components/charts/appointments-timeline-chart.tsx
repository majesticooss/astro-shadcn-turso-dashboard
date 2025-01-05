"use client";

import {
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const data = [
	{ time: "9:00", scheduled: 4, completed: 3 },
	{ time: "10:00", scheduled: 5, completed: 5 },
	{ time: "11:00", scheduled: 6, completed: 6 },
	{ time: "12:00", scheduled: 2, completed: 2 },
	{ time: "13:00", scheduled: 4, completed: 4 },
	{ time: "14:00", scheduled: 5, completed: 4 },
	{ time: "15:00", scheduled: 3, completed: 3 },
	{ time: "16:00", scheduled: 4, completed: 3 },
];

export function AppointmentsTimelineChart() {
	return (
		<ResponsiveContainer width="100%" height={350}>
			<LineChart data={data}>
				<XAxis
					dataKey="time"
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
				/>
				<YAxis
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
					tickFormatter={(value) => `${value}`}
				/>
				<Tooltip />
				<Line
					type="monotone"
					dataKey="scheduled"
					stroke="#0ea5e9"
					strokeWidth={2}
					dot={false}
				/>
				<Line
					type="monotone"
					dataKey="completed"
					stroke="#8b5cf6"
					strokeWidth={2}
					dot={false}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
}
