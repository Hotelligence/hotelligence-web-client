export default function BookingForm({step, title, children}) {
    return (
        <div className="flex flex-col w-full bg-white rounded-[0.625rem] border border-[var(--primary-blue-50)]">
            <div className="flex justify-between items-center bg-[var(--primary-blue-100)] text-[var(--primary-gold-100)] px-5 py-[1.06rem] w-full rounded-t-[0.625rem]">
                <h4>Bước {step}: {title}</h4>
            </div>

            <div className="p-5 flex flex-col items-start gap-5">
                {children}
            </div>
        </div>
    )
}