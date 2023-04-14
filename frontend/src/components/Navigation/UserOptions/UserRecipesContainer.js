import { useSelector } from 'react-redux';

import Recipe from '../../AllRecipes/Recipe.js';

const UserRecipesContainer = () => {
    const userRecipes = useSelector(state => state.user.user && state.user.user.userRecipes);
    
    return (
        <div
        style={{height: '85vh'}} 
        className={`
            flex justify-evenly flex-wrap
            p-6 m-auto w-5/6 rounded-lg
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