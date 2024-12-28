import { navigate } from "astro:transitions/client";
import { SignupForm } from "@/components/shadcn/signup-form";
import { signUp } from "@/lib/authClient";
import { GalleryVerticalEnd } from "lucide-react";
import type React from "react";
import { useState } from "react";

export const description =
	"A signup form with name, email and password, submitting with client-side handling. There's an option to sign up with social providers and a link to login if you already have an account. Uses Astro's View Transitions API for navigation.";

export function Signup() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMessage("");

		try {
			const result = await signUp.email(
				{
					name: `${firstName} ${lastName}`,
					email,
					password,
				},
				{
					onError: (ctx) => {
						console.error("Sign up error:", ctx.error);
						setErrorMessage(ctx.error.message);
					},
				},
			);

			if (result.data?.user) {
				await navigate("/");
			} else {
				setErrorMessage("Sign up failed. Please try again.");
			}
		} catch (error) {
			console.error("Sign up error:", error);
			setErrorMessage("An error occurred during sign up. Please try again.");
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
				/>
			</div>
		</div>
	);
}
