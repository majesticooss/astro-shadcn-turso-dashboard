import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { GalleryVerticalEnd } from "lucide-react";

export function AccountConfirmed() {
	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<a href="/" className="flex items-center gap-2 self-center font-medium">
					<div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
						<GalleryVerticalEnd className="size-4" />
					</div>
					Acme Inc.
				</a>
				<Card>
					<CardHeader className="text-center">
						<CardTitle>Account verified!</CardTitle>
						<CardDescription>
							Your email has been successfully verified
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						<p className="text-center text-sm text-muted-foreground">
							You can now sign in to your account
						</p>
						<Button asChild className="w-full">
							<a href="/login">Continue to login</a>
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
