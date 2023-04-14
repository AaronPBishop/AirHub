import { useSelector } from 'react-redux';

import Recipe from '../../AllRecipes/Recipe.js';

const FavoritesContainer = () => {
    const favorites = useSelector(state => state.user.user && state.user.user.favorites);
    
    return (
        <div
        style={{height: '85vh'}} 
        className={`
            flex justify-evenly flex-wrap
            p-6 m-auto w-5/6 rounded-lg
        `}>
            {
                favorites && favorites.length &&
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