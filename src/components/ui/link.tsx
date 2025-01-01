import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

export interface LinkProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	asChild?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
	({ className, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "a";
		return <Comp className={cn(className)} ref={ref} {...props} />;
	},
);

Link.displayName = "Link";

export { Link };

export default Link;
