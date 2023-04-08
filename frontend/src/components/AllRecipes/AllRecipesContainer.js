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
            overflow-auto pb-40 h-screen w-5/6 m-auto shadow mt-2 rounded-lg
            flex justify-evenly flex-wrap
        `}>
            {
                recipes && recipes.length &&
                recipes.map(currRecipe => 
                <Recipe 
                id={currRecipe.id}
                brand={currRecipe.brand} 
                item={currRecipe.item} 
                avgRating={currRecipe.avgRating} 
                />)
            }
        </div>
    );
};

export default AllRecipesContainer;