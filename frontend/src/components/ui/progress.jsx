import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '../../lib/utils';

const Progress = ({ className, value, color, ...props }) => (
  <ProgressPrimitive.Root
    className={cn('relative h-4 w-full overflow-hidden rounded-full bg-gray-100', className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 transition-all duration-500"
      style={{
        transform: `translateX(-${100 - (value || 0)}%)`,
        backgroundColor: color || '#0077b6'
      }}
    />
  </ProgressPrimitive.Root>
);

export { Progress };
