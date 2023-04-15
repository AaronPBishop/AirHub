import { useDispatch } from 'react-redux';

import { fetchSetRecipe } from '../../store/setRecipe.js';
import { resetMenu } from '../../store/menu.js';

const Recipe = ({ id, brand, item, avgRating }) => {
    const dispatch = useDispatch();

    return (
        <div 
        onClick={() => {
            dispatch(resetMenu());
            dispatch(fetchSetRecipe(id));
        }}
        className={`
            text-white bg-sky-700 
            h-64 w-64 p-4 pt-12 
            cursor-pointer leading-10 
            rounded-lg text-center 
            border-b-4 border-sky-900 
            text-lg my-6 shadow m-4
        `}>
            <p className='my-2 font-bold'>{brand}</p>
            <p className='my-2 font-bold'>{item}</p>
            <p className='my-2 font-bold'>{avgRating ? `${avgRating} stars` : 'No Rating'}</p>
        </div>
    );
};

export default Recipe;