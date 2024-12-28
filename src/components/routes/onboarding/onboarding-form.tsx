"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building, Check, Users } from "lucide-react";
import { useState } from "react";

export default function OnboardingForm() {
	const [step, setStep] = useState(1);
	const [companyChoice, setCompanyChoice] = useState<"new" | "existing" | null>(
		null,
	);
	const [companyName, setCompanyName] = useState("");
	const [companyCode, setCompanyCode] = useState("");

	const handleNext = () => {
		if (step === 1 && companyChoice) {
			setStep(2);
		} else if (step === 2) {
			if (
				(companyChoice === "new" && companyName) ||
				(companyChoice === "existing" && companyCode)
			) {
				setStep(3);
			}
		}
	};

	const handleBack = () => {
		if (step > 1) {
			setStep(step - 1);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form submitted:", { companyChoice, companyName, companyCode });
	};

	return (
		<Card className="w-[450px]">
			<CardHeader>
				<CardTitle>User Onboarding</CardTitle>
				<CardDescription>Step {step} of 3</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit}>
					{step === 1 && (
						<div className="grid grid-cols-2 gap-4">
							<Button
								type="button"
								variant="outline"
								className={`h-auto flex flex-col items-center justify-center p-4 relative ${
									companyChoice === "new" ? "bg-primary/20 border-primary" : ""
								}`}
								onClick={() => setCompanyChoice("new")}
							>
								<Building className="w-6 h-6 mb-2" />
								<span className="text-sm text-center">
									Create a new company
								</span>
								{companyChoice === "new" && (
									<div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
										<Check className="w-4 h-4 text-primary-foreground" />
									</div>
								)}
							</Button>
							<Button
								type="button"
								variant="outline"
								className={`h-auto flex flex-col items-center justify-center p-4 relative ${
									companyChoice === "existing"
										? "bg-primary/20 border-primary"
										: ""
								}`}
								onClick={() => setCompanyChoice("existing")}
							>
								<Users className="w-6 h-6 mb-2" />
								<span className="text-sm text-center">
									Join an existing company
								</span>
								{companyChoice === "existing" && (
									<div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
										<Check className="w-4 h-4 text-primary-foreground" />
									</div>
								)}
							</Button>
						</div>
					)}
					{step === 2 && companyChoice === "new" && (
						<div className="space-y-2">
							<Label htmlFor="company-name">Company Name</Label>
							<Input
								id="company-name"
								value={companyName}
								onChange={(e) => setCompanyName(e.target.value)}
								placeholder="Enter company name"
							/>
						</div>
					)}
					{step === 2 && companyChoice === "existing" && (
						<div className="space-y-2">
							<Label htmlFor="company-code">Company Code</Label>
							<Input
								id="company-code"
								value={companyCode}
								onChange={(e) => setCompanyCode(e.target.value)}
								placeholder="Enter company code"
							/>
						</div>
					)}
					{step === 3 && (
						<div className="text-center">
							<p className="text-xl font-semibold">Confirmation</p>
							<p>
								You've chosen to {companyChoice === "new" ? "create" : "join"} a
								company.
							</p>
							{companyChoice === "new" && <p>Company Name: {companyName}</p>}
							{companyChoice === "existing" && (
								<p>Company Code: {companyCode}</p>
							)}
						</div>
					)}
				</form>
			</CardContent>
			<CardFooter className="flex justify-between">
				{step > 1 && (
					<Button variant="outline" onClick={handleBack}>
						Back
					</Button>
				)}
				{step < 3 ? (
					<Button
						onClick={handleNext}
						disabled={
							!companyChoice || (step === 2 && !companyName && !companyCode)
						}
					>
						Next
					</Button>
				) : (
					<Button type="submit" onClick={handleSubmit}>
						Submit
					</Button>
				)}
			</CardFooter>
		</Card>
	);
}
