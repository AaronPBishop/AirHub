import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { restoreUser } from '../../store/user.js';
import { setRecipeData, postNewComment, rateRecipe, favoriteRecipe, unfavoriteRecipe, deleteRecipe } from '../../store/setRecipe';
import { fetchRecipes } from '../../store/recipes.js';

import RecipeComment from './RecipeComment';
import CreateRecipe from '../Navigation/UserOptions/CreateRecipe.js';

const SetRecipe = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.user && state.user.user);
    const allRecipes = useSelector(state => state.recipes.recipes);
    const setRecipe = useSelector(state => state.setRecipe.recipe);

    const [clickedAdd, setClickedAdd] = useState(false);
    const [comment, setComment] = useState('');

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(5);

    const [hasFavorited, setHasFavorited] = useState(false);
    const [favId, setFavId] = useState(null);

    const [clickedEdit, setClickedEdit] = useState(false);

    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        for (let key in allRecipes) {
            const currRecipe = allRecipes[key];

            if (setRecipe && setRecipe.id === currRecipe.id) {
                dispatch(setRecipeData({
                    id: currRecipe.id, 
                    ownerId: currRecipe.ownerId, 
                    brand: currRecipe.brand, 
                    item: currRecipe.item, 
                    cookTemp: currRecipe.cookTemp, 
                    cookTime: currRecipe.cookTime, 
                    notes: currRecipe.notes, 
                    avgRating: currRecipe.avgRating, 
                    comments: currRecipe.Comments
                }));
            };
        };
    }, [allRecipes]);

    useEffect(() => {
        const setRating = async () => {
            if (setRecipe) {
                await dispatch(rateRecipe(setRecipe.id, rating));
                await dispatch(fetchRecipes());
            };
        };

        setRating();
    }, [rating]);

    useEffect(() => {
        if (user && setRecipe) {
            for (let fav of user.favorites) {
                if (fav.favRecipe) {
                    if (fav.favRecipe.id === setRecipe.id) {
                        setHasFavorited(true);
                        setFavId(fav.favId);
    
                        return;
                    } else {
                        setHasFavorited(false);
                        setFavId(null);
                    };
                };
            };
        };
    }, [user, setRecipe]);

    useEffect(() => {
        if (user && setRecipe) {
            if (setRecipe.ownerId === user.id) setIsOwner(true);
            else setIsOwner(false);
        };
    }, [setRecipe]);

    useEffect(() => { setClickedEdit(false) }, [user]);

    if (setRecipe) return (
        <div 
        className={`
            text-white bg-sky-200 overflow-y-auto
            w-screen p-4 pt-2
            text-center
        `}>
            <div 
            style={{height: '6vh'}}
            className='flex justify-between'>
                <div
                onClick={async () => {
                    if (user && user.id) {
                        if (hasFavorited) {
                            await dispatch(unfavoriteRecipe(favId));
                            await dispatch(restoreUser());

                            setHasFavorited(false);

                            return;
                        };
                        
                        if (!hasFavorited) {
                            await dispatch(favoriteRecipe(user.id, setRecipe.id));
                            await dispatch(restoreUser());

                            setHasFavorited(true);

                            return;
                        };
                    };
                }} 
                className={`
                    ${!user && 'invisible'}
                    py-2 px-3 bg-sky-600 rounded-lg border-b-4 border-sky-700 cursor-pointer font-bold
                `}>
                    {hasFavorited ? 'Unfavorite' : 'Favorite'}
                </div>

                <div className='flex'>
                    <div
                    onClick={() => setClickedEdit(clicked => !clicked)}
                    className={`
                        ${(!user || !isOwner) && 'invisible'}
                        py-2 px-6 bg-sky-600 rounded-lg border-b-4 border-sky-700 cursor-pointer font-bold`
                    }>
                        Edit
                    </div>

                    <div
                    onClick={async () => {
                        await dispatch(deleteRecipe(setRecipe.id));
                        await dispatch(fetchRecipes());
                        await dispatch(restoreUser());
                    }}
                    className={`
                        ${(!user || !isOwner) && 'invisible'}
                        py-2 px-5 ml-1 bg-sky-600 rounded-lg border-b-4 border-sky-700 cursor-pointer font-bold`
                    }>
                        Delete
                    </div>
                </div>
            </div>

            <div 
            className={`
                ${clickedEdit && 'hidden'}
                flex justify-center flex-wrap
                mb-4 p-10 py-6 w-3/6 bg-sky-700 rounded-lg border-b-4 border-sky-900 text-lg mx-auto shadow
            `}>
                <div className='w-full'>
                    <div className='flex justify-evenly m-auto w-6/12'>
                        <div className='text-right'>
                            <p className='mb-3 font-bold'>
                                Brand
                            </p>
                            <p className='my-3 font-bold'>
                                Item
                            </p>
                            <p className='my-3 font-bold'>
                                Temperature
                            </p>
                            <p className='my-3 font-bold'>
                                Cook Time
                            </p>
                        </div>

                        <div className='text-left'>
                            <p className='mb-3 font-bold text-yellow-200'>
                                {setRecipe.brand}
                            </p>
                            <p className='my-3 font-bold text-yellow-200'>
                                {setRecipe.item}
                            </p>
                            <p className='my-3 font-bold text-yellow-200'>
                                {setRecipe.cookTemp} degrees
                            </p>
                            <p className='my-3 font-bold text-yellow-200'>
                                {setRecipe.cookTime} minutes
                            </p>
                        </div>
                    </div>
                </div>

                <div className='w-4/6'>
                    <p className='my-3 font-bold'>
                        Additional Notes 
                    </p>

                    <div className='bg-sky-900 rounded-lg p-6 font-bold border-b-4 border-sky-950 text-yellow-200'>
                        {setRecipe.notes}
                    </div>

                    <p className='mt-6 font-bold text-yellow-200'>
                        {setRecipe.avgRating ? `⭐ ${setRecipe.avgRating}` : 'No Ratings'}
                    </p>
                </div>
            </div>

            <div 
            style={{marginTop: '-8vh'}}
            className={`
                ${!clickedEdit && 'hidden'}
                mb-10 pb-10 w-3/6 m-auto
            `}>
                <CreateRecipe isEdit={true} recipeId={setRecipe.id} prevBrand={setRecipe.brand} prevItem={setRecipe.item} prevCookTime={setRecipe.cookTime} prevCookTemp={setRecipe.cookTemp} prevNotes={setRecipe.notes} />
            </div>
            
            <div className='flex justify-between'>
                <div className='m-2 p-4 bg-sky-600 rounded-lg border-b-4 border-sky-700 font-bold'>
                    {setRecipe.comments && setRecipe.comments.length} Comments
                </div>

                <div
                onMouseLeave={() => !rating ? setHover(5) : setHover(rating)} 
                className={`
                    ${!user && 'invisible'}
                    flex justify-evenly bg-sky-600 rounded-lg border-b-4 border-sky-700 h-2/6 my-2 px-6
                `}>
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
                                    cursor-pointer py-1 px-1
                                `}>
                                    <span className='text-4xl'>&#9733;</span>
                                </div>
                            )
                        })
                    }
                </div>

                <div 
                onClick={() => setClickedAdd(clicked => !clicked)}
                className={`
                    ${!user && 'invisible'}
                    m-2 p-4 bg-sky-600 rounded-lg border-b-4 border-sky-700 cursor-pointer font-bold
                `}>
                    Add Comment
                </div>
            </div>

            <div className={`
                flex justify-center p-4
                ${!clickedAdd && 'hidden'}
            `}>
                <input 
                onChange={e => setComment(e.target.value)}
                value={comment}
                className={`
                    rounded-md ml-44 cursor-pointer text-center w-3/6 text-black shadow
                `}>
                </input>

                <div 
                onClick={async () => {
                    await dispatch(postNewComment(setRecipe.id, comment));
                    await dispatch(fetchRecipes());
                    await setClickedAdd(false);
                    await setComment('');
                }}
                className='p-4 ml-4 bg-sky-600 rounded-lg border-b-4 w-44 border-sky-700 text-lg cursor-pointer'>
                    Submit
                </div>
            </div>

            <div className={`mt-4 ${!setRecipe.comments || !setRecipe.comments.length && 'hidden'}`}>
                {
                    setRecipe.comments && setRecipe.comments.length &&
                    setRecipe.comments.map(cmnt =>
                        <RecipeComment id={cmnt.id} ownerId={cmnt.userId} firstName={cmnt.User.firstName} lastName={cmnt.User.lastName} comment={cmnt.comment} />
                    )
                }
            </div>
        </div>
    );
};

export default SetRecipe;