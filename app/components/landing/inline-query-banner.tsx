import { GlobeOff } from "lucide-react";
import { Button } from "../button";

export function InlineQueryBanner(props: {
  show: boolean;
  isFetching: boolean;
  onRetry: () => void;
}) {
  if (!props.show) return null;

  return (
    <div
      className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 rounded-xl border border-primary-accent/75 bg-linear-to-b from-primary/75 to-primary/25 p-2 pl-4 text-primary-foreground backdrop-blur-sm lg:col-span-2"
      role="alert"
    >
      <span className="inline-flex items-center gap-2 text-sm text-white/80">
        <GlobeOff className="size-5" />
        Some live demo content couldn't be loaded.
      </span>
      <Button
        disabled={props.isFetching}
        onClick={props.onRetry}
        type="button"
        variant="secondary"
      >
        {props.isFetching ? "Retrying…" : "Retry"}
      </Button>
    </div>
  );
}
