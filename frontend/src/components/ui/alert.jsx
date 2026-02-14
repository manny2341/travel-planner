import { cn } from "../../lib/utils";

const Alert = ({ className, ...props }) => (
  <div className={cn("relative w-full rounded-lg border border-blue-200 bg-blue-50 p-4", className)} {...props} />
);

const AlertDescription = ({ className, ...props }) => (
  <div className={cn("text-sm text-blue-800", className)} {...props} />
);

export { Alert, AlertDescription };
