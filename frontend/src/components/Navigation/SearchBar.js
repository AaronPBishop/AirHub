import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { searchRecipes } from '../../store/recipes.js';

const SearchBar = () => {
    const dispatch = useDispatch();

    const [clicked, setClicked] = useState(false);
    const [brand, setBrand] = useState('');
    const [item, setItem] = useState('');

    return (
        <div
        onClick={() => setClicked(true)} 
        className='w-3/5'>
            <input 
             disabled={true}
             placeHolder="Search Recipes by Brand or Item"
             className={`
                ${clicked && 'hidden'}
                bg-stone-50 rounded-lg h-10 cursor-pointer text-center w-full m-1
             `}>
             </input>

             <div
             className={`
                ${clicked ? 'visible' : 'hidden'}
                flex justify-evenly h-10 w-full
             `}>
                <input
                onChange={e => setBrand(e.target.value)}
                placeHolder="Brand"
                style={{marginLeft: '4.2vw'}}
                className='bg-stone-50 rounded-lg h-10 cursor-pointer text-center w-5/6 m-1'>
                </input>

                <input
                onChange={e => setItem(e.target.value)}
                placeHolder="Item"
                className='bg-stone-50 rounded-lg h-10 cursor-pointer text-center w-5/6 m-1'>
                </input>

                <div
                onClick={() => dispatch(searchRecipes(brand, item))}
                className='m-1 p-4 h-10 bg-sky-600 rounded-lg border-b-4 border-sky-700 text-lg text-center text-white cursor-pointer'>
                    Go
                </div>
             </div>
        </div>
    );
};

export default SearchBar;