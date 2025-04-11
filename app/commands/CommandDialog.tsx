import {
  DialogBox,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/dialog";
import { Command } from "@/lib/resources";
import { parseInfo } from "@/lib/utils";
import { motion, useAnimationControls } from "framer-motion";
import React, { useState } from "react";
import { BsCheckLg, BsCopy } from "react-icons/bs";

const CommandDialog = React.memo(
  ({ selected }: { selected: Command | null }) => {
    const [copyFocus, setCopyFocus] = useState(false);
    const controls = useAnimationControls();

    if (!selected) return null;

    return (
      <DialogBox className="max-w-md md:max-w-xl">
        <button
          className="absolute right-14 top-6 rounded-sm opacity-70 hover:opacity-100"
          onClick={() => {
            navigator.clipboard.writeText(selected.name);
            setCopyFocus(true);
            controls.start({
              scale: 1.36,
              transition: { duration: 0.2 },
            });
            setTimeout(() => {
              setCopyFocus(false);
              controls.start({
                scale: 1,
                transition: { duration: 0.2 },
              });
            }, 1000);
          }}
        >
          <motion.div initial={{ scale: 1 }} animate={controls}>
            {copyFocus ? (
              <BsCheckLg className="size-4" />
            ) : (
              <BsCopy className="size-4" />
            )}
          </motion.div>

          <span className="sr-only">Copy</span>
        </button>
        <DialogHeader>
          <DialogTitle>{selected.name}</DialogTitle>
          <DialogDescription>
            {parseInfo(selected.description, 24)}
          </DialogDescription>
        </DialogHeader>
        <hr className="border-secondary-accent" />
        <DialogContent>
          <div className="flex justify-between gap-2">
            <div>
              <h6 className="mb-1 font-normal uppercase">Aliases</h6>
              {selected.aliases.length > 0
                ? selected.aliases.map((a) => (
                    <code key={a} className="mr-1">
                      {a}
                    </code>
                  ))
                : "N/A"}
            </div>
            <div>
              <h6 className="mb-1 font-normal uppercase">Parameters</h6>
              {selected.params.length > 0
                ? selected.params.map((p) => (
                    <code key={p} className="mr-1">
                      {p}
                    </code>
                  ))
                : "N/A"}
            </div>
            <div>
              <h6 className="mb-1 font-normal uppercase">Information</h6>
              <div className="space-y-0.5">{parseInfo(selected.info, 16)}</div>
            </div>
          </div>
          <div className="mt-2">
            <h6 className="mb-1 font-normal uppercase">Syntax</h6>
            <code className="flex flex-col whitespace-pre-wrap px-2 py-1">
              {selected.syntax}
            </code>
          </div>
        </DialogContent>
      </DialogBox>
    );
  }
);

CommandDialog.displayName = "CommandDialog";
export default CommandDialog;
