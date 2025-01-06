"use client";

import { useEffect, useState } from "react";

interface Video {
	id: string;
	title: string;
	description: string;
	image: string;
	duration: string;
}

interface VideoDetailPageProps {
	videoId: string;
}

// This would typically come from an API or database
const videos: Video[] = [
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

export default function VideoDetailPage({ videoId }: VideoDetailPageProps) {
	const [video, setVideo] = useState<Video | null>(null);

	useEffect(() => {
		// Find the video with matching ID
		const foundVideo = videos.find((v) => v.id === videoId);
		setVideo(foundVideo || null);
	}, [videoId]);

	if (!video) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="text-center text-gray-500">Video not found</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-4xl mx-auto">
				<div className="aspect-video w-full bg-gray-100 rounded-lg mb-6">
					<div className="w-full h-full flex items-center justify-center">
						<img
							src={video.image}
							alt={video.title}
							className="w-full h-full object-cover rounded-lg"
						/>
					</div>
				</div>
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h1 className="text-3xl font-bold">{video.title}</h1>
						<span className="text-gray-500">{video.duration}</span>
					</div>
					<p className="text-gray-600">{video.description}</p>
				</div>
			</div>
		</div>
	);
}
