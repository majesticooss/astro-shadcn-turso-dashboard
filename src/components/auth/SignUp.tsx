import { navigate } from "astro:transitions/client";
import { SignupForm } from "@/components/shadcn/signup-form";
import { sendVerificationEmail, signUp } from "@/lib/authClient";
import { GalleryVerticalEnd } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

export function Signup() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isVerificationSent, setIsVerificationSent] = useState(false);
	const [isResending, setIsResending] = useState(false);
	const [countdown, setCountdown] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (countdown > 0) {
			timer = setInterval(() => {
				setCountdown((prev) => prev - 1);
			}, 1000);
		}
		return () => clearInterval(timer);
	}, [countdown]);

	const handleResendVerification = async () => {
		try {
			setIsResending(true);
			setErrorMessage("");

			await sendVerificationEmail({
				email,
				callbackURL: "/dashboard",
			});

			setCountdown(60);
		} catch (err) {
			setErrorMessage("Failed to resend verification email. Please try again.");
		} finally {
			setIsResending(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMessage("");
		setIsLoading(true);

		try {
			const result = await signUp.email(
				{
					name: `${firstName} ${lastName}`,
					email,
					password,
					callbackURL: "/dashboard",
				},
				{
					onError: (ctx) => {
						console.error("Sign up error:", ctx.error);
						setErrorMessage(ctx.error.message);
					},
				},
			);

			if (!result.error) {
				setIsVerificationSent(true);
			}
		} catch (error) {
			console.error("Sign up error:", error);
			setErrorMessage("An error occurred during sign up. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<a href="/" className="flex items-center gap-2 self-center font-medium">
					<div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
						<GalleryVerticalEnd className="size-4" />
					</div>
					Acme Inc.
				</a>
				<SignupForm
					onSubmit={handleSubmit}
					firstName={firstName}
					setFirstName={setFirstName}
					lastName={lastName}
					setLastName={setLastName}
					email={email}
					setEmail={setEmail}
					password={password}
					setPassword={setPassword}
					errorMessage={errorMessage}
					isVerificationSent={isVerificationSent}
					onResendVerification={handleResendVerification}
					isResending={isResending}
					countdown={countdown}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
}
