import React from "react";
import {useRadio, Chip, VisuallyHidden, tv} from "@nextui-org/react";

const radio = tv({
  slots: {
    base: "border-default hover:bg-default-200",
    content: "text-[var(--primary-blue-100)]"
  },
  variants: {
    isSelected: {
      true: {
        base: "bg-[var(--primary-blue-100)] hover:bg-[var(--primary-blue-100)] border-[var(--primary-blue-100)]",
        content: "text-[var(--primary-white-100)]"
      }
    },
  }
})

export const CustomRoomRadio = (props) => {
  const {
    children,
    isSelected,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useRadio({
    ...props
  })

  const styles = radio({ isSelected })

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        variant="bordered"
        {...getLabelProps()}
        size="lg"
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
}
