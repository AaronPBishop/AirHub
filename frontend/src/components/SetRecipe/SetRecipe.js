import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchSetRecipe, postNewComment, rateRecipe } from '../../store/setRecipe';

import RecipeComment from './RecipeComment';

const SetRecipe = () => {
    const dispatch = useDispatch();

    const setRecipe = useSelector(state => state.setRecipe.recipe);

    const [clickedAdd, setClickedAdd] = useState(false);
    const [comment, setComment] = useState('');

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(5);

    useEffect(() => {
        const setRating = async () => {
            if (setRecipe && Object.keys(setRecipe).length) {
                await dispatch(rateRecipe(setRecipe.id, rating));
                await dispatch(fetchSetRecipe(setRecipe.id));
            };
        };

        setRating();
    }, [rating]);

    if (setRecipe && Object.keys(setRecipe).length) return (
        <div 
        className={`
            text-white bg-sky-200 overflow-auto
            h-screen w-screen p-4 pt-2 pb-20
            text-center
        `}>
            <div className='m-4 p-10 w-max bg-sky-700 rounded-lg border-b-4 border-sky-900 text-lg mx-auto shadow'>
                <p className='my-2'>Brand: {setRecipe.brand}</p>
                <p className='my-2'>Item: {setRecipe.item}</p>
                <p className='my-2'>Cooking Temperature: {setRecipe.cookTemp}</p>
                <p className='my-2'>Total Cook Time: {setRecipe.cookTime / 60} minutes</p>
                <p className='my-2'>Additional Notes: {setRecipe.notes}</p>
                <p className='my-2'>Rating: {setRecipe.avgRating} stars</p>
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