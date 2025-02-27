'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Recipe } from '@/app/types';

interface RecipeCardProps {
    recipe: Recipe;
    addToFavorites: (recipe: Recipe) => void;
    isFavorite: boolean;
}

export default function RecipeCard({ recipe, addToFavorites, isFavorite }: RecipeCardProps) {
    return (
        <div className="border rounded-lg overflow-hidden shadow-md">
            <Link href={`/recipe/${recipe.idMeal}`}>
                <div className="relative h-48 w-full">
                    <Image
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold">{recipe.strMeal}</h3>
                    <div className="flex justify-between mt-2">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{recipe.strCategory}</span>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{recipe.strArea}</span>
                    </div>
                </div>
            </Link>
            <div className="px-4 pb-4">
                <button
                    onClick={() => addToFavorites(recipe)}
                    className={`w-full py-2 rounded ${isFavorite ? 'bg-[#442173] text-white' : 'bg-gray-900'}`}
                >
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
            </div>
        </div>
    );
}