import { cn } from "@/lib/utils";
import { useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from "./popover";

export default function AppTag({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <span
      className={cn(
        "rounded bg-blue-600 px-1 text-[10px] leading-[14px] flex items-center gap-0.5",
        className,
      )}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          aria-label="Verified App"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <BsCheckLg />
        </PopoverTrigger>
        <PopoverContent
          side="top"
          className="outline-1 outline-muted"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <PopoverArrow className="fill-muted" />
          Verified App
        </PopoverContent>
      </Popover>
      APP
    </span>
  );
}
