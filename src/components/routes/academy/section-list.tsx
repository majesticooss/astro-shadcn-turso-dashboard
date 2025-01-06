import { CheckCircle, Circle } from "lucide-react";

interface Section {
	id: string;
	title: string;
	completed: boolean;
}

interface SectionListProps {
	sections: Section[];
	currentIndex: number;
}

export default function SectionList({
	sections,
	currentIndex,
}: SectionListProps) {
	return (
		<ul className="space-y-2">
			{sections.map((section, index) => (
				<li
					key={section.id}
					className={`flex items-center p-2 rounded ${index === currentIndex ? "bg-blue-100" : ""}`}
				>
					{section.completed ? (
						<CheckCircle className="text-green-500 mr-2" size={20} />
					) : (
						<Circle className="text-gray-300 mr-2" size={20} />
					)}
					<span
						className={section.completed ? "text-gray-500" : "text-gray-700"}
					>
						{section.title}
					</span>
				</li>
			))}
		</ul>
	);
}
