"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="relative flex min-h-screen w-full flex-col m-12 gap-4">
      <h1 className="text-9xl">:(</h1>
      <div className="text-xl">
        <p>An error occurred and we couldn&apos;t complete your request.</p>
        <p>You can try again or return to the home page.</p>
      </div>
      <div className="flex gap-4 my-4">
        <Image draggable={false} src="/assets/brew-qr.png" alt="Brew" width={150} height={150} />
        <div className="flex flex-col gap-4">
          <Button size="lg" onClick={() => reset()}>
            Try again
          </Button>
          <Button size="lg" variant="secondary" onClick={() => (window.location.href = "/")}>
            Return home
          </Button>
        </div>
      </div>
      <div>
        <p>
          If you{" "}
          <Link className="underline" href="https://discord.gg/9xFAPekCfN">
            contact support
          </Link>
          , please provide the page you were trying to reach along with the following error message:
        </p>
        <code>{error.message}</code>
      </div>
    </main>
  );
}
