import { navigate } from "astro:transitions/client";
import { ForgotPasswordForm } from "@/components/shadcn/forgot-password-form";
import { GalleryVerticalEnd } from "lucide-react";
import type React from "react";
import { useState } from "react";

export const description =
	"A forgot password form that sends a reset link to the user's email.";

export function ForgotPassword() {
	const [email, setEmail] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMessage("");

		try {
			// TODO: Implement your password reset logic here
			// For example: await auth.sendPasswordResetEmail(email);

			setIsSubmitted(true);
		} catch (error) {
			console.error("Password reset error:", error);
			setErrorMessage("An error occurred. Please try again.");
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
				<ForgotPasswordForm
					onSubmit={handleSubmit}
					email={email}
					onEmailChange={setEmail}
					errorMessage={errorMessage}
					isSubmitted={isSubmitted}
				/>
			</div>
		</div>
	);
}
