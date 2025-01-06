"use client";

import ProgressIndicator from "@/components/routes/academy/progress-indicator";
import SectionList from "@/components/routes/academy/section-list";
import { useState } from "react";

const courseData = {
	id: "1",
	title: "Introduction to React",
	description:
		"Learn the fundamentals of React, including components, state, props, and hooks. This course will give you a solid foundation to start building modern web applications with React.",
	videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
	sections: [
		{ id: "1", title: "Getting Started with React", completed: true },
		{ id: "2", title: "Components and Props", completed: true },
		{ id: "3", title: "State and Lifecycle", completed: false },
		{ id: "4", title: "Handling Events", completed: false },
		{ id: "5", title: "Hooks", completed: false },
	],
};

export default function CourseDetailPage({ courseId }: { courseId: string }) {
	const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

	const handleNext = () => {
		if (currentSectionIndex < courseData.sections.length - 1) {
			setCurrentSectionIndex(currentSectionIndex + 1);
		}
	};

	const handlePrevious = () => {
		if (currentSectionIndex > 0) {
			setCurrentSectionIndex(currentSectionIndex - 1);
		}
	};

	const progress = Math.round(
		(courseData.sections.filter((section) => section.completed).length /
			courseData.sections.length) *
			100,
	);

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-6">{courseData.title}</h1>
			<div className="aspect-video mb-6">
				<iframe
					src={courseData.videoUrl}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					className="w-full h-full"
				></iframe>
			</div>
			<div className="mb-6">
				<h2 className="text-2xl font-semibold mb-2">Course Description</h2>
				<p className="text-gray-600">{courseData.description}</p>
			</div>
			<div className="mb-6">
				<h2 className="text-2xl font-semibold mb-2">Course Progress</h2>
				<ProgressIndicator progress={progress} />
			</div>
			<div className="mb-6">
				<h2 className="text-2xl font-semibold mb-2">Course Sections</h2>
				<SectionList
					sections={courseData.sections}
					currentIndex={currentSectionIndex}
				/>
			</div>
			<div className="flex justify-between">
				<button
					onClick={handlePrevious}
					disabled={currentSectionIndex === 0}
					className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
				>
					Previous
				</button>
				<button
					onClick={handleNext}
					disabled={currentSectionIndex === courseData.sections.length - 1}
					className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
				>
					Next
				</button>
			</div>
		</div>
	);
}
