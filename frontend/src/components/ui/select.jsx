import { useState } from 'react';
import { cn } from '../../lib/utils';

const Select = ({ value, onValueChange, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onClick={() => setOpen(!open)}>
      {children && children.map ? children.map((child, i) =>
        child.type?.displayName === 'SelectTrigger' || child.type === SelectTrigger
          ? { ...child, key: i, props: { ...child.props, open } }
          : { ...child, key: i, props: { ...child.props, open, onValueChange, setOpen } }
      ) : children}
    </div>
  );
};

const SelectTrigger = ({ className, children, open, ...props }) => (
  <button className={cn("flex items-center justify-between w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white", className)} {...props}>
    {children}
    <span className="ml-2 text-gray-400">{open ? '▲' : '▼'}</span>
  </button>
);
SelectTrigger.displayName = 'SelectTrigger';

const SelectValue = ({ placeholder }) => <span>{placeholder}</span>;

const SelectContent = ({ children, open, onValueChange, setOpen }) => open ? (
  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
    {children && children.map ? children.map((child, i) => ({
      ...child, key: i,
      props: { ...child.props, onValueChange, setOpen }
    })) : children}
  </div>
) : null;

const SelectItem = ({ value, children, onValueChange, setOpen }) => (
  <div className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer flex items-center gap-2"
    onClick={() => { onValueChange?.(value); setOpen?.(false); }}>
    {children}
  </div>
);

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
