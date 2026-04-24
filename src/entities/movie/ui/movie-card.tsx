import { posterUrl } from '@/shared/config/tmdb-image'
import { cn } from '@/shared/lib/cn/cn'
import { Star } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import type { TMDBMovieListItem } from '../model/types'

type MovieCardProps = {
	movie: TMDBMovieListItem
	overlay?: ReactNode
	className?: string
}

function releaseYear(date: string | undefined): string {
	if (!date) return '—'
	const year = date.slice(0, 4)
	return /^\d{4}$/.test(year) ? year : '—'
}

export function MovieCard({ movie, overlay, className }: MovieCardProps) {
	const poster = posterUrl(movie.poster_path, 'w342')
	const rating = movie.vote_average > 0 ? movie.vote_average.toFixed(1) : null

	return (
		<article
			className={cn(
				'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-md',
				'transition-[border-color,transform] duration-200',
				'hover:scale-[1.02] hover:border-border-strong',
				'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-bg-base',
				className,
			)}
		>
			<Link
				to='/movie/$id'
				params={{ id: movie.id }}
				className='flex h-full flex-col focus-visible:outline-none'
			>
				<div className='relative flex aspect-[2/3] items-center justify-center overflow-hidden bg-gradient-to-br from-surface to-bg-deep'>
					{poster ? (
						<img
							src={poster}
							alt={movie.title}
							loading='lazy'
							decoding='async'
							className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
						/>
					) : (
						<span className='font-mono text-fg-subtle text-xs'>
							[ no poster ]
						</span>
					)}
				</div>
				<div className='flex flex-1 flex-col p-4'>
					<h3 className='mb-1 line-clamp-1 font-semibold text-base text-fg'>
						{movie.title}
					</h3>
					<p className='mb-3 flex items-center gap-2 font-mono text-fg-muted text-xs'>
						<span>{releaseYear(movie.release_date)}</span>
						{rating && (
							<>
								<span aria-hidden>·</span>
								<span className='inline-flex items-center gap-1 text-accent-warm'>
									<Star size={12} weight='fill' /> {rating}
								</span>
							</>
						)}
					</p>
					{movie.overview && (
						<p className='line-clamp-3 text-fg-muted text-sm leading-relaxed'>
							{movie.overview}
						</p>
					)}
				</div>
			</Link>

			{overlay && <div className='absolute top-2 right-2 z-10'>{overlay}</div>}
		</article>
	)
}
