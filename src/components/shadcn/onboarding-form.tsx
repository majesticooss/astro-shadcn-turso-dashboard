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
import { cn } from "@/lib/utils";
import { Building, Check, Users } from "lucide-react";

interface OnboardingFormProps extends React.ComponentPropsWithoutRef<"div"> {
	step: number;
	companyChoice: "new" | "existing" | null;
	companyName: string;
	companyCode: string;
	onCompanyChoiceChange: (choice: "new" | "existing") => void;
	onCompanyNameChange: (value: string) => void;
	onCompanyCodeChange: (value: string) => void;
	onNext: () => void;
	onBack: () => void;
	onSubmit: (e: React.FormEvent) => void;
	isLoading?: boolean;
	errorMessage?: string;
}

export function OnboardingForm({
	className,
	step,
	companyChoice,
	companyName,
	companyCode,
	onCompanyChoiceChange,
	onCompanyNameChange,
	onCompanyCodeChange,
	onNext,
	onBack,
	onSubmit,
	isLoading,
	errorMessage,
	...props
}: OnboardingFormProps) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">User Onboarding</CardTitle>
					<CardDescription>Step {step} of 3</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmit} className="grid gap-6">
						{step === 1 && (
							<div className="grid grid-cols-2 gap-4">
								<Button
									type="button"
									variant="outline"
									className={`group relative min-h-[120px] p-6 ${
										companyChoice === "new"
											? "bg-primary/20 border-primary"
											: ""
									}`}
									onClick={() => onCompanyChoiceChange("new")}
								>
									<div className="flex flex-col items-center gap-2 w-full">
										<Building className="h-6 w-6 shrink-0" />
										<span className="text-center text-sm whitespace-normal">
											Create new company
										</span>
									</div>
									{companyChoice === "new" && (
										<div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
											<Check className="h-4 w-4 text-primary-foreground" />
										</div>
									)}
								</Button>
								<Button
									type="button"
									variant="outline"
									className={`group relative min-h-[120px] p-6 ${
										companyChoice === "existing"
											? "bg-primary/20 border-primary"
											: ""
									}`}
									onClick={() => onCompanyChoiceChange("existing")}
								>
									<div className="flex flex-col items-center gap-2 w-full">
										<Users className="h-6 w-6 shrink-0" />
										<span className="text-center text-sm whitespace-normal">
											Join existing company
										</span>
									</div>
									{companyChoice === "existing" && (
										<div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
											<Check className="h-4 w-4 text-primary-foreground" />
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
									onChange={(e) => onCompanyNameChange(e.target.value)}
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
									onChange={(e) => onCompanyCodeChange(e.target.value)}
									placeholder="Enter company code"
								/>
							</div>
						)}
						{step === 3 && (
							<div className="space-y-4 text-center">
								<div className="space-y-2">
									<p className="text-xl font-semibold">Confirmation</p>
									<p className="text-sm text-muted-foreground">
										Please review your company details before continuing
									</p>
								</div>
								<div className="rounded-lg border bg-card p-4">
									<div className="space-y-2">
										<p className="text-sm text-muted-foreground">
											You've chosen to{" "}
											{companyChoice === "new" ? "create" : "join"} a company
										</p>
										{companyChoice === "new" && (
											<p className="font-medium">{companyName}</p>
										)}
										{companyChoice === "existing" && (
											<p className="font-medium">Code: {companyCode}</p>
										)}
									</div>
								</div>
							</div>
						)}

						{errorMessage && (
							<p className="text-sm text-destructive text-center">
								{errorMessage}
							</p>
						)}

						<div className="flex justify-between">
							{step > 1 && (
								<Button type="button" variant="outline" onClick={onBack}>
									Back
								</Button>
							)}
							{step < 3 ? (
								<Button
									type="button"
									onClick={onNext}
									disabled={
										!companyChoice ||
										(step === 2 && !companyName && !companyCode)
									}
									className={cn("ml-auto", step === 1 && "w-full")}
								>
									Next
								</Button>
							) : (
								<Button type="submit" disabled={isLoading} className="ml-auto">
									{isLoading ? "Setting up..." : "Complete Setup"}
								</Button>
							)}
						</div>
					</form>
				</CardContent>
			</Card>
			<div className="text-balance text-center text-xs text-muted-foreground">
				Need help? Contact our{" "}
				<a
					href="/support"
					className="underline underline-offset-4 hover:text-primary"
				>
					support team
				</a>
			</div>
		</div>
	);
}
