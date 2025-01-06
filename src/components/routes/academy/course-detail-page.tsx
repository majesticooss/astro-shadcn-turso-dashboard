"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "@/components/ui/link";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	FileTextIcon,
	HomeIcon,
	LinkedInLogoIcon,
	StarFilledIcon,
} from "@radix-ui/react-icons";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import ProgressIndicator from "./progress-indicator";

interface StepInteractiveElement {
	type: "checklist" | "tip" | "warning" | "resource";
	title?: string;
	content: string;
}

interface CourseStep {
	title: string;
	description: string;
	videoUrl: string;
	content: string;
	duration: string;
	interactive?: StepInteractiveElement[];
}

interface Course {
	id: string;
	title: string;
	description: string;
	image: string;
	progress: number;
	category: string;
	steps: CourseStep[];
	relatedCourses: string[]; // IDs of related courses
}

// Mock data for a course
const coursesData: Record<string, Course> = {
	"digital-full-arch": {
		id: "digital-full-arch",
		title: "Digital Full Arch Protocol",
		description:
			"Master the complete digital workflow for full arch implant restorations.",
		image:
			"https://astro-shadcn-turso-dashboard.majestico.co/courses/inserta/digital-full-arch.jpg",
		progress: 75,
		category: "digital-workflow",
		steps: [
			{
				title: "Introduction to Digital Full Arch",
				description:
					"Understanding the basics of digital full arch restoration",
				videoUrl: "https://www.youtube.com/embed/DZ2lDxO4LCc",
				duration: "25 minutes",
				content:
					"Digital full arch restoration represents a revolutionary approach in implant dentistry. In this introductory module, we'll explore the fundamental concepts that will transform your practice.",
				interactive: [
					{
						type: "checklist",
						title: "Before You Begin",
						content:
							"- Ensure you have basic knowledge of dental implants\n- Familiarize yourself with digital dentistry concepts\n- Review basic anatomy of the oral cavity\n- Have access to planning software (optional for learning)",
					},
					{
						type: "tip",
						title: "Pro Tip",
						content:
							"Take notes on the different workflows presented. You'll be referencing these throughout the course.",
					},
					{
						type: "resource",
						title: "Additional Resources",
						content:
							"- Digital Workflow Handbook (PDF)\n- Software Requirements Guide\n- Case Selection Checklist",
					},
				],
			},
			{
				title: "Treatment Planning",
				description: "Digital planning and case preparation",
				videoUrl: "https://www.youtube.com/embed/97wGRcShzu8",
				duration: "40 minutes",
				content:
					"Proper treatment planning is the cornerstone of successful digital full arch cases. This comprehensive module will guide you through each critical step.",
				interactive: [
					{
						type: "warning",
						title: "Critical Considerations",
						content:
							"Always verify these key factors:\n- Bone quality and quantity\n- Soft tissue condition\n- Occlusal scheme\n- Patient expectations",
					},
					{
						type: "checklist",
						title: "Planning Checklist",
						content:
							"- CBCT scan review completed\n- Digital impressions taken\n- Implant positions planned\n- Prosthetic design approved\n- Patient consent obtained",
					},
					{
						type: "resource",
						title: "Planning Tools",
						content:
							"Download our treatment planning templates and checklists to streamline your workflow.",
					},
				],
			},
			{
				title: "Surgical Protocol",
				description: "Step-by-step surgical guide implementation",
				videoUrl: "https://www.youtube.com/embed/aCtIQ_tAzlQ",
				duration: "30 minutes",
				content:
					"Master the surgical protocol for guided full arch surgery with our comprehensive step-by-step guide. This module covers essential techniques and critical considerations for successful implementation.",
				interactive: [
					{
						type: "warning",
						title: "Safety First",
						content:
							"Before beginning the surgical procedure:\n- Verify all instruments are sterilized\n- Review patient medical history\n- Confirm guide fit\n- Check all required components are present",
					},
					{
						type: "checklist",
						title: "Surgical Sequence",
						content:
							"1. Local anesthesia administration\n2. Soft tissue management\n3. Guide placement verification\n4. Initial pilot drilling\n5. Sequential osteotomy\n6. Implant placement\n7. Torque measurement\n8. ISQ recording (if applicable)\n9. Healing abutment or provisional restoration",
					},
					{
						type: "tip",
						title: "Clinical Pearls",
						content:
							"- Use copious irrigation during drilling\n- Verify guide stability throughout procedure\n- Check implant positioning with guide removed\n- Document torque values for each implant\n- Take clinical photos at key steps",
					},
					{
						type: "resource",
						title: "Supplementary Materials",
						content:
							"- Surgical Protocol Checklist (PDF)\n- Troubleshooting Guide\n- Post-operative Instructions\n- Emergency Contact Information Template",
					},
				],
			},
			{
				title: "Final Restoration",
				description: "Completing the full arch restoration",
				videoUrl: "https://www.youtube.com/embed/DZ2lDxO4LCc",
				duration: "20 minutes",
				content:
					"Complete your case with confidence:\n\n- Digital impression of implants\n- CAD/CAM workflow\n- Material selection\n- Occlusal considerations\n- Delivery protocol\n- Patient maintenance instructions",
			},
		],
		relatedCourses: ["profilo-workflow", "digital-impression"],
	},
	"profilo-workflow": {
		id: "profilo-workflow",
		title: "ProFilo Guided Surgery Workflow",
		description:
			"Learn the step-by-step ProFilo guided surgery system for precise implant placement.",
		image:
			"https://astro-shadcn-turso-dashboard.majestico.co/courses/inserta/profilo-workflow.jpg",
		progress: 0,
		category: "guided-surgery",
		steps: [
			{
				title: "ProFilo System Overview",
				description: "Introduction to the ProFilo guided surgery system",
				videoUrl: "https://www.youtube.com/embed/DZ2lDxO4LCc",
				duration: "20 minutes",
				content:
					"Get acquainted with the revolutionary ProFilo guided surgery system. This introductory module provides a comprehensive overview of the system components and workflow advantages.",
				interactive: [
					{
						type: "checklist",
						title: "System Components",
						content:
							"- Guide bases\n- Drilling sleeves\n- Fixation pins\n- Depth stops\n- Verification tools\n- Surgical kit organization",
					},
					{
						type: "resource",
						title: "Getting Started",
						content:
							"- System Components Catalog\n- Quick Start Guide\n- Maintenance Instructions\n- Sterilization Protocol",
					},
				],
			},
			{
				title: "Digital Planning Protocol",
				description: "Mastering the digital planning phase",
				videoUrl: "https://www.youtube.com/embed/97wGRcShzu8",
				duration: "35 minutes",
				content:
					"Learn how to effectively plan your cases using the ProFilo planning software. This module covers all aspects of digital treatment planning.",
				interactive: [
					{
						type: "tip",
						title: "Planning Efficiency",
						content:
							"- Use the built-in treatment templates\n- Save frequent configurations\n- Utilize the measurement tools\n- Export plans for team review",
					},
					{
						type: "warning",
						title: "Critical Checkpoints",
						content:
							"Always verify:\n- Anatomical structures\n- Implant positions\n- Guide fit\n- Sleeve positions\n- Available restorative space",
					},
				],
			},
			{
				title: "Guide Design & Production",
				description: "Creating precise surgical guides",
				videoUrl: "https://www.youtube.com/embed/aCtIQ_tAzlQ",
				duration: "25 minutes",
				content:
					"Master the guide design process and understand the key factors for successful guide production.",
				interactive: [
					{
						type: "checklist",
						title: "Design Checklist",
						content:
							"- Verify tissue support\n- Check retention features\n- Confirm irrigation channels\n- Review material thickness\n- Validate inspection windows",
					},
				],
			},
		],
		relatedCourses: ["stackable-guide", "digital-full-arch"],
	},
	"stackable-guide": {
		id: "stackable-guide",
		title: "Stackable Guide System",
		description:
			"Comprehensive training on the innovative stackable guide system for complex implant cases.",
		image:
			"https://pub-69e42f518caa4ec18826134e5013efb7.r2.dev/courses/inserta/stackable-guide.jpg",
		progress: 30,
		category: "guided-surgery",
		steps: [
			{
				title: "Stackable Guide Fundamentals",
				description: "Understanding the stackable guide concept",
				videoUrl: "https://www.youtube.com/embed/97wGRcShzu8",
				duration: "15 minutes",
				content: "Learn about the innovative stackable guide system...",
			},
			// Add more steps...
		],
		relatedCourses: ["profilo-workflow", "immediate-loading"],
	},
	"immediate-loading": {
		id: "immediate-loading",
		title: "Immediate Loading Protocols",
		description:
			"Advanced techniques for successful immediate loading cases in implant dentistry.",
		image:
			"https://astro-shadcn-turso-dashboard.majestico.co/courses/inserta/immediate-loading.jpg",
		progress: 0,
		category: "immediate-loading",
		steps: [
			{
				title: "Patient Selection",
				description: "Criteria for successful immediate loading",
				videoUrl: "https://www.youtube.com/embed/aCtIQ_tAzlQ",
				duration: "10 minutes",
				content:
					"Understanding patient selection criteria for immediate loading...",
			},
			// Add more steps...
		],
		relatedCourses: ["digital-full-arch", "soft-tissue"],
	},
	// ... add remaining courses
};

