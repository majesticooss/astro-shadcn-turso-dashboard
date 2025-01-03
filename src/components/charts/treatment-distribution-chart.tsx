"use client";

import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";

const data = [
	{ name: "Cleanings", value: 400 },
	{ name: "Fillings", value: 300 },
	{ name: "Root Canals", value: 100 },
	{ name: "Extractions", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function TreatmentDistributionChart() {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<PieChart>
				<Pie
					data={data}
					cx="50%"
					cy="50%"
					labelLine={false}
					outerRadius={80}
					fill="#8884d8"
					dataKey="value"
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Tooltip />
				<Legend />
			</PieChart>
		</ResponsiveContainer>
	);
}
