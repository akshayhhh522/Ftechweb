import { Star } from "lucide-react"

interface TrustpilotRatingProps {
  small?: boolean
}

export default function TrustpilotRating({ small = false }: TrustpilotRatingProps) {
  return (
    <div className="flex items-center">
      {!small && (
        <div className="mr-2">
          <span className="text-green-500 font-bold">Trustpilot</span>
        </div>
      )}
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className={`${small ? "w-3 h-3" : "w-5 h-5"} fill-green-500 text-green-500`} />
        ))}
      </div>
    </div>
  )
}
