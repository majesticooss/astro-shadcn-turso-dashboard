import { Badge } from "@/components/ui/badge";
import Link from "@/components/ui/link";
import { StarFilledIcon } from "@radix-ui/react-icons";
import ProgressIndicator from "./progress-indicator";

interface CourseCardProps {
	course: {
		id: string;
		title: string;
		description: string;
		image: string;
		progress: number;
		category: string;
	};
}

const categoryLabels: Record<string, string> = {
	"digital-workflow": "Digital Workflow",
	"guided-surgery": "Guided Surgery",
	"immediate-loading": "Immediate Loading",
	"soft-tissue": "Soft Tissue",
};

export default function CourseCard({ course }: CourseCardProps) {
	return (
		<Link href={`/courses/${course.id}`}>
			<div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.01]">
				<div className="relative">
					<img
						src={course.image}
						alt={course.title}
						width={300}
						height={200}
						className="w-full h-64 object-cover"
					/>
					<div className="absolute top-2 right-2 flex items-center gap-2">
						<Badge variant="secondary" className="bg-white/90">
							{categoryLabels[course.category]}
						</Badge>
					</div>
				</div>
				<div className="p-4">
					<h2 className="text-xl font-semibold mb-2">{course.title}</h2>
					<p className="text-gray-600 mb-4">{course.description}</p>
					<ProgressIndicator progress={course.progress} />
				</div>
			</div>
		</Link>
	);
}
