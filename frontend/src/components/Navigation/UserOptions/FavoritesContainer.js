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
                currFavorite.Recipe &&
                <Recipe 
                id={currFavorite.Recipe.id}
                brand={currFavorite.Recipe.brand} 
                item={currFavorite.Recipe.item} 
                avgRating={currFavorite.Recipe.avgRating} 
                />)
            }
        </div>
    );
};

export default FavoritesContainer;