import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FilterDropdownProps {
	options: string[];
	onSelect: (option: string) => void;
	placeholder: string;
}

export default function FilterDropdown({
	options,
	onSelect,
	placeholder,
}: FilterDropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState("");

	const handleSelect = (option: string) => {
		setSelected(option);
		onSelect(option);
		setIsOpen(false);
	};

	return (
		<div className="relative">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center justify-between w-40 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
			>
				{selected || placeholder}
				<ChevronDown size={20} />
			</button>
			{isOpen && (
				<div className="absolute z-10 w-40 mt-1 bg-white rounded-md shadow-lg">
					<ul className="py-1">
						{options.map((option) => (
							// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
							<li
								key={option}
								onClick={() => handleSelect(option)}
								className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
							>
								{option}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
