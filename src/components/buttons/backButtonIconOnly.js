import { Button } from "@nextui-org/react"
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BackButtonWithIcon() {
    return (
        <Button className="flex justify-start mr-auto" isIconOnly color="transparent" disableAnimation="true" as={Link} href="javascript:history.back()">
            <ArrowLeft size={24}/>
        </Button>
    )
}