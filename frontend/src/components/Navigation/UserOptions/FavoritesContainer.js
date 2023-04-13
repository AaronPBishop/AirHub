import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchFavorites } from '../../../store/favorites.js';

import Recipe from '../../AllRecipes/Recipe.js';

const FavoritesContainer = () => {
    const dispatch = useDispatch();

    const userId = useSelector(state => state.user.user && state.user.user.id);
    const favorites = useSelector(state => state.favorites.recipes);

    useEffect(() => { if (userId) dispatch(fetchFavorites(userId)) }, [userId]);

    return (
        <div
        style={{height: '85vh'}} 
        className={`
            flex justify-evenly flex-wrap
            overflow-y-scroll p-5 w-4/6 m-auto mt-2 container-shadow rounded-lg
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