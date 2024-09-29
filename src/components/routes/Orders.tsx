import { EmptyPlaceholder } from "@/components/core/EmptyPlaceholder";
import { DashboardHeader } from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
	title: "Orders - Next Template",
	description: "Check and manage your latest orders.",
});

export default function OrdersPage() {
	return (
		<>
			<DashboardHeader
				heading="Orders"
				text="Check and manage your latest orders."
			/>
			<EmptyPlaceholder>
				<EmptyPlaceholder.Icon name="package" />
				<EmptyPlaceholder.Title>No orders listed</EmptyPlaceholder.Title>
				<EmptyPlaceholder.Description>
					You don&apos;t have any orders yet. Start ordering a product.
				</EmptyPlaceholder.Description>
				<Button>Buy Products</Button>
			</EmptyPlaceholder>
		</>
	);
}
