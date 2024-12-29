import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { sendVerificationEmail } from "@/lib/authClient";
import type { Session, User } from "better-auth";
import { GalleryVerticalEnd } from "lucide-react";
import { useEffect, useState } from "react";

interface EmailVerificationProps {
	user?: User | null;
}

export function EmailVerification({ user }: EmailVerificationProps) {
	const [isConfirmed, setIsConfirmed] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isResending, setIsResending] = useState(false);
	const [resendSuccess, setResendSuccess] = useState(false);
	const [countdown, setCountdown] = useState(0);

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (countdown > 0) {
			timer = setInterval(() => {
				setCountdown((prev) => prev - 1);
			}, 1000);
		}
		return () => clearInterval(timer);
	}, [countdown]);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const token = params.get("token");

		if (token || user?.emailVerified) {
			setIsConfirmed(true);
		}
	}, [user]);

	const handleResendVerification = async () => {
		try {
			setIsResending(true);
			setError(null);
			setResendSuccess(false);

			if (!user?.email) return;

			await sendVerificationEmail({
				email: user?.email,
				callbackURL: "/verify-email",
			});

			setResendSuccess(true);
			setCountdown(60);
		} catch (err) {
			setError("Failed to resend verification email. Please try again.");
		} finally {
			setIsResending(false);
		}
	};

	if (
		user?.emailVerified &&
		!new URLSearchParams(window.location.search).get("token")
	) {
		return (
			<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
				<Card>
					<CardHeader className="text-center">
						<CardTitle>Email Already Verified</CardTitle>
						<CardDescription>
							Your email address has already been verified.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Button asChild className="w-full">
							<a href="/dashboard">Go to Dashboard</a>
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

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
							{error
								? "Verification Failed"
								: isConfirmed
									? "Account verified!"
									: "Check your email"}
						</CardTitle>
						<CardDescription>
							{error
								? error
								: isConfirmed
									? "Your email has been successfully verified"
									: `We've sent you a verification link to ${user?.email}`}
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						{isConfirmed ? (
							<Button asChild className="w-full">
								<a href="/dashboard">Go to Dashboard</a>
							</Button>
						) : (
							<div className="text-center text-sm text-muted-foreground">
								<p>Click the link in the email to verify your account.</p>
								<div className="mt-4 flex flex-col gap-2">
									{resendSuccess ? (
										<p className="text-green-600">
											Verification email sent! Please check your inbox.
										</p>
									) : (
										<>
											<p>Didn't receive the email?</p>
											<Button
												onClick={handleResendVerification}
												disabled={isResending || countdown > 0}
												variant="outline"
											>
												{isResending
													? "Sending..."
													: countdown > 0
														? `Resend available in ${countdown}s`
														: "Resend verification email"}
											</Button>
										</>
									)}
								</div>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
