import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { deleteSession } from '../../../store/user.js';
import { resetMenu } from '../../../store/menu.js';

import CreateRecipe from './CreateRecipe.js';
import FavoritesContainer from './FavoritesContainer.js';
import UserRecipesContainer from './UserRecipesContainer.js';

const UserOptionsContainer = () => {
    const dispatch = useDispatch();

    const menu = useSelector(state => state.menu);

    const [clickedNewRecipe, setClickedNewRecipe] = useState(false);
    const [clickedFavorites, setClickedFavorites] = useState(false);
    const [clickedRecipes, setClickedRecipes] = useState(false);

    useEffect(() => {
        setClickedNewRecipe(false);
        setClickedFavorites(false);
        setClickedRecipes(false);
    }, [menu]);

    return (
        <div>
            <div className={`
                mt-28
                ${clickedNewRecipe ? 'hidden' : clickedFavorites ? 'hidden' : clickedRecipes && 'hidden'}
            `}>
                <div
                onClick={() => setClickedNewRecipe(clicked => !clicked)}
                className={`
                    text-white bg-sky-600 cursor-pointer pt-4 h-16 w-96 rounded-lg text-center border-b-4 border-sky-700 text-lg mt-20 my-6
                `}>
                    New Recipe
                </div>

                <div
                onClick={() => setClickedFavorites(clicked => !clicked)}
                className={`
                    text-white bg-sky-600 cursor-pointer pt-4 h-16 w-96 rounded-lg text-center border-b-4 border-sky-700 text-lg my-6
                `}>
                    My Favorites
                </div>

                <div
                onClick={() => setClickedRecipes(clicked => !clicked)}
                className={`
                    text-white bg-sky-600 cursor-pointer pt-4 h-16 w-96 rounded-lg text-center border-b-4 border-sky-700 text-lg my-6
                `}>
                    My Recipes
                </div>

                <div
                onClick={() => {
                    dispatch(deleteSession());
                    dispatch(resetMenu());
                }}
                className={`
                    text-white bg-sky-600 cursor-pointer pt-4 h-16 w-96 rounded-lg text-center border-b-4 border-sky-700 text-lg my-6
                `}>
                    Log Out
                </div>
            </div>

            <div className={`
                ${!clickedNewRecipe && 'hidden'}
            `}>
                <CreateRecipe />
            </div>

            <div className={`
                ${!clickedFavorites && 'hidden'}
            `}>
                <FavoritesContainer />
            </div>

            <div className={`
                ${!clickedRecipes && 'hidden'}
            `}>
                <UserRecipesContainer />
            </div>
        </div>
    );
};

export default UserOptionsContainer;