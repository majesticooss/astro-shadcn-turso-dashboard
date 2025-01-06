"use client";

import CourseCard from "@/components/routes/academy/course-card";
import SearchBar from "@/components/routes/academy/search-bar";
import VideoCard from "@/components/routes/academy/video-card";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { useState } from "react";

const categoryOptions = [
	{ label: "Digital Workflow", value: "digital-workflow" },
	{ label: "Guided Surgery", value: "guided-surgery" },
	{ label: "Immediate Loading", value: "immediate-loading" },
	{ label: "Soft Tissue", value: "soft-tissue" },
];

const progressOptions = [
	{ label: "Not Started", value: "not-started" },
	{ label: "In Progress", value: "in-progress" },
	{ label: "Completed", value: "completed" },
];

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
	},
	{
		id: "profilo-workflow",
		title: "ProFilo Guided Surgery Workflow",
		description:
			"Learn the step-by-step ProFilo guided surgery system for precise implant placement.",
		image:
			"https://astro-shadcn-turso-dashboard.majestico.co/courses/inserta/profilo-workflow.jpg",
		progress: 100,
		category: "guided-surgery",
	},
	{
		id: "stackable-guide",
		title: "Stackable Guide System",
		description:
			"Comprehensive training on the innovative stackable guide system for complex implant cases.",
		image:
			"https://pub-69e42f518caa4ec18826134e5013efb7.r2.dev/courses/inserta/stackable-guide.jpg",
		progress: 30,
		category: "guided-surgery",
	},
	{
		id: "immediate-loading",
		title: "Immediate Loading Protocols",
		description:
			"Advanced techniques for successful immediate loading cases in implant dentistry.",
		image:
			"https://astro-shadcn-turso-dashboard.majestico.co/courses/inserta/immediate-loading.jpg",
		progress: 0,
		category: "immediate-loading",
	},
	{
		id: "digital-impression",
		title: "Digital Impression Mastery",
		description:
			"Perfect your digital impression techniques for implant cases using modern scanning technology.",
		image:
			"https://astro-shadcn-turso-dashboard.majestico.co/courses/inserta/digital-impression.jpg",
		progress: 45,
		category: "digital-workflow",
	},
	{
		id: "soft-tissue",
		title: "Soft Tissue Management",
		description:
			"Essential techniques for optimal soft tissue management around dental implants.",
		image:
			"https://astro-shadcn-turso-dashboard.majestico.co/courses/inserta/soft-tissue.jpg",
		progress: 0,
		category: "soft-tissue",
	},
];

const videos = [
	{
		id: "v1",
		title: "Digital Scanning Tips & Tricks",
		description:
			"Essential techniques for accurate intraoral scanning in implant cases",
		image:
			"https://astro-shadcn-turso-dashboard.majestico.co/courses/inserta/digital-scanning.jpg",
		duration: "15:30",
	},
	{
		id: "v2",
		title: "ProFilo Guide Assembly Tutorial",
		description:
			"Step-by-step guide to properly assemble your ProFilo surgical guide",
		image:
			"https://astro-shadcn-turso-dashboard.majestico.co/courses/inserta/profilo-assembly.jpg",
		duration: "12:45",
	},
	{
		id: "v3",
		title: "Soft Tissue Closure Techniques",
		description: "Advanced suturing methods for optimal implant healing",
		image:
			"https://astro-shadcn-turso-dashboard.majestico.co/courses/inserta/profilo-workflow.jpg",
		duration: "18:20",
	},
	{
		id: "v4",
		title: "Digital Treatment Planning Essentials",
		description: "Key considerations when planning digital implant cases",
		image:
			"https://astro-shadcn-turso-dashboard.majestico.co/courses/inserta/course-11-2024.jpg",
		duration: "20:15",
	},
];

export default function Courses() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
		new Set(),
	);
	const [selectedProgress, setSelectedProgress] = useState<Set<string>>(
		new Set(),
	);

	const filteredCourses = courses.filter((course) => {
		const matchesSearch = course.title
			.toLowerCase()
			.includes(searchTerm.toLowerCase());

		const matchesCategory =
			selectedCategories.size === 0 ||
			Array.from(selectedCategories).some(
				(category) => category === course.category,
			);

		const matchesProgress =
			selectedProgress.size === 0 ||
			Array.from(selectedProgress).some((progress) => {
				switch (progress) {
					case "not-started":
						return course.progress === 0;
					case "in-progress":
						return course.progress > 0 && course.progress < 100;
					case "completed":
						return course.progress === 100;
					default:
						return true;
				}
			});

		return matchesSearch && matchesCategory && matchesProgress;
	});

	const filteredVideos = videos.filter((video) =>
		video.title.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<div className="space-y-12">
			<div>
				<h2 className="text-2xl font-bold mb-6">Courses</h2>
				<div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4 mb-6">
					<Input
						type="search"
						placeholder="Search courses and videos..."
						className="w-full sm:w-[250px]"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<MultiSelect
						title="Categories"
						options={categoryOptions}
						selectedValues={selectedCategories}
						onSelectionChange={setSelectedCategories}
					/>
					<MultiSelect
						title="Progress"
						options={progressOptions}
						selectedValues={selectedProgress}
						onSelectionChange={setSelectedProgress}
					/>
				</div>
				{filteredCourses.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredCourses.map((course) => (
							<CourseCard key={course.id} course={course} />
						))}
					</div>
				) : (
					<div className="text-center py-8 text-muted-foreground">
						No courses found matching your criteria
					</div>
				)}
			</div>

			<div>
				<h2 className="text-2xl font-bold mb-6">Individual Videos</h2>
				{filteredVideos.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredVideos.map((video) => (
							<VideoCard key={video.id} video={video} />
						))}
					</div>
				) : (
					<div className="text-center py-8 text-muted-foreground">
						No videos found matching your search
					</div>
				)}
			</div>
		</div>
	);
}
