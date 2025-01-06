import { Image } from "astro:assets";
import ProgressIndicator from "@/components/routes/academy/progress-indicator";
import Link from "@/components/ui/link";

interface CourseCardProps {
	course: {
		id: string;
		title: string;
		description: string;
		image: string;
		progress: number;
	};
}

export default function CourseCard({ course }: CourseCardProps) {
	return (
		<Link href={`/courses/${course.id}`}>
			<div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.01]">
				<img
					src={course.image}
					alt={course.title}
					width={300}
					height={200}
					className="w-full h-64 object-cover"
				/>
				<div className="p-4">
					<h2 className="text-xl font-semibold mb-2">{course.title}</h2>
					<p className="text-gray-600 mb-4">{course.description}</p>
					<ProgressIndicator progress={course.progress} />
				</div>
			</div>
		</Link>
	);
}
