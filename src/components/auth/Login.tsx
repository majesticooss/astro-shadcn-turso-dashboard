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
import React, { useEffect, useRef } from "react";

export const description =
	"A login form with email and password, submitting to /api/login with client-side handling. There's a link to sign up if you don't have an account. Uses Astro's View Transitions API for navigation.";

export function LoginForm() {
	const formRef = useRef(null);
	const errorMessageRef = useRef(null);

	useEffect(() => {
		const form = formRef.current;
		if (form) {
			form.addEventListener("submit", handleSubmit);
		}

		return () => {
			if (form) {
				form.removeEventListener("submit", handleSubmit);
			}
		};
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (errorMessageRef.current) {
			errorMessageRef.current.innerText = "";
		}
		const formElement = e.target;
		try {
			const response = await fetch(formElement.action, {
				method: formElement.method,
				body: new FormData(formElement),
				headers: {
					Accept: "application/json",
				},
			});
			if (response.ok) {
				navigate("/");
			} else {
				const data = await response.json();
				if (errorMessageRef.current) {
					errorMessageRef.current.innerText =
						data.error || "An error occurred during login.";
				}
			}
		} catch (error) {
			if (errorMessageRef.current) {
				errorMessageRef.current.innerText = "An error occurred during login.";
			}
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
				<form
					ref={formRef}
					method="post"
					action="/api/login"
					onSubmit={handleSubmit}
				>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="m@example.com"
								required
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
							<Input id="password" name="password" type="password" required />
						</div>
						<Button type="submit" className="w-full">
							Login
						</Button>
					</div>
					<p ref={errorMessageRef} className="mt-2 text-sm text-red-600" />
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