const categoryLabels: Record<string, string> = {
	"digital-workflow": "Digital Workflow",
	"guided-surgery": "Guided Surgery",
	"immediate-loading": "Immediate Loading",
	"soft-tissue": "Soft Tissue",
};

const certificateAnimation = {
	"@keyframes float": {
		"0%, 100%": { transform: "translateY(0)" },
		"50%": { transform: "translateY(-10px)" },
	},
	animation: "float 3s ease-in-out infinite",
};

// Add this function to generate a certificate URL (mock for now)
const generateCertificateUrl = (course: Course) => {
	// This would typically call your backend to generate a PDF
	return `#generate-certificate-${course.id}`;
};

function Congratulations({
	onNext,
	relatedCourses,
	course,
}: {
	onNext: () => void;
	relatedCourses: Course[];
	course: Course;
}) {
	useEffect(() => {
		const end = Date.now() + 3 * 1000;
		const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

		const frame = () => {
			if (Date.now() > end) return;

			confetti({
				particleCount: 2,
				angle: 60,
				spread: 55,
				startVelocity: 60,
				origin: { x: 0, y: 0.5 },
				colors: colors,
			});
			confetti({
				particleCount: 2,
				angle: 120,
				spread: 55,
				startVelocity: 60,
				origin: { x: 1, y: 0.5 },
				colors: colors,
			});

			requestAnimationFrame(frame);
		};

		frame();
	}, []);

	const handleShareToLinkedIn = () => {
		// LinkedIn sharing URL
		const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
			course.title,
		)}&organizationName=Inserta&issueYear=${new Date().getFullYear()}&issueMonth=${
			new Date().getMonth() + 1
		}`;
		window.open(linkedInUrl, "_blank");
	};

	const handleDownloadCertificate = () => {
		// In a real app, this would download a PDF certificate
		const certificateUrl = generateCertificateUrl(course);
		window.open(certificateUrl, "_blank");
	};

	return (
		<div className="text-center space-y-6 py-12">
			<div className="flex flex-col items-center gap-6">
				<div
					className="w-32 h-32 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden"
					style={certificateAnimation as any}
				>
					<div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent rotate-45" />
					<FileTextIcon className="w-16 h-16 text-emerald-600" />
				</div>
				<div>
					<h2 className="text-3xl font-bold mb-2">🎉 Congratulations!</h2>
					<p className="text-xl text-gray-600">
						You've earned your certificate in
					</p>
					<p className="text-2xl font-semibold text-emerald-600 mt-1">
						{course.title}
					</p>
				</div>
			</div>

			<div className="flex justify-center gap-4 mt-8">
				<Button
					variant="outline"
					onClick={handleShareToLinkedIn}
					className="flex items-center gap-2 hover:bg-[#0077b5]/10"
				>
					<LinkedInLogoIcon className="w-5 h-5 text-[#0077b5]" />
					Add to LinkedIn
				</Button>
				<Button
					variant="outline"
					onClick={handleDownloadCertificate}
					className="flex items-center gap-2"
				>
					<FileTextIcon className="w-5 h-5" />
					Download Certificate
				</Button>
				<Link href="/courses/inserta">
					<Button>Back to Courses</Button>
				</Link>
			</div>

			{relatedCourses.length > 0 && (
				<div className="space-y-4 mt-8">
					<h3 className="text-xl font-semibold">Recommended Next Steps</h3>
					<div className="flex justify-center items-center gap-4 max-w-2xl mx-auto">
						{relatedCourses.map((course) => (
							<Link key={course.id} href={`/courses/${course.id}`}>
								<div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
									<h4 className="font-semibold">{course.title}</h4>
									<p className="text-sm text-gray-600">{course.description}</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

function InteractiveElement({ element }: { element: StepInteractiveElement }) {
	const icons = {
		checklist: "✓",
		tip: "💡",
		warning: "⚠️",
		resource: "📚",
	};

	return (
		<div className="border rounded-lg p-4 my-4 bg-gray-50">
			<div className="flex items-center gap-2 font-semibold mb-2">
				<span>{icons[element.type]}</span>
				{element.title && <h4>{element.title}</h4>}
			</div>
			<div className="prose prose-sm max-w-none">
				{element.content.split("\n").map((line, i) => (
					<p key={i} className="my-1">
						{line}
					</p>
				))}
			</div>
		</div>
	);
}

export default function CourseDetailPage({ courseId }: { courseId: string }) {
	const [currentStep, setCurrentStep] = useState(0);
	const course = coursesData[courseId];

	const handleStepChange = (newStep: number) => {
		setCurrentStep(newStep);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	if (!course) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="text-center text-gray-500">Course not found</div>
			</div>
		);
	}

	const isLastStep = currentStep === course.steps.length;
	const currentStepData = course.steps[currentStep];
	const relatedCourses = course.relatedCourses
		.map((id) => coursesData[id])
		.filter(Boolean);

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-4xl mx-auto">
				<div className="flex items-center justify-between mb-8">
					<div className="flex items-center gap-2 text-sm text-gray-600">
						<Link
							href="/courses/inserta"
							className="flex items-center hover:text-gray-900"
						>
							<HomeIcon className="h-4 w-4 mr-1" />
							Courses
						</Link>
						<ChevronRightIcon className="h-4 w-4" />
						<span className="font-medium text-gray-900">{course.title}</span>
						{!isLastStep && (
							<>
								<ChevronRightIcon className="h-4 w-4" />
								<span className="text-gray-900">
									Step {currentStep + 1} of {course.steps.length}
								</span>
							</>
						)}
					</div>
					<ProgressIndicator
						progress={Math.round((currentStep / course.steps.length) * 100)}
						className="h-4 w-20"
					/>
				</div>

				{isLastStep ? (
					<Congratulations
						onNext={() => setCurrentStep(0)}
						relatedCourses={relatedCourses}
						course={course}
					/>
				) : (
					<>
						<div className="aspect-video w-full bg-gray-100 rounded-lg mb-6">
							<iframe
								src={currentStepData.videoUrl}
								className="w-full h-full rounded-lg"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						</div>

						<div className="space-y-6">
							<div>
								<div className="flex items-center justify-between mb-2">
									<h2 className="text-2xl font-bold">
										Step {currentStep + 1}: {currentStepData.title}
									</h2>
									<span className="text-gray-500">
										{currentStepData.duration}
									</span>
								</div>
								<p className="text-gray-600">{currentStepData.description}</p>
							</div>

							<div className="prose max-w-none">{currentStepData.content}</div>

							{currentStepData.interactive?.map((element, index) => (
								<InteractiveElement key={index} element={element} />
							))}

							<div className="flex justify-between pt-6">
								<Button
									variant="outline"
									onClick={() => handleStepChange(Math.max(0, currentStep - 1))}
									disabled={currentStep === 0}
								>
									<ChevronLeftIcon className="mr-2 h-4 w-4" />
									Previous
								</Button>
								<Button onClick={() => handleStepChange(currentStep + 1)}>
									{currentStep === course.steps.length - 1
										? "Complete Course"
										: "Next"}
									<ChevronRightIcon className="ml-2 h-4 w-4" />
								</Button>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
