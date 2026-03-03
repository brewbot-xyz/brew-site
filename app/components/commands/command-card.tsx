import { motion } from "motion/react";
import removeMd from "remove-markdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/card";
import { DialogTrigger } from "@/app/components/dialog";
import type { Command } from "@/lib/resources";

export default function CommandCard({
  cmd,
  onSelect,
}: {
  cmd: Command;
  onSelect: (cmd: Command) => void;
}) {
  return (
    <DialogTrigger asChild>
      <motion.div
        onClick={() => onSelect(cmd)}
        whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
      >
        <Card
          aria-label="Command Card"
          className="h-full hover:cursor-pointer"
          variant="greyscale"
        >
          <CardHeader>
            <CardTitle>{cmd.name}</CardTitle>
            <CardDescription className="truncate">
              {removeMd(cmd.description)}
            </CardDescription>
          </CardHeader>
          <div className="h-px bg-linear-to-r from-transparent via-secondary-foreground to-transparent opacity-60" />
          <CardContent className="space-y-1.5 text-sm">
            <section className="truncate">
              <h5 className="font-normal uppercase">Aliases</h5>
              {cmd.aliases.length > 0
                ? cmd.aliases.map((a) => (
                    <code className="mr-1" key={a}>
                      {a}
                    </code>
                  ))
                : "N/A"}
            </section>
            <section className="truncate">
              <h5 className="font-normal uppercase">Parameters</h5>
              {cmd.params.length > 0
                ? cmd.params.map((p) => (
                    <code className="mr-1" key={p}>
                      {p}
                    </code>
                  ))
                : "N/A"}
            </section>
          </CardContent>
        </Card>
      </motion.div>
    </DialogTrigger>
  );
}
