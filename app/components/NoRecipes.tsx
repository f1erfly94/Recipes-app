import React from 'react';

const NoRecipes = () => {
    return (
        <div>
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
        </div>
    );
};

export default NoRecipes;