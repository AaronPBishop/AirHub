import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchRecipes } from '../../store/recipes.js';

import Recipe from './Recipe.js';

const AllRecipesContainer = () => {
    const dispatch = useDispatch();

    useEffect(() => { dispatch(fetchRecipes()) }, []);

    const recipes = useSelector(state => state.recipes.recipes);

    return (
        <div
        className={`
            flex justify-evenly flex-wrap
            p-6 m-auto w-5/6 rounded-lg
        `}>
            {
                (recipes && recipes.length > 0) &&
                recipes.map(currRecipe => 
                <Recipe 
                id={currRecipe.id}
                ownerId={currRecipe.ownerId}
                brand={currRecipe.brand} 
                item={currRecipe.item} 
                cookTemp={currRecipe.cookTemp}
                cookTime={currRecipe.cookTime}
                notes={currRecipe.notes}
                avgRating={currRecipe.avgRating} 
                comments={currRecipe.Comments}
                />)
            }
        </div>
    );
};

export default AllRecipesContainer;