'use client'
import React from "react";
import { Pagination } from "@heroui/react";
import { useRouter } from 'next/navigation';

export default function CustomPagination({ totalPages, currentPage, paramsStr }) {
    const router = useRouter();

    const handlePageChange = (page) => {
        // Remove existing page parameter if it exists
        const baseParams = paramsStr.replace(/&?page=\d+/, '');
        const newParams = baseParams ? `${baseParams}&page=${page}` : `page=${page}`;
        router.push(`/searchResult?${newParams}`);
    };

    return (
        <Pagination
            color="var(--primary-blue-100)"
            page={currentPage}
            onChange={handlePageChange}
            total={totalPages}
            siblings={1}
            showControls
            boundaries={1}
        />
    )
}