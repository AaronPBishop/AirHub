import { useDispatch } from 'react-redux';

import { fetchSetRecipe } from '../../store/setRecipe.js';
import { resetMenu } from '../../store/menu.js';

import { Food } from '@styled-icons/fluentui-system-regular/Food';

const Recipe = ({ id, brand, item, avgRating }) => {
    const dispatch = useDispatch();

    return (
        <div 
        onClick={() => {
            dispatch(resetMenu());
            dispatch(fetchSetRecipe(id));
        }}
        className={`
            relative text-white bg-sky-700 
            h-64 w-64 p-4 pt-12 
            cursor-pointer leading-10 
            rounded-lg text-center 
            border-b-4 border-sky-900 
            text-lg my-6 shadow m-4
        `}>
            <Food className='text-sky-800 absolute top-0 left-0 right-0 bottom-0 m-auto' />

            <p className='my-2 font-bold absolute bottom-36 left-0 right-0 text-2xl text-glow tracking-wider'>{brand}</p>
            <p className='my-2 font-bold absolute bottom-24 left-0 right-0 text-2xl text-glow tracking-wider'>{item}</p>
            <p className='my-2 font-bold absolute bottom-10 left-0 right-0 text-1xl'>{avgRating ? `⭐ ${avgRating}` : 'No Rating'}</p>
        </div>
    );
};

export default Recipe;