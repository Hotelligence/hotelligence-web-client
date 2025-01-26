export default function RatingScoreInReview({
    reviewAverageOverallPoint, 
    reviewAveragePointCategory, 
    reviewCount, 
    reviewAverageCleanPoint, 
    reviewAverageStaffPoint, 
    reviewAverageServicePoint, 
    reviewAverageFacilityPoint, 
    reviewAverageEnvironmentPoint
}) {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-[5px]">
                <p className='h0 text-[var(--primary-gold-120)]'>{reviewAverageOverallPoint}</p>

                <div className="flex flex-col justify-between h-8 pt-[0.8rem]">
                    <h6 className='text-[var(--primary-gold-120)]'>{reviewAveragePointCategory}</h6>
                    <p className='h7'>{reviewCount} nhận xét</p>
                </div>
            </div>

            <div className="grid grid-cols-2 grid-rows-[repeat(3,0.5fr)] gap-x-8 gap-y-[0.9375rem]">
                <div>
                    <h4 className='mb-[0.25rem]'>{reviewAverageCleanPoint}/10</h4>
                    <p className='body4 opacity-80'>Sạch sẽ</p>
                </div>

                <div>
                    <h4 className='mb-[0.25rem]'>{reviewAverageStaffPoint}/10</h4>
                    <p className='body4 opacity-80'>Nhân viên</p>
                </div>

                <div>
                    <h4 className='mb-[0.25rem]'>{reviewAverageServicePoint}/10</h4>
                    <p className='body4 opacity-80'>Tiện nghi, dịch vụ</p>
                </div>

                <div>
                    <h4 className='mb-[0.25rem]'>{reviewAverageFacilityPoint}/10</h4>
                    <p className='body4 opacity-80'>Điều kiện & <br/> cơ sở vật chất</p>
                </div>

                <div>
                    <h4 className='mb-[0.25rem]'>{reviewAverageEnvironmentPoint}/10</h4>
                    <p className='body4 opacity-80'>Thân thiện với môi trường</p>
                </div>
            </div>            
        </div>
    )
}