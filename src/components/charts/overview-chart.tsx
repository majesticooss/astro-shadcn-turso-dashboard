"use client";

import {
	Bar,
	BarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const data = [
	{ name: "Jan", appointments: 65 },
	{ name: "Feb", appointments: 59 },
	{ name: "Mar", appointments: 80 },
	{ name: "Apr", appointments: 81 },
	{ name: "May", appointments: 56 },
	{ name: "Jun", appointments: 55 },
	{ name: "Jul", appointments: 40 },
	{ name: "Aug", appointments: 70 },
	{ name: "Sep", appointments: 90 },
	{ name: "Oct", appointments: 85 },
	{ name: "Nov", appointments: 78 },
	{ name: "Dec", appointments: 60 },
];

export function OverviewChart() {
	return (
		<ResponsiveContainer width="100%" height={350}>
			<BarChart data={data}>
				<XAxis
					dataKey="name"
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
				<Bar
					dataKey="appointments"
					fill="currentColor"
					radius={[4, 4, 0, 0]}
					className="fill-primary"
				/>
			</BarChart>
		</ResponsiveContainer>
	);
}
