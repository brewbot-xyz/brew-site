import React from "react";
import { motion } from "motion/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/components/card";
import { DialogTrigger } from "@/app/components/dialog";
import removeMd from "remove-markdown";
import { Command } from "@/lib/resources";

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
        whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
        onClick={() => onSelect(cmd)}
      >
        <Card className="h-full hover:cursor-pointer" aria-label="Command Card">
          <CardHeader>
            <CardTitle>{cmd.name}</CardTitle>
            <CardDescription className="truncate">
              {removeMd(cmd.description)}
            </CardDescription>
          </CardHeader>
          <hr className="border-secondary-accent" />
          <CardContent className="space-y-1.5 text-sm">
            <section className="truncate">
              <h5 className="font-normal uppercase">Aliases</h5>
              {cmd.aliases.length > 0
                ? cmd.aliases.map((a) => (
                    <code key={a} className="mr-1">
                      {a}
                    </code>
                  ))
                : "N/A"}
            </section>
            <section className="truncate">
              <h5 className="font-normal uppercase">Parameters</h5>
              {cmd.params.length > 0
                ? cmd.params.map((p) => (
                    <code key={p} className="mr-1">
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
