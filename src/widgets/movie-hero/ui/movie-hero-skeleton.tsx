export function MovieHeroSkeleton() {
  return (
    <section aria-busy className="relative isolate min-h-[560px] overflow-hidden md:min-h-[640px]">
      <div
        aria-hidden
        className="-z-10 absolute inset-0 animate-pulse bg-gradient-to-b from-bg-elevated to-bg-base"
      />
      <div className="mx-auto flex h-full max-w-7xl items-end px-4 pt-32 pb-12 md:px-6 md:pb-16 md:pt-40 lg:px-8">
        <div className="grid w-full gap-8 md:grid-cols-[220px_1fr] lg:grid-cols-[256px_1fr]">
          <div className="hidden md:block">
            <div className="aspect-[2/3] w-full animate-pulse rounded-2xl bg-surface" />
          </div>
          <div className="flex flex-col gap-5">
            <div className="h-12 w-3/4 animate-pulse rounded bg-surface" />
            <div className="h-5 w-1/2 animate-pulse rounded bg-surface" />
            <div className="flex gap-2">
              <div className="h-6 w-20 animate-pulse rounded-full bg-surface" />
              <div className="h-6 w-24 animate-pulse rounded-full bg-surface" />
              <div className="h-6 w-16 animate-pulse rounded-full bg-surface" />
            </div>
            <div className="flex gap-3">
              <div className="h-11 w-36 animate-pulse rounded-xl bg-surface" />
              <div className="h-11 w-40 animate-pulse rounded-xl bg-surface" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
