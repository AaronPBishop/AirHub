import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { restoreUser } from '../../store/user.js';
import { fetchSetRecipe, postNewComment, rateRecipe, favoriteRecipe, unfavoriteRecipe, deleteRecipe } from '../../store/setRecipe';
import { fetchRecipes } from '../../store/recipes.js';

import RecipeComment from './RecipeComment';

const SetRecipe = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.user && state.user.user);
    const setRecipe = useSelector(state => state.setRecipe.recipe);

    const [clickedAdd, setClickedAdd] = useState(false);
    const [comment, setComment] = useState('');

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(5);

    const [hasFavorited, setHasFavorited] = useState(false);
    const [favId, setFavId] = useState(null);

    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const setRating = async () => {
            if (setRecipe && Object.keys(setRecipe).length) {
                await dispatch(rateRecipe(setRecipe.id, rating));
                await dispatch(fetchSetRecipe(setRecipe.id));
            };
        };

        setRating();
    }, [rating]);

    useEffect(() => {
        if (user && setRecipe) {
            for (let key in user.favorites) {
                const currFav = user.favorites[key];
                
                if (currFav) {
                    if (currFav.recipeId === setRecipe.id) {
                        setHasFavorited(true);
                        setFavId(currFav.id);
                    } else {
                        setHasFavorited(false);
                        setFavId(null);
                    };
                };
            };

            for (let key in user.userRecipes) {
                const currRecipe = user.userRecipes[key];
                
                if (currRecipe) {
                    if (currRecipe.ownerId === user.id) {
                        setIsOwner(true);
                    } else {
                        setIsOwner(false);
                    };
                };
            };
        };
    }, [user, setRecipe]);

    if (setRecipe && Object.keys(setRecipe).length) return (
        <div 
        className={`
            text-white bg-sky-200 overflow-auto
            h-screen w-screen p-4 pt-2 pb-20
            text-center
        `}>
            <div className='flex justify-between'>
                <div
                onClick={async () => {
                    if (user && user.id) {
                        if (hasFavorited) {
                            await dispatch(unfavoriteRecipe(favId));
                            await dispatch(restoreUser());

                            return;
                        };
                        
                        if (!hasFavorited) {
                            await dispatch(favoriteRecipe(user.id, setRecipe.id));
                            await dispatch(restoreUser());

                            return;
                        };
                    };
                }} 
                className='m-2 mb-0 p-4 bg-sky-600 rounded-lg border-b-4 border-sky-700 text-lg cursor-pointer'>
                    {hasFavorited ? 'Unfavorite' : 'Favorite'}
                </div>

                <div
                onClick={async () => {
                    await dispatch(deleteRecipe(setRecipe.id));
                    await dispatch(fetchRecipes());
                }}
                className={`
                    ${!isOwner && 'hidden'}
                    m-2 mb-0 p-4 bg-sky-600 rounded-lg border-b-4 border-sky-700 text-lg cursor-pointer`
                }>
                    Delete
                </div>
            </div>

            <div className='mb-4 p-10 w-3/6 bg-sky-700 rounded-lg border-b-4 border-sky-900 text-lg mx-auto shadow'>
                <p className='my-3 font-bold'>
                    Brand: <span className='text-yellow-200'>{setRecipe.brand}</span>
                </p>
                <p className='my-3 font-bold'>
                    Item: <span className='text-yellow-200'>{setRecipe.item}</span>
                </p>
                <p className='my-3 font-bold'>
                    Cook Temperature: <span className='text-yellow-200'>{setRecipe.cookTemp}</span>
                </p>
                <p className='my-3 font-bold'>
                    Total Cook Time: <span className='text-yellow-200'>{setRecipe.cookTime} minutes</span>
                </p>
                <p className='my-3 font-bold'>
                    Additional Notes 
                    <p className='text-yellow-200'>{setRecipe.notes}</p>
                </p>
                <p className='my-3 font-bold'>
                    <span className='text-yellow-200'>{setRecipe.avgRating && `⭐ ${setRecipe.avgRating}`}</span>
                </p>
            </div>
            
            <div className='flex justify-between'>
                <div className='m-2 p-4 bg-sky-600 rounded-lg border-b-4 border-sky-700 text-lg'>
                    {setRecipe.Comments.length} Comments
                </div>

                <div
                onMouseLeave={() => !rating ? setHover(5) : setHover(rating)} 
                className='flex justify-evenly bg-sky-600 rounded-lg border-b-4 border-sky-700'>
                    {
                        
                        Array.from({length: 5}).map((el, i) => {
                            i += 1;
                            return (
                                <div
                                key={i}
                                onClick={() => {
                                    setRating(i);
                                    setHover(i);
                                }}
                                onMouseEnter={() => setHover(i)}
                                className={`
                                    ${hover < i ? 'text-white' : 'text-yellow-200'}
                                    mt-2 cursor-pointer p-2
                                `}>
                                    <span className='text-4xl'>&#9733;</span>
                                </div>
                            )
                        })
                    }
                </div>

                <div 
                onClick={() => setClickedAdd(clicked => !clicked)}
                className='m-2 p-4 bg-sky-600 rounded-lg border-b-4 border-sky-700 text-lg cursor-pointer'>
                    Add Comment
                </div>
            </div>

            <div className={`
                flex justify-center h-1/6 p-4
                ${!clickedAdd && 'hidden'}
            `}>
                <input 
                onChange={e => setComment(e.target.value)}
                className={`
                    rounded-md ml-44 cursor-pointer text-center w-3/6 h-full text-black shadow
                `}>
                </input>

                <div 
                onClick={async () => {
                    await dispatch(postNewComment(setRecipe.id, comment));
                    await dispatch(fetchSetRecipe(setRecipe.id));
                    await setClickedAdd(false);
                    await setComment('');
                }}
                className='p-6 ml-4 bg-sky-600 rounded-lg border-b-4 w-44 border-sky-700 text-lg cursor-pointer'>
                    Submit
                </div>
            </div>

            <div className={`mt-4 ${!setRecipe.Comments.length && 'hidden'}`}>
                {
                    setRecipe.Comments.length &&
                    setRecipe.Comments.map(cmnt =>
                        <RecipeComment firstName={cmnt.User.firstName} lastName={cmnt.User.lastName} comment={cmnt.comment} />
                    )
                }
            </div>
        </div>
    );
};

export default SetRecipe;