import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function NotFound() {
	return (
		<div className="bg-background flex h-full flex-col items-center justify-center p-4 text-center">
			<div className="max-w-md space-y-6">
				<h1 className="text-9xl font-bold text-primary">404</h1>
				<h2 className="text-2xl font-semibold text-foreground">
					Page not found
				</h2>
				<p className="text-muted-foreground">
					Sorry, we couldn't find the page you're looking for. It might have
					been moved or doesn't exist.
				</p>
				<div className="pt-6">
					<a href="/">
						<Button variant="outline" className="gap-2">
							<ArrowLeft size={16} />
							Back to home
						</Button>
					</a>
				</div>
			</div>
		</div>
	);
}
