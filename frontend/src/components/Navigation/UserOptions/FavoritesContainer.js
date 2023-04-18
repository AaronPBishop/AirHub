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
                currFavorite && currFavorite.Recipe &&
                <Recipe 
                id={currFavorite.Recipe.id}
                ownerId={currFavorite.Recipe.ownerId}
                brand={currFavorite.Recipe.brand} 
                item={currFavorite.Recipe.item} 
                cookTemp={currFavorite.Recipe.cookTemp}
                cookTime={currFavorite.Recipe.cookTime}
                notes={currFavorite.Recipe.notes}
                avgRating={currFavorite.Recipe.avgRating} 
                comments={currFavorite.Recipe.Comments}
                />)
            }
        </div>
    );
};

export default FavoritesContainer;