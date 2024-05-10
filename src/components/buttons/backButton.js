import { Button, Link } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";

export default function BackButton({href, label}) {
    return (        
        <Button className="flex justify-start mr-auto p-0" color="transparent" disableAnimation="true" as={Link} href={href}>
                <ArrowLeft size={19}/>
                <h6 className="underline underline-offset-4">{label}</h6>
        </Button>
    )
}