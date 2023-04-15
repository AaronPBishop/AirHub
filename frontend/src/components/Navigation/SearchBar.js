import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { searchRecipes } from '../../store/recipes.js';
import { clearRecipeData } from '../../store/setRecipe.js';

import { BoxSearch } from '@styled-icons/fluentui-system-filled/BoxSearch';

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
                value={brand}
                placeHolder="Brand"
                style={{marginLeft: '4.2vw'}}
                className='bg-stone-50 rounded-lg h-10 cursor-pointer text-center w-5/6 m-1'>
                </input>

                <input
                onChange={e => setItem(e.target.value)}
                value={item}
                placeHolder="Item"
                className='bg-stone-50 rounded-lg h-10 cursor-pointer text-center w-5/6 m-1'>
                </input>

                <div
                onClick={e => {
                    e.stopPropagation();

                    dispatch(searchRecipes(brand, item));
                    dispatch(clearRecipeData());

                    setClicked(false);
                    setBrand('');
                    setItem('');
                }}
                style={{marginTop: '0.8vh'}}
                className='m-1 px-2 py-1 h-10 bg-sky-600 rounded-lg border-b-4 border-sky-700 text-lg text-center text-white cursor-pointer'>
                    <BoxSearch 
                    className='w-6'
                    />
                </div>
             </div>
        </div>
    );
};

export default SearchBar;