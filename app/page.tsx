'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRecipes, fetchCategories } from './services/api';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import CategoryFilter from './components/CategoryFilter';
import { Recipe } from './types';
import Link from 'next/link';
import { useFavorites } from './hooks/useFavorites';
import RecipeCard from "@/app/components/RecipeCars";

const ITEMS_PER_PAGE = 2;

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('');

    const { favorites, addToFavorites, isFavorite } = useFavorites();

    const { data: recipesData, isLoading, error } = useQuery({
        queryKey: ['recipes', searchTerm],
        queryFn: () => fetchRecipes(searchTerm),
    });

    const { data: categoriesData } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

    const filteredRecipes = selectedCategory && recipesData?.meals
        ? recipesData.meals.filter((recipe: Recipe) => recipe.strCategory === selectedCategory)
        : recipesData?.meals || [];

    const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE) || 1;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedRecipes = filteredRecipes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <Link href="/">
                        <h1 className="text-3xl font-bold">Recipes App</h1>
                </Link>
                <Link href="/favorites" className="bg-[#442173] -200 text-black px-4 py-2 rounded">
                    Favorites ({favorites.length})
                </Link>
            </div>

            <SearchBar onSearch={setSearchTerm} />

            {isLoading ? (
                <div className="text-center py-10">Loading...</div>
            ) : error ? (
                <div className="text-center py-10">Error loading recipes</div>
            ) : !recipesData?.meals ? (
                <div className="text-center py-10">No recipes found</div>
            ) : (
                <>
                    <CategoryFilter
                        categories={categoriesData?.categories || []}
                        selectedCategory={selectedCategory}
                        onCategoryChange={handleCategoryChange}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedRecipes.map((recipe: Recipe) => (
                            <RecipeCard
                                key={recipe.idMeal}
                                recipe={recipe}
                                addToFavorites={addToFavorites}
                                isFavorite={isFavorite(recipe.idMeal)}
                            />
                        ))}
                    </div>

                    <Pagination
                        hasResults={filteredRecipes.length > 0} // перевірка чи є результати
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </main>
    );
}