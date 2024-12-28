import { navigate } from "astro:transitions/client";
import { Link } from "@/components/core/Link";
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
import type React from "react";
import { useState } from "react";

export const description =
	"A login form with email and password, submitting to /api/login with client-side handling. There's a link to sign up if you don't have an account. Uses Astro's View Transitions API for navigation.";

export function LoginForm() {
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
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="m@example.com"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
								<Link
									href="#"
									className="ml-auto inline-block text-sm underline"
								>
									Forgot your password?
								</Link>
							</div>
							<Input
								id="password"
								name="password"
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<Button type="submit" className="w-full">
							Login
						</Button>
					</div>
					{errorMessage && (
						<p className="mt-2 text-sm text-red-600">{errorMessage}</p>
					)}
				</form>
				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link href="/signup" className="underline">
						Sign up
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
