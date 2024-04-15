import styles from "./searchbar.module.css"
import { Input } from "@nextui-org/react"

export default function Searchbar({label, icon}) {
    return (
        <div className={styles.searchbarWrapper}>
            <Input 
            // labelPlacement="inside"
            // label={label}
            placeholder={label}
            variant="bordered"
            startContent={icon}
            size="lg"
            ></Input>
        </div>
    )
}
