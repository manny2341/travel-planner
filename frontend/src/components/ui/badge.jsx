import { cn } from "../../lib/utils";

const Badge = ({ className, variant, ...props }) => (
  <span className={cn(
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
    variant === "secondary" ? "bg-gray-100 text-gray-800" : "bg-blue-100 text-blue-800",
    className
  )} {...props} />
);

export { Badge };
