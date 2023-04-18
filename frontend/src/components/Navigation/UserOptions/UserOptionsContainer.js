import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { deleteSession } from '../../../store/user.js';
import { setClickedCreateRecipe, resetMenu } from '../../../store/menu.js';

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
        if (!menu.clickedCreateRecipe) setClickedNewRecipe(false);
        setClickedFavorites(false);
        setClickedRecipes(false);
    }, [menu]);

    return (
        <div className='mt-4 w-full'>
            <div className={`
                ${clickedNewRecipe ? 'hidden' : clickedFavorites ? 'hidden' : clickedRecipes && 'hidden'}
                flex justify-center flex-wrap m-auto w-2/6
            `}>
                <div
                onClick={() => {
                    dispatch(setClickedCreateRecipe());
                    setClickedNewRecipe(true);
                }}
                className={`
                    text-white bg-sky-600 cursor-pointer pt-4 h-16 w-96 rounded-lg text-center border-b-4 border-sky-700 text-lg mt-20 my-4
                `}>
                    New Recipe
                </div>

                <div
                onClick={() => setClickedFavorites(clicked => !clicked)}
                className={`
                    text-white bg-sky-600 cursor-pointer pt-4 h-16 w-96 rounded-lg text-center border-b-4 border-sky-700 text-lg my-4
                `}>
                    My Favorites
                </div>

                <div
                onClick={() => setClickedRecipes(clicked => !clicked)}
                className={`
                    text-white bg-sky-600 cursor-pointer pt-4 h-16 w-96 rounded-lg text-center border-b-4 border-sky-700 text-lg my-4
                `}>
                    My Recipes
                </div>

                <div
                onClick={() => {
                    dispatch(deleteSession());
                    dispatch(resetMenu());
                }}
                className={`
                    text-white bg-sky-600 cursor-pointer pt-4 h-16 w-96 rounded-lg text-center border-b-4 border-sky-700 text-lg my-4
                `}>
                    Log Out
                </div>
            </div>

            <div className={`
                ${!clickedNewRecipe && 'hidden'} pt-10
            `}>
                <CreateRecipe isEdit={false} recipeId={null} prevBrand={''} prevItem={''} prevCookTime={8} prevCookTemp={400} prevNotes={''} />
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