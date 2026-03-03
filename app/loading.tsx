export default function Loading() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center">
      <div className="flex items-center justify-center space-x-2">
        <span className="sr-only">Loading...</span>
        <div className="size-8 animate-pulse rounded-full bg-primary" />
        <div className="size-8 animate-pulse rounded-full bg-primary-accent delay-100" />
        <div className="size-8 animate-pulse rounded-full bg-primary-accent/70 delay-200" />
      </div>
    </div>
  );
}
