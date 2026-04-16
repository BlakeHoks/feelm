import { cn } from '@/shared/lib/cn/cn'

type MovieCardSkeletonProps = {
  className?: string
}

export function MovieCardSkeleton({ className }: MovieCardSkeletonProps) {
  return (
    <div
      className={cn('overflow-hidden rounded-2xl border border-border bg-bg-elevated', className)}
      aria-hidden
    >
      <div className="aspect-[2/3] animate-pulse bg-gradient-to-br from-surface to-bg-deep" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-surface" />
        <div className="h-3 w-1/3 animate-pulse rounded bg-surface" />
        <div className="mt-3 space-y-1.5">
          <div className="h-3 w-full animate-pulse rounded bg-surface" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-surface" />
          <div className="h-3 w-4/6 animate-pulse rounded bg-surface" />
        </div>
      </div>
    </div>
  )
}
