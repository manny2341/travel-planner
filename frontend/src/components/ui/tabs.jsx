import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = ({ className, ...props }) => (
  <TabsPrimitive.List className={cn("inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1", className)} {...props} />
);

const TabsTrigger = ({ className, ...props }) => (
  <TabsPrimitive.Trigger className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm", className)} {...props} />
);

const TabsContent = ({ className, ...props }) => (
  <TabsPrimitive.Content className={cn("mt-2", className)} {...props} />
);

export { Tabs, TabsList, TabsTrigger, TabsContent };
