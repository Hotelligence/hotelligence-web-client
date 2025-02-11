import { Button, Link } from "@heroui/react";

export default function AddToButton({ label, href }) {
    return (
        <Button
            as={Link}
            href={href}
        >
            {label}
        </Button>
    );
}