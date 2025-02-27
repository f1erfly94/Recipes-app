'use client';

import NoRecipes from "@/app/components/NoRecipes";

interface PaginationProps {
    hasResults: boolean;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({currentPage, totalPages, onPageChange}: PaginationProps) {
    if (totalPages <= 0) {
        return (<NoRecipes/>)
    }

    const renderPageNumbers = () => {
        const pages = [];

        if (totalPages <= 10) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push({type: 'page', value: i});
            }
        } else {
            for (let i = 1; i <= Math.min(7, totalPages); i++) {
                pages.push({type: 'page', value: i});
            }

            if (totalPages > 7) {
                pages.push({type: 'ellipsis', value: '...'});
                pages.push({type: 'page', value: totalPages});
            }
        }

        return pages;
    };

    return (
        <div className="flex justify-center items-center mt-8">
            <button
                className="px-3 py-1 border rounded mr-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                ←
            </button>

            {renderPageNumbers().map((page, index) => {
                let buttonClasses = "px-3 py-1 mx-1 rounded ";

                if (page.type === 'ellipsis') {
                    buttonClasses += "cursor-default";
                } else if (page.type === 'page') {
                    if (page.value === currentPage) {
                        buttonClasses += "bg-blue-500 text-white font-bold";
                    } else {
                        buttonClasses += "border hover:bg-gray-100 cursor-pointer";
                    }
                }

                return (
                    <button
                        key={index}
                        className={buttonClasses}
                        onClick={() => page.type === 'page' && onPageChange(page.value as number)}
                        disabled={page.type === 'ellipsis'}
                    >
                        {page.value}
                    </button>
                );
            })}

            <button
                className="px-3 py-1 border rounded ml-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                →
            </button>
        </div>
    );
}
