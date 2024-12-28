import { navigate } from "astro:transitions/client";
import { Link } from "@/components/core/Link";
import { LoginForm } from "@/components/shadcn/login-form";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/authClient";
import { GalleryVerticalEnd } from "lucide-react";
import type React from "react";
import { useState } from "react";

export const description =
	"A login form with email and password, submitting to /api/login with client-side handling. There's a link to sign up if you don't have an account. Uses Astro's View Transitions API for navigation.";

export function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMessage("");

		try {
			const result = await signIn.email(
				{
					email,
					password,
					callbackURL: "/",
				},
				{
					onError: (ctx) => {
						console.error("Sign in error:", ctx.error);
						setErrorMessage(ctx.error.message);
					},
				},
			);

			if (result.data?.user) {
				await navigate("/");
			} else {
				setErrorMessage("Login failed. Please check your credentials.");
			}
		} catch (error) {
			console.error("Login error:", error);
			setErrorMessage("An error occurred during login. Please try again.");
		}
	};

	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<a
					href="#replace"
					className="flex items-center gap-2 self-center font-medium"
				>
					<div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
						<GalleryVerticalEnd className="size-4" />
					</div>
					Acme Inc.
				</a>
				<LoginForm />
			</div>
		</div>
	);
}
