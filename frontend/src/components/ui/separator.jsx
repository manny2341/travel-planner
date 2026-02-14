import { cn } from "../../lib/utils";

const Separator = ({ className, ...props }) => (
  <div className={cn("shrink-0 bg-gray-200 h-px w-full my-2", className)} {...props} />
);

export { Separator };
