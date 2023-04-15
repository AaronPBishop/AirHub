import { useSelector } from 'react-redux';

import Recipe from '../../AllRecipes/Recipe.js';

const UserRecipesContainer = () => {
    const userRecipes = useSelector(state => state.user.user && state.user.user.userRecipes);
    
    return (
        <div
        className={`
            flex justify-evenly flex-wrap
            m-auto rounded-lg w-5/6
        `}>
            {
                (userRecipes && userRecipes.length > 0) &&
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