import type { AvatarProps } from "@radix-ui/react-avatar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface UserAvatarProps extends AvatarProps {
	user: {
		image?: string | null;
		name?: string | null;
	};
	className?: string;
}

export function UserAvatar({ user, className, ...props }: UserAvatarProps) {
	return (
		<Avatar className={cn(className)} {...props}>
			{user.image ? (
				<AvatarImage
					alt="Profile picture"
					src={user.image}
					referrerPolicy="no-referrer"
				/>
			) : (
				<AvatarFallback>
					<span className="sr-only">{user.name || "User"}</span>
					<Icons.user className="size-4" />
				</AvatarFallback>
			)}
		</Avatar>
	);
}
