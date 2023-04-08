import { useDispatch } from 'react-redux';

import { fetchSetRecipe } from '../../store/setRecipe.js';

const Recipe = ({ id, brand, item, avgRating }) => {
    const dispatch = useDispatch();

    return (
        <div 
        onClick={() => dispatch(fetchSetRecipe(id))}
        style={{boxShadow: '0px 0px 8px 2px rgb(230, 120, 0)'}}
        className={`
            text-white bg-amber-500 
            h-64 w-64 p-4 pt-12 
            cursor-pointer leading-10 
            rounded-lg text-center 
            border-b-4 border-amber-600 
            text-lg mt-12
        `}>
            <p className='my-2'>Brand: {brand}</p>
            <p className='my-2'>Item: {item}</p>
            <p className='my-2'>Rating: {avgRating} stars</p>
        </div>
    );
};

export default Recipe;