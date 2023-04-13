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
        style={{height: '85vh'}} 
        className={`
            flex justify-evenly flex-wrap
            overflow-y-scroll p-5 w-4/6 m-auto mt-2 container-shadow rounded-lg
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