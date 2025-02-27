'use client';

import { useState, useEffect } from 'react';
import { Recipe } from '../types';

export function useFavorites() {
    const [favorites, setFavorites] = useState<Recipe[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const storedFavorites = typeof window !== 'undefined' ? localStorage.getItem('favorites') : null;
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded && typeof window !== 'undefined') {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }, [favorites, isLoaded]);

    const addToFavorites = (recipe: Recipe) => {
        if (favorites.some(fav => fav.idMeal === recipe.idMeal)) {
            setFavorites(favorites.filter(fav => fav.idMeal !== recipe.idMeal));
        } else {
            setFavorites([...favorites, recipe]);
        }
    };

    const isFavorite = (id: string) => {
        return favorites.some(fav => fav.idMeal === id);
    };

    return { favorites, addToFavorites, isFavorite };
}