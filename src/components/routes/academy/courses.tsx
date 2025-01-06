"use client";

import CourseCard from "@/components/routes/academy/course-card";
import FilterDropdown from "@/components/routes/academy/filter-dropdown";
import SearchBar from "@/components/routes/academy/search-bar";
import VideoCard from "@/components/routes/academy/video-card";
import { useState } from "react";

const courses = [
	{
		id: "digital-full-arch",
		title: "Digital Full Arch Protocol",
		description:
			"Master the complete digital workflow for full arch implant restorations, from planning to final prosthesis.",
		image:
			"https://astro-shadcn-turso-dashboard.majestico.co/courses/inserta/digital-full-arch.jpg",

		progress: 0,
	},
	{
		id: "profilo-workflow",
		title: "ProFilo Guided Surgery Workflow",
		description:
			"Learn the step-by-step ProFilo guided surgery system for precise implant placement.",
		image:
			"https://astro-shadcn-turso-dashboard.majestico.co/courses/inserta/profilo-workflow.jpg",
		progress: 0,
	},
	{
		id: "stackable-guide",
		title: "Stackable Guide System",
		description:
			"Comprehensive training on the innovative stackable guide system for complex implant cases.",
		image:
			"https://pub-69e42f518caa4ec18826134e5013efb7.r2.dev/courses/inserta/stackable-guide.jpg",
		progress: 0,
	},
	{
		id: "immediate-loading",
		title: "Immediate Loading Protocols",
		description:
			"Advanced techniques for successful immediate loading cases in implant dentistry.",
		image:
			"https://astro-shadcn-turso-dashboard.majestico.co/courses/inserta/course-11-2024.jpg",
		progress: 0,
	},
	{
		id: "digital-impression",
		title: "Digital Impression Mastery",
		description:
			"Perfect your digital impression techniques for implant cases using modern scanning technology.",
		image:
			"https://astro-shadcn-turso-dashboard.majestico.co/courses/inserta/course-11-2024.jpg",
		progress: 0,
	},
	{
		id: "soft-tissue",
		title: "Soft Tissue Management",
		description:
			"Essential techniques for optimal soft tissue management around dental implants.",
		image:
			"https://astro-shadcn-turso-dashboard.majestico.co/courses/inserta/course-11-2024.jpg",
		progress: 0,
	},
];

const videos = [
	{
		id: "v1",
		title: "Digital Scanning Tips & Tricks",
		description:
			"Essential techniques for accurate intraoral scanning in implant cases",
		image:
			"https://astro-shadcn-turso-dashboard.majestico.co/courses/inserta/course-11-2024.jpg",
		duration: "15:30",
	},
	{
		id: "v2",
		title: "ProFilo Guide Assembly Tutorial",
		description:
			"Step-by-step guide to properly assemble your ProFilo surgical guide",
		image:
			"https://astro-shadcn-turso-dashboard.majestico.co/courses/inserta/course-11-2024.jpg",
		duration: "12:45",
	},
	{
		id: "v3",
		title: "Soft Tissue Closure Techniques",
		description: "Advanced suturing methods for optimal implant healing",
		image:
			"https://astro-shadcn-turso-dashboard.majestico.co/courses/inserta/course-11-2024.jpg",
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
	const [categoryFilter, setCategoryFilter] = useState("All");
	const [progressFilter, setProgressFilter] = useState("All");

	const filteredCourses = courses.filter(
		(course) =>
			course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(categoryFilter === "All" || course.title.includes(categoryFilter)) &&
			(progressFilter === "All" ||
				(progressFilter === "In Progress" &&
					course.progress > 0 &&
					course.progress < 100) ||
				(progressFilter === "Completed" && course.progress === 100) ||
				(progressFilter === "Not Started" && course.progress === 0)),
	);

	const filteredVideos = videos.filter((video) =>
		video.title.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<div className="space-y-12">
			<div>
				<h2 className="text-2xl font-bold mb-6">Courses</h2>
				<div className="flex justify-between items-center mb-6">
					<SearchBar onSearch={setSearchTerm} />
					<div className="flex gap-4">
						<FilterDropdown
							options={[
								"All",
								"Digital Workflow",
								"Guided Surgery",
								"Immediate Loading",
								"Soft Tissue",
							]}
							onSelect={setCategoryFilter}
							placeholder="Category"
						/>
						<FilterDropdown
							options={["All", "Not Started", "In Progress", "Completed"]}
							onSelect={setProgressFilter}
							placeholder="Progress"
						/>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredCourses.map((course) => (
						<CourseCard key={course.id} course={course} />
					))}
				</div>
			</div>

			<div>
				<h2 className="text-2xl font-bold mb-6">Individual Videos</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredVideos.map((video) => (
						<VideoCard key={video.id} video={video} />
					))}
				</div>
			</div>
		</div>
	);
}
