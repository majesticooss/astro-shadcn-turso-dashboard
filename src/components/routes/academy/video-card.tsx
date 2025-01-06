import Link from "@/components/ui/link";

interface VideoCardProps {
	video: {
		id: string;
		title: string;
		description: string;
		image: string;
		duration: string;
	};
}

export default function VideoCard({ video }: VideoCardProps) {
	return (
		<Link href={`/videos/${video.id}`}>
			<div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.01]">
				<div className="relative">
					<img
						src={video.image}
						alt={video.title}
						width={300}
						height={200}
						className="w-full h-64 object-cover"
					/>
					<div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded-md text-sm">
						{video.duration}
					</div>
				</div>
				<div className="p-4">
					<h2 className="text-xl font-semibold mb-2">{video.title}</h2>
					<p className="text-gray-600">{video.description}</p>
				</div>
			</div>
		</Link>
	);
}
