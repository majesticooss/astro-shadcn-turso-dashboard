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
	{ name: "Jan", revenue: 12400 },
	{ name: "Feb", revenue: 11398 },
	{ name: "Mar", revenue: 15800 },
	{ name: "Apr", revenue: 16908 },
	{ name: "May", revenue: 14800 },
	{ name: "Jun", revenue: 13800 },
	{ name: "Jul", revenue: 12300 },
];

export function MonthlyRevenueChart() {
	return (
		<ResponsiveContainer width="100%" height={300}>
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
					tickFormatter={(value) => `$${value}`}
				/>
				<Tooltip />
				<Area
					type="monotone"
					dataKey="revenue"
					stroke="#8884d8"
					fill="#8884d8"
					fillOpacity={0.2}
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
}
