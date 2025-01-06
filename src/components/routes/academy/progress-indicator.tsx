interface ProgressIndicatorProps {
	progress: number;
}

export default function ProgressIndicator({
	progress,
}: ProgressIndicatorProps) {
	return (
		<div className="relative pt-1">
			<div className="flex gap-2 mb-2 items-center justify-between">
				<div>
					<span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
						{progress === 0
							? "Not Started"
							: progress === 100
								? "Completed"
								: "In Progress"}
					</span>
				</div>
				<div className="text-right">
					<span className="text-xs font-semibold inline-block text-blue-600">
						{progress}%
					</span>
				</div>
			</div>
			<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
				<div
					style={{ width: `${progress}%` }}
					className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
				/>
			</div>
		</div>
	);
}
