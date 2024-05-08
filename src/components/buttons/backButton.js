import Link from "next/link"
import { Button } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";

export default function BackButton({href, category}) {
    return (
        <Link href={href}>
            <Button className="flex justify-start mr-auto p-0" color="transparent" disableAnimation="true">
                    <ArrowLeft size={19}/>
                    <h6 className="underline underline-offset-4">Xem tất cả {category}</h6>
            </Button>
        </Link>
    )
}