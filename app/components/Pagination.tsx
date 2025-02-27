interface PaginationProps {
    currentPage: number;
    totalPages: number;
    hasResults: boolean; // нова пропса для перевірки наявності рецептів
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, hasResults, onPageChange }: PaginationProps) {
    if (!hasResults) { // перевірка чи є результати
        return (
            <div className="h-[480px] flex justify-center items-center mt-8 p-4 border rounded-lg bg-gray-900 shadow-md">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-700">
                        We couldn't find any results.
                    </h2>
                    <p className="text-gray-300 mt-2">
                        Try searching for something else instead
                    </p>
                </div>
            </div>
        );
    }

    const renderPageNumbers = () => {
        const pages = [];

        if (totalPages <= 10) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push({ type: 'page', value: i });
            }
        } else {
            for (let i = 1; i <= Math.min(7, totalPages); i++) {
                pages.push({ type: 'page', value: i });
            }
            if (totalPages > 7) {
                pages.push({ type: 'ellipsis', value: '...' });
                pages.push({ type: 'page', value: totalPages });
            }
        }

        return pages;
    };

    return (
        <div className="flex justify-center items-center mt-8">
            <button
                className="px-3 py-1 border rounded mr-2 disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                ←
            </button>

            {renderPageNumbers().map((page, index) => (
                <button
                    key={index}
                    className={`px-3 py-1 mx-1 rounded ${
                        page.type === 'page' && page.value === currentPage
                            ? 'bg-blue-500 text-white'
                            : 'border'
                    } ${page.type === 'ellipsis' ? 'cursor-default' : ''}`}
                    onClick={() => page.type === 'page' && onPageChange(page.value as number)}
                    disabled={page.type === 'ellipsis'}
                >
                    {page.value}
                </button>
            ))}

            <button
                className="px-3 py-1 border rounded ml-2 disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                →
            </button>
        </div>
    );
}
