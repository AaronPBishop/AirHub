import { useSelector } from 'react-redux';

import Recipe from '../../AllRecipes/Recipe.js';

const FavoritesContainer = () => {
    const favorites = useSelector(state => state.user.user && state.user.user.favorites);
    
    return (
        <div
        className={`
            flex justify-evenly flex-wrap
            m-auto rounded-lg w-5/6
        `}>
            {
                (favorites && favorites.length > 0) &&
                favorites.map(currFavorite => 
                currFavorite &&
                <Recipe 
                id={currFavorite.favRecipe.id}
                ownerId={currFavorite.favRecipe.ownerId}
                brand={currFavorite.favRecipe.brand} 
                item={currFavorite.favRecipe.item} 
                cookTemp={currFavorite.favRecipe.cookTemp}
                cookTime={currFavorite.favRecipe.cookTime}
                notes={currFavorite.favRecipe.notes}
                avgRating={currFavorite.favRecipe.avgRating} 
                comments={currFavorite.favRecipe.Comments}
                />)
            }
        </div>
    );
};

export default FavoritesContainer;