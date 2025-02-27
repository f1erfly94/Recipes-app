'use client';

import {useQuery} from '@tanstack/react-query';
import {fetchRecipeById} from '@/app/services/api';
import Image from 'next/image';
import Link from 'next/link';
import {useFavorites} from '@/app/hooks/useFavorites';
import {use} from 'react';

export default function RecipePage({params}: { params: Promise<{ id: string }> }) {
    const {id} = use(params);

    const {favorites, addToFavorites, isFavorite} = useFavorites();

    const {data, isLoading, error} = useQuery({
        queryKey: ['recipe', id],
        queryFn: () => fetchRecipeById(id),
    });

    if (isLoading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10">Error loading recipe</div>;
    if (!data?.meals) return <div className="text-center py-10">Recipe not found</div>;

    const recipe = data.meals[0];

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== '') {
            ingredients.push({
                name: ingredient,
                measure: measure || ''
            });
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <Link href="/" className="bg-[#442173] -200 text-black px-4 py-2 rounded">
                    ← Back to all recipes
                </Link>
                <Link href="/favorites" className="bg-[#442173] -200 text-black px-4 py-2 rounded">
                    View Favorites ({favorites.length})
                </Link>
            </div>

            <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/2">
                        <div className="relative h-96 w-full">
                            <Image
                                src={recipe.strMealThumb}
                                alt={recipe.strMeal}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                        <div className=" flex flex-auto justify-evenly items-stretch py-20">
                            <button
                                onClick={() => addToFavorites(recipe)}
                                className={`mb-6 px-4 py-2 rounded ${
                                    isFavorite(recipe.idMeal)
                                        ? 'bg-red-500 text-white'
                                        : 'bg-blue-500 text-white'
                                }`}
                            >
                                {isFavorite(recipe.idMeal) ? 'Remove from Favorites' : 'Add to Favorites'}
                            </button>
                            {recipe.strYoutube && (
                                <a
                                    href={recipe.strYoutube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-[#442173] text-white mb-6 px-4 py-2 rounded "
                                >
                                    Watch on YouTube
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="md:w-1/2 p-6">
                        <h1 className="text-3xl font-bold mb-4">{recipe.strMeal}</h1>

                        <div className="flex gap-2 mb-4">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                {recipe.strCategory}
                            </span>
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                {recipe.strArea}
                            </span>
                        </div>


                        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
                        <ul className="mb-6">
                            {ingredients.map((item, index) => (
                                <li key={index} className="mb-1">
                                    <span className="font-medium">{item.name}</span>
                                    {item.measure && <span> - {item.measure}</span>}
                                </li>
                            ))}
                        </ul>


                    </div>
                </div>

                <div className="p-6 border-t">
                    <h2 className="text-xl text-center font-semibold mb-4">Instructions</h2>
                    <p className="whitespace-pre-line leading-relaxed p-6 mx-auto overflow-wrap-break-word relative">
                        {recipe.strInstructions}</p>
                </div>
            </div>
        </div>
    );
}
