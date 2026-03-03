import { useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "./popover";

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
        "flex items-center gap-0.5 rounded bg-blue-600 px-1 text-[10px] leading-3.5",
        className,
      )}
    >
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger
          aria-label="Verified App"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <BsCheckLg />
        </PopoverTrigger>
        <PopoverContent
          className="outline-1 outline-muted"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          side="top"
        >
          <PopoverArrow className="fill-muted" />
          Verified App
        </PopoverContent>
      </Popover>
      APP
    </span>
  );
}
