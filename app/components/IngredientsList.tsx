'use client';

interface Ingredient {
    name: string;
    measures: string[];
}

interface IngredientsListProps {
    ingredients: Ingredient[];
}

export default function IngredientsList({ ingredients }: IngredientsListProps) {
    return (
        <div className="bg-gray-900 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Combined Ingredients</h2>
            {ingredients.length === 0 ? (
                <p>No ingredients to display.</p>
            ) : (
                <ul className="divide-y">
                    {ingredients.map((item, index) => (
                        <li key={index} className="py-2">
                            <span className="font-medium ">{item.name}</span>
                            <ul className=" mt-4">
                                {item.measures.map((measure, idx) => (
                                    <li key={idx} className="text-gray-600">{measure}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}