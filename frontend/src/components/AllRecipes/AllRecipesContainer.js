import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchRecipes } from '../../store/recipes.js';

import Recipe from './Recipe.js';

const AllRecipesContainer = () => {
    const dispatch = useDispatch();

    useEffect(() => { dispatch(fetchRecipes()) }, []);

    const recipes = useSelector(state => state.recipes.recipes);

    return (
        <div className={`
            flex justify-evenly
        `}>
            {
                recipes && recipes.length &&
                recipes.map(currRecipe => 
                <Recipe 
                brand={currRecipe.brand} 
                item={currRecipe.item} 
                cookTemp={currRecipe.cookTemp} 
                cookTime={currRecipe.cookTime / 60} 
                avgRating={currRecipe.avgRating} 
                previewImg={currRecipe.previewImg} />)
            }
        </div>
    );
};

export default AllRecipesContainer;