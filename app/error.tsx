"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/components/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="relative m-12 flex min-h-screen w-full flex-col gap-4">
      <h1 className="text-9xl">:(</h1>
      <div className="text-xl">
        <p>An error occurred and we couldn&apos;t complete your request.</p>
        <p>You can try again or return to the home page.</p>
      </div>
      <div className="my-4 flex gap-4">
        <Image
          alt="Brew"
          draggable={false}
          height={150}
          src="/assets/brew-qr.png"
          width={150}
        />
        <div className="flex flex-col gap-4">
          <Button onClick={() => reset()} size="lg">
            Try again
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            size="lg"
            variant="secondary"
          >
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
          , please provide the page you were trying to reach along with the
          following error message:
        </p>
        <code>{error.message}</code>
      </div>
    </main>
  );
}
