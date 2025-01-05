"use client";

import {
	Area,
	AreaChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const data = [
	{ name: "Week 1", new: 24, returning: 42 },
	{ name: "Week 2", new: 18, returning: 38 },
	{ name: "Week 3", new: 32, returning: 45 },
	{ name: "Week 4", new: 15, returning: 52 },
	{ name: "Week 5", new: 28, returning: 48 },
	{ name: "Week 6", new: 22, returning: 50 },
];

export function PatientsActivityChart() {
	return (
		<ResponsiveContainer width="100%" height={350}>
			<AreaChart data={data}>
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
				<Area
					type="monotone"
					dataKey="new"
					stackId="1"
					stroke="#0ea5e9"
					fill="#0ea5e9"
					fillOpacity={0.2}
				/>
				<Area
					type="monotone"
					dataKey="returning"
					stackId="1"
					stroke="#8b5cf6"
					fill="#8b5cf6"
					fillOpacity={0.2}
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
}
