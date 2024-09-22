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
import React, { useRef } from "react";

export const description =
	"A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account";

export function RegisterForm() {
	const formRef = useRef(null);
	const errorMessageRef = useRef(null);

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
						data.error || "An error occurred during registration.";
				}
			}
		} catch (error) {
			if (errorMessageRef.current) {
				errorMessageRef.current.innerText =
					"An error occurred during registration.";
			}
		}
	};

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-xl">Sign Up</CardTitle>
				<CardDescription>
					Enter your information to create an account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					ref={formRef}
					method="post"
					action="/api/signup"
					onSubmit={handleSubmit}
				>
					<div className="grid gap-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="first-name">First name</Label>
								<Input
									id="first-name"
									name="firstName"
									placeholder="Max"
									required
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="last-name">Last name</Label>
								<Input
									id="last-name"
									name="lastName"
									placeholder="Robinson"
									required
								/>
							</div>
						</div>
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
							<Label htmlFor="password">Password</Label>
							<Input id="password" name="password" type="password" required />
						</div>
						<Button type="submit" className="w-full">
							Create an account
						</Button>
					</div>
					<p ref={errorMessageRef} className="mt-2 text-sm text-red-600" />
				</form>
				<div className="mt-4 text-center text-sm">
					Already have an account?{" "}
					<Link href="/login" className="underline">
						Sign in
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
