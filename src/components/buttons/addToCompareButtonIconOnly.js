"use client";
import { CirclePlus, CircleFadingPlus } from "lucide-react";
import { Button } from "@heroui/react";
import { useState, useEffect } from "react";

export default function AddToCompareButtonIconOnly({ onPress, roomId, userId }) {
    const [isInComparison, setIsInComparison] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const checkComparisonStatus = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/api/comparisons/getComparisonListByUserId/${userId}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch comparison list");
                }
                const data = await response.json();
                const comparisonList = Array.isArray(data) ? data : data.content || [];
                setIsInComparison(comparisonList.some((item) => item.roomId === roomId));
            } catch (error) {
                console.error("Error fetching comparison status:", error);
                setIsInComparison(false);
            }
        };

        if (userId && roomId) {
            checkComparisonStatus();
        }
        setMounted(true);
    }, [userId, roomId]);

    if (!mounted) {
        return null; // Return null on server-side and initial client-side render
    }

    return (
        <Button
            isIconOnly
            color="transparent"
            title={isInComparison ? "Xóa khỏi so sánh" : "Thêm vào so sánh"}
            onPress={onPress}
            disableAnimation
        >
            {isInComparison ? (
                <CircleFadingPlus size={24} />
            ) : (
                <CirclePlus size={24} />
            )}
        </Button>
    );
}
