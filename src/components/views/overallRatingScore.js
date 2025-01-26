export default function OverallRatingScore({reviewAverageOverallPoint}) {
    return (
        <div className="min-w-[2rem] min-h-[1.625rem] max-w-fit rounded-lg bg-[var(--primary-gold-120)] text-[var(--primary-white-100)] px-2 flex items-center">
            <p className="body1">{reviewAverageOverallPoint}</p>
        </div>
    )
}