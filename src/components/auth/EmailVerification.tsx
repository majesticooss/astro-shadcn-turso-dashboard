import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { GalleryVerticalEnd } from "lucide-react";
import { useEffect, useState } from "react";

export function EmailVerification() {
	const [isConfirmed, setIsConfirmed] = useState(false);

	useEffect(() => {
		// Get the token from the URL if it exists
		const params = new URLSearchParams(window.location.search);
		const token = params.get("token");

		if (token) {
			setIsConfirmed(true);
		}
	}, []);

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
						<CardTitle>
							{isConfirmed ? "Account verified!" : "Check your email"}
						</CardTitle>
						<CardDescription>
							{isConfirmed
								? "Your email has been successfully verified"
								: "We've sent you a verification link to your email address"}
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						{isConfirmed ? (
							<>
								<p className="text-center text-sm text-muted-foreground">
									You can now sign in to your account
								</p>
								<Button asChild className="w-full">
									<a href="/login">Continue to login</a>
								</Button>
							</>
						) : (
							<div className="text-center text-sm text-muted-foreground">
								<p>Click the link in the email to verify your account.</p>
								<p className="mt-4">
									Didn't receive the email?{" "}
									<a
										href="/signup"
										className="text-primary underline-offset-4 hover:underline"
									>
										Try signing up again
									</a>
								</p>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
