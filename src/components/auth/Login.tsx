import { navigate } from "astro:transitions/client";
import { LoginForm } from "@/components/shadcn/login-form";
import {
	organization,
	sendVerificationEmail,
	signIn,
	useListOrganizations,
} from "@/lib/authClient";
import { authConfig } from "config";
import { GalleryVerticalEnd } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
export function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [needsVerification, setNeedsVerification] = useState(false);
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

	const handleResendVerification = async (sendVerification: boolean) => {
		try {
			setIsResending(true);
			setErrorMessage("");

			if (sendVerification) {
				await sendVerificationEmail({
					email,
					callbackURL: authConfig.callbackURL,
				});
			}

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
		setNeedsVerification(false);
		setIsLoading(true);

		try {
			const result = await signIn.email(
				{
					email,
					password,
					callbackURL: authConfig.callbackURL,
				},
				{
					onError: (ctx) => {
						console.error("Sign in error:", ctx.error);
						if (ctx.error.code === "EMAIL_NOT_VERIFIED") {
							setNeedsVerification(true);
							handleResendVerification(false);
						} else {
							setErrorMessage(ctx.error.message);
						}
					},
				},
			);

			if (result.data?.user) {
				await navigate("/");
			}
		} catch (error) {
			console.error("Login error:", error);
			setErrorMessage("An error occurred during login. Please try again.");
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
				<LoginForm
					onSubmit={handleSubmit}
					email={email}
					password={password}
					onEmailChange={setEmail}
					onPasswordChange={setPassword}
					errorMessage={errorMessage}
					needsVerification={needsVerification}
					onResendVerification={handleResendVerification}
					isResending={isResending}
					countdown={countdown}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
}
