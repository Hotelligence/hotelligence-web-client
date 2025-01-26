import Image from 'next/image'

export default function CityCard({img, city, province}) {
    return (
        <div className="flex flex-col min-w-[17.5rem] h-[13.8rem] rounded-[0.625rem] border border-[--primary-blue-50] hover:border-[--primary-blue-100] hover:shadow-[0px_4px_10px_0px_rgba(0,0,0,0.15)] hover:cursor-pointer">
            <div className="h-[9.375rem] rounded-t-[0.625rem]">
                <Image className="rounded-t-lg" src={img}/>
            </div>
            <div className="flex flex-col px-[0.9375rem] py-[0.4375rem] gap-[0.125rem]">
                <h5>{city}</h5>
                <p>{province}</p>
            </div>
        </div>
    )
}