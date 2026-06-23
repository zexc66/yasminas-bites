import { Star } from 'lucide-react'

export function StarRating({
  rating,
  count,
  size = 13,
}: {
  rating: number
  count?: number
  size?: number
}) {
  const filled = Math.round(rating)

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= filled ? 'fill-gold text-gold' : 'fill-none text-gold/30'}
        />
      ))}
      <span className="text-xs font-semibold text-brown ml-1">{rating.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-xs text-brown-light ml-0.5">({count})</span>
      )}
    </div>
  )
}
