import { useSelector } from 'react-redux';

import Recipe from '../../AllRecipes/Recipe.js';

const UserRecipesContainer = () => {
    const userRecipes = useSelector(state => state.user.user && state.user.user.userRecipes);
    
    return (
        <div
        style={{height: '85vh'}} 
        className={`
            flex justify-evenly flex-wrap
            overflow-y-scroll p-5 w-4/6 m-auto mt-2 container-shadow rounded-lg
        `}>
            {
                userRecipes && userRecipes.length &&
                userRecipes.map(currRecipe => 
                currRecipe &&
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

export default UserRecipesContainer;