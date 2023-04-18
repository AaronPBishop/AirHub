import { useDispatch } from 'react-redux';

import { setRecipeData } from '../../store/setRecipe.js';
import { resetMenu } from '../../store/menu.js';

import { LocationFood } from '@styled-icons/zondicons/LocationFood'

const Recipe = ({ id, ownerId, brand, item, cookTemp, cookTime, notes, avgRating, comments }) => {
    const dispatch = useDispatch();

    return (
        <div 
        onClick={() => {
            dispatch(resetMenu());
            dispatch(setRecipeData({id, ownerId, brand, item, cookTemp, cookTime, notes, avgRating, comments}));
        }}
        className={`
            relative text-white bg-sky-700 
            h-64 w-64 p-4 pt-12 
            cursor-pointer leading-10 
            rounded-3xl text-center 
            border-b-8 border-sky-900 
            text-lg my-6 shadow m-4
        `}>
            <LocationFood className='text-sky-900 absolute top-0 left-0 right-0 bottom-0 m-auto w-56' />

            <div 
            className='bg-sky-700 w-full py-1 m-auto absolute bottom-24 left-0 right-0'>
                <p className='my-1 font-bold text-xl text-glow tracking-widest'>{brand}</p>
                <p className='my-1 font-bold text-xl text-glow tracking-widest'>{item}</p>
            </div>

            <p className='my-2 absolute bottom-10 left-0 right-0 font-bold text-2xl'>
                {
                    avgRating ?
                    Array(Math.round(avgRating)).fill().map((el, i) => <span key={i}>⭐</span>)
                    : 'No Rating'
                }
            </p>
        </div>
    );
};

export default Recipe;