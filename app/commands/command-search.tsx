import { Button } from "@/components/ui/button";
import { DialogBox, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CategoryName, Command } from "@/lib/resources";
import { cn } from "@/lib/utils";
import _ from "lodash";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { JSX, useState } from "react";
import {
  BsCircle,
  BsGearWideConnected,
  BsJoystick,
  BsMusicNoteList,
  BsSearch,
  BsShieldFillX,
  BsStars,
  BsTools,
} from "react-icons/bs";
import removeMd from "remove-markdown";

export const categoryMap: Record<keyof typeof CategoryName, JSX.Element> = {
  UTILITIES: <BsGearWideConnected />,
  MODERATION: <BsTools />,
  ANTINUKE: <BsShieldFillX />,
  MINIGAME: <BsJoystick />,
  MUSIC: <BsMusicNoteList />,
  MISCELLANEOUS: <BsStars />,
};

export default function CommandSearch({
  categories,
  setSelected,
}: {
  categories: { name: string; commands: Command[] }[];
  setSelected: (cmd: Command) => void;
}) {
  const [query, setQuery] = useState("");

  const results = categories
    .map<[string, Command[]]>((c) => [c.name, c.commands.filter((cmd) => cmd.name.includes(query))])
    .filter(([, cmds]) => cmds.length > 0);

  return (
    <DialogBox
      className="flex max-h-[325px] flex-col rounded-xl border sm:max-w-[425px]"
      showCloseButton={false}
    >
      <Input
        id="name"
        placeholder="Command Search"
        className={cn(
          "transition-all",
          results.length > 0 ? "rounded-none rounded-t-xl border-0 border-b" : "rounded-xl",
        )}
        startIcon={<BsSearch />}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <OverlayScrollbarsComponent
        element="div"
        className={cn(results.length > 0 ? "my-2 flex flex-col px-2" : "hidden")}
        defer
      >
        {results.flatMap(([category, commands]) =>
          commands.map((cmd) => (
            <DialogTrigger key={cmd.name} asChild>
              <Button
                onClick={() => setSelected(cmd)}
                size="sm"
                variant="ghost"
                className="mt-0.5 flex w-full justify-between space-x-10 text-muted-foreground hover:text-white"
              >
                <span className="flex items-center gap-1.5 text-white">
                  {_.get(categoryMap, category, <BsCircle />)}
                  {cmd.name}
                </span>
                <span className="truncate text-right font-light">{removeMd(cmd.description)}</span>
              </Button>
            </DialogTrigger>
          )),
        )}
      </OverlayScrollbarsComponent>
    </DialogBox>
  );
}
