import { Button, Link } from "@heroui/react";
import Image from 'next/image'

export default function ButtonWithImage({title, img, href, alt, onPress}) {
    return (
        <Button 
            radius="sm" 
            className="bg-white text-[var(--primary-blue-100)] h-auto w-[12.5rem] p-5 hover:shadow-[0px_4px_10px_0px_rgba(0,0,0,0.15)]" 
            variant="bordered" 
            as={Link} 
            href={href}
        > 
            <div className="flex flex-col gap-5">
                <h4 className="text-center">{title}</h4>
                <div className="h-[7.5rem] w-[7.5rem]">
                    <Image className="object-cover" src={img} alt={alt} priority/>
                </div>
            </div>
        </Button>
    )
}