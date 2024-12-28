import { AreaChartStacked } from "@/components/charts/AreaChartStacked";
import { BarChartMixed } from "@/components/charts/BarChartMixed";
import { InteractiveBarChart } from "@/components/charts/InteractiveBarChart";
import { LineChartMultiple } from "@/components/charts/LineChartMultiple";
import { RadarChartSimple } from "@/components/charts/RadarChartSimple";
import { RadialChartGrid } from "@/components/charts/RadialChartGrid";
import { RadialShapeChart } from "@/components/charts/RadialShapeChart";
import { RadialStackedChart } from "@/components/charts/RadialStackedChart";
import { RadialTextChart } from "@/components/charts/RadialTextChart";
import { DashboardHeader } from "@/components/routes/dashboard/Header";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
	title: "Charts - Next Template",
	description: "List of charts by shadcn-ui",
});

export default function ChartsPage() {
	return (
		<>
			<DashboardHeader heading="Charts" text="List of charts by shadcn-ui." />
			<div className="flex flex-col gap-5">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
					<RadialTextChart />
					<AreaChartStacked />
					<BarChartMixed />
					<RadarChartSimple />
				</div>

				<InteractiveBarChart />

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
					<RadialChartGrid />
					<RadialShapeChart />
					<LineChartMultiple />
					<RadialStackedChart />
				</div>
			</div>
		</>
	);
}
