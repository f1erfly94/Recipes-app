'use client';

import { useEffect, useState } from 'react';
import { useFavorites } from '@/app/hooks/useFavorites';
import Link from 'next/link';
import IngredientsList from '@/app/components/IngredientsList';
import RecipeCard from "@/app/components/RecipeCars";

export default function FavoritesPage() {
    const { favorites, addToFavorites, isFavorite } = useFavorites();
    const [combinedIngredients, setCombinedIngredients] = useState<{name: string, measures: string[]}[]>([]);

    useEffect(() => {
        const ingredientsMap = new Map();

        favorites.forEach(recipe => {
            for (let i = 1; i <= 20; i++) {
                const ingredient = recipe[`strIngredient${i}`];
                const measure = recipe[`strMeasure${i}`];

                if (ingredient && ingredient.trim() !== '') {
                    if (!ingredientsMap.has(ingredient)) {
                        ingredientsMap.set(ingredient, []);
                    }

                    if (measure && measure.trim() !== '') {
                        ingredientsMap.get(ingredient).push(`${measure} (${recipe.strMeal})`);
                    }
                }
            }
        });

        const combinedList = Array.from(ingredientsMap).map(([name, measures]) => ({
            name,
            measures
        }));

        setCombinedIngredients(combinedList);
    }, [favorites]);

    if (favorites.length === 0) {
        return (
            <div
                className="container mx-auto px-4 py-8 min-h-screen flex flex-col justify-center items-center text-center">
                <h1 className="text-3xl font-bold mb-6">Favorites</h1>
                <p className="mb-4">You haven't added any recipes to your favorites yet.</p>
                <Link href="/" className="inline-block bg-[#442173] text-black px-4 py-2 rounded">
                    Browse Recipes
                </Link>
            </div>

        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/" className="inline-block bg-[#442173] -200 text-black px-4 py-2 rounded">
                ← Back to all recipes
            </Link>

            <h1 className="text-3xl font-bold py-5 mb-6">Your Favorite Recipes</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {favorites.map(recipe => (
                    <RecipeCard
                        key={recipe.idMeal}
                        recipe={recipe}
                        addToFavorites={addToFavorites}
                        isFavorite={true}
                    />
                ))}
            </div>

            <IngredientsList ingredients={combinedIngredients} />
        </div>
    );
}