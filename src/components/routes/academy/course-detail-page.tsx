"use client";

import { Badge } from "@/components/ui/badge";
import { StarFilledIcon } from "@radix-ui/react-icons";
import ProgressIndicator from "./progress-indicator";

interface CourseDetailPageProps {
	courseId: string;
}

// This would typically come from an API or database
const courses = [
	{
		id: "digital-full-arch",
		title: "Digital Full Arch Protocol",
		description:
			"Master the complete digital workflow for full arch implant restorations, from planning to final prosthesis.",
		image:
			"https://astro-shadcn-turso-dashboard.majestico.co/courses/inserta/digital-full-arch.jpg",
		progress: 75,
		category: "digital-workflow",
		content: "Course content will be displayed here...",
	},
	// ... other courses
];

const categoryLabels: Record<string, string> = {
	"digital-workflow": "Digital Workflow",
	"guided-surgery": "Guided Surgery",
	"immediate-loading": "Immediate Loading",
	"soft-tissue": "Soft Tissue",
};

export default function CourseDetailPage({ courseId }: CourseDetailPageProps) {
	const course = courses.find((c) => c.id === courseId);

	if (!course) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="text-center text-gray-500">Course not found</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-4xl mx-auto">
				<div className="relative mb-6">
					<img
						src={course.image}
						alt={course.title}
						className="w-full aspect-video object-cover rounded-lg"
					/>
					<div className="absolute top-4 right-4 flex gap-2">
						{course.progress === 100 && (
							<Badge variant="default" className="bg-yellow-500/90 px-1.5">
								<StarFilledIcon className="h-4 w-4 text-white" />
							</Badge>
						)}
						<Badge variant="secondary" className="bg-white/90">
							{categoryLabels[course.category]}
						</Badge>
					</div>
				</div>
				<div className="space-y-6">
					<div>
						<h1 className="text-3xl font-bold mb-2">{course.title}</h1>
						<p className="text-gray-600">{course.description}</p>
					</div>
					<div className="bg-gray-50 p-4 rounded-lg">
						<h2 className="text-lg font-semibold mb-2">Your Progress</h2>
						<ProgressIndicator progress={course.progress} />
					</div>
					<div>
						<h2 className="text-xl font-semibold mb-4">Course Content</h2>
						<div className="prose max-w-none">{course.content}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
