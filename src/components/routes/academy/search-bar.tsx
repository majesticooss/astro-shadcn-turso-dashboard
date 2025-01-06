import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
	onSearch: (term: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(searchTerm);
	};

	return (
		<form onSubmit={handleSearch} className="relative">
			<input
				type="text"
				placeholder="Search courses..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			<Search
				className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
				size={20}
			/>
		</form>
	);
}
