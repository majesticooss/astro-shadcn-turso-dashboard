"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
	{
		name: "Jan",
		total: 4000,
	},
	{
		name: "Feb",
		total: 2400,
	},
	{
		name: "Mar",
		total: 2400,
	},
	{
		name: "Apr",
		total: 4000,
	},
	{
		name: "May",
		total: 4400,
	},
	{
		name: "Jun",
		total: 1400,
	},
	{
		name: "Jul",
		total: 2200,
	},
	{
		name: "Aug",
		total: 6000,
	},
	{
		name: "Sep",
		total: 4500,
	},
	{
		name: "Oct",
		total: 3500,
	},
	{
		name: "Nov",
		total: 3700,
	},
	{
		name: "Dec",
		total: 3800,
	},
];

export function SalesOverview() {
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
					tickFormatter={(value) => `$${value}`}
				/>
				<Bar
					dataKey="total"
					fill="currentColor"
					radius={[4, 4, 0, 0]}
					className="fill-primary"
				/>
			</BarChart>
		</ResponsiveContainer>
	);
}
