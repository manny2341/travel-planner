import { cn } from "../../lib/utils";

const Button = ({ className, size, disabled, ...props }) => (
  <button
    className={cn(
      "inline-flex items-center justify-center rounded-md font-medium transition-colors",
      "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed",
      size === "lg" ? "px-6 py-3 text-base" : "px-4 py-2 text-sm",
      className
    )}
    disabled={disabled}
    {...props}
  />
);

export { Button };
