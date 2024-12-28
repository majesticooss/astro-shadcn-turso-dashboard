import { navigate } from "astro:transitions/client";
import { OnboardingForm } from "@/components/shadcn/onboarding-form";
import { GalleryVerticalEnd } from "lucide-react";
import type React from "react";
import { useState } from "react";

export const description =
	"A multi-step onboarding form that allows users to either create a new company or join an existing one. Uses Astro's View Transitions API for navigation.";

export function Onboarding() {
	const [step, setStep] = useState(1);
	const [companyChoice, setCompanyChoice] = useState<"new" | "existing" | null>(
		null,
	);
	const [companyName, setCompanyName] = useState("");
	const [companyCode, setCompanyCode] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setErrorMessage("");

		try {
			// Add your API call here
			console.log("Form submitted:", {
				companyChoice,
				companyName,
				companyCode,
			});
			await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
			await navigate("/dashboard");
		} catch (error) {
			console.error("Onboarding error:", error);
			setErrorMessage(
				"An error occurred while setting up your company. Please try again.",
			);
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
				<OnboardingForm
					step={step}
					companyChoice={companyChoice}
					companyName={companyName}
					companyCode={companyCode}
					onCompanyChoiceChange={setCompanyChoice}
					onCompanyNameChange={setCompanyName}
					onCompanyCodeChange={setCompanyCode}
					onNext={handleNext}
					onBack={handleBack}
					onSubmit={handleSubmit}
					isLoading={isLoading}
					errorMessage={errorMessage}
				/>
			</div>
		</div>
	);
}
