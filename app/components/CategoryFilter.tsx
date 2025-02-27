'use client';

interface CategoryFilterProps {
    categories: { strCategory: string }[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({categories, selectedCategory, onCategoryChange}: CategoryFilterProps) {
    return (
        <div className="mb-6">
            <select
                className="p-2 border rounded"
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
            >
                <option
                    className="p-2 border rounded bg-gray-800 text-white"
                    value=""
                >
                    All Categories
                </option>
                {categories?.map((category) => (
                    <option
                        key={category.strCategory}
                        value={category.strCategory}
                        className="bg-gray-800 text-white"
                    >
                        {category.strCategory}
                    </option>
                ))}
            </select>
        </div>
    );
}