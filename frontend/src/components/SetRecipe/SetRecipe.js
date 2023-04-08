import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { fetchSetRecipe, postNewComment } from '../../store/setRecipe';

import RecipeComment from './RecipeComment';

const SetRecipe = () => {
    const dispatch = useDispatch();

    const setRecipe = useSelector(state => state.setRecipe.recipe);

    const [clickedAdd, setClickedAdd] = useState(false);
    const [comment, setComment] = useState('');

    if (setRecipe && Object.keys(setRecipe).length) return (
        <div 
        className={`
            text-white bg-amber-400 overflow-auto
            h-screen w-screen p-4 pt-2 pb-20
            text-center
        `}>
            <div className='m-4 p-10 w-max bg-amber-600 rounded-lg border-b-4 border-amber-900 text-lg mx-auto'>
                <p className='my-2'>Brand: {setRecipe.brand}</p>
                <p className='my-2'>Item: {setRecipe.item}</p>
                <p className='my-2'>Cooking Temperature: {setRecipe.cookTemp}</p>
                <p className='my-2'>Total Cook Time: {setRecipe.cookTime / 60} minutes</p>
                <p className='my-2'>Additional Notes: {setRecipe.notes}</p>
                <p className='my-2'>Rating: {setRecipe.avgRating} stars</p>
            </div>
            
            <div className='flex justify-between'>
                <div className='m-2 p-4 bg-amber-600 rounded-lg border-b-4 border-amber-900 text-lg'>
                    {setRecipe.Comments.length} Comments
                </div>

                <div 
                onClick={() => setClickedAdd(clicked => !clicked)}
                className='m-2 p-4 bg-amber-600 rounded-lg border-b-4 border-amber-900 text-lg cursor-pointer'>
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
                    rounded-md ml-44 cursor-pointer text-center w-3/6 h-full text-black
                `}>
                </input>

                <div 
                onClick={async () => {
                    await dispatch(postNewComment(setRecipe.id, comment));
                    await dispatch(fetchSetRecipe(setRecipe.id));
                    await setClickedAdd(false);
                    await setComment('');
                }}
                className='p-6 ml-4 bg-amber-600 rounded-lg border-b-4 w-44 border-amber-900 text-lg cursor-pointer'>
                    Submit
                </div>
            </div>

            <div className={`mt-4 ${!setRecipe.Comments.length && 'hidden'}`}>
                {
                    setRecipe.Comments.length &&
                    setRecipe.Comments.map(cmnt =>
                        <RecipeComment comment={cmnt.comment} />
                    )
                }
            </div>
        </div>
    );
};

export default SetRecipe;