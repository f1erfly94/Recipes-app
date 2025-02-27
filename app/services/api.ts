import axios from 'axios';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const fetchRecipes = async (search = '') => {
    if (search) {
        return axios.get(`${API_BASE_URL}/search.php?s=${search}`).then(res => res.data);
    }
    return axios.get(`${API_BASE_URL}/search.php?s=`).then(res => res.data);
};

export const fetchRecipeById = async (id: string) => {
    return axios.get(`${API_BASE_URL}/lookup.php?i=${id}`).then(res => res.data);
};

export const fetchCategories = async () => {
    return axios.get(`${API_BASE_URL}/categories.php`).then(res => res.data);
};