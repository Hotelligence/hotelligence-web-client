"use client";
import { Button } from "@heroui/react";
import { Heart } from "lucide-react";

export default function HeartButton({ onPress, isFilled }) {
  return (
    <div className="bg-white rounded-full">
      <Button
        isIconOnly
        color="transparent"
        onPress={onPress}
        disableAnimation
      >
        <Heart
          size={24}
          fill={isFilled ? "var(--secondary-red-100)" : "none"}
          stroke="var(--secondary-red-100)"
        />
      </Button>
    </div>
  );
}
