import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { createRecipe, editRecipe } from '../../../store/recipes.js';
import { resetMenu } from '../../../store/menu.js';
import { restoreUser } from '../../../store/user.js';

import { PlusSquareFill } from '@styled-icons/bootstrap/PlusSquareFill';
import { MinusSquare } from '@styled-icons/evaicons-solid/MinusSquare';

const CreateRecipe = ({ isEdit, recipeId, prevBrand, prevItem, prevCookTime, prevCookTemp, prevNotes }) => {
    const dispatch = useDispatch();

    const [prompt, setPrompt] = useState(0);

    const [brand, setBrand] = useState(prevBrand);
    const [item, setItem] = useState(prevItem);
    const [cookTime, setCookTime] = useState(prevCookTime);
    const [cookTemp, setCookTemp] = useState(prevCookTemp);
    const [notes, setNotes] = useState(prevNotes);

    return (
        <div style={{width: '36vw'}} className='text-white mt-20 m-auto bg-sky-300 rounded-lg shadow'>
            <div className={`
                flex justify-center flex-wrap
                ${prompt !== 0 && 'hidden'}
            `}>
                <div className='m-2 p-4 bg-sky-600 rounded-lg border-b-4 border-sky-700 text-lg w-full text-center'>
                    What is the product brand?
                </div>

                <input 
                onChange={e => setBrand(e.target.value)}
                value={brand}
                className={`
                    m-2 my-6 p-4 rounded-md cursor-pointer text-center text-white w-full bg-sky-900 font-bold
                `}>
                </input>
            </div>

            <div className={`
                flex justify-center flex-wrap
                ${prompt !== 1 && 'hidden'}
            `}>
                <div className='m-2 p-4 bg-sky-600 rounded-lg border-b-4 border-sky-700 text-lg w-full text-center'>
                    What type of food is this?
                </div>

                <input 
                onChange={e => setItem(e.target.value)}
                value={item}
                className={`
                    m-2 my-6 p-4 rounded-md cursor-pointer text-center text-white w-full bg-sky-900 font-bold
                `}>
                </input>
            </div>

            <div className={`
                flex justify-center flex-wrap
                ${prompt !== 2 && 'hidden'}
            `}>
                <div className='m-2 p-4 bg-sky-600 rounded-lg border-b-4 border-sky-700 text-lg w-full text-center'>
                    How many minutes should it cook for?
                </div>

                <div 
                className={`
                    flex justify-center
                    p-4 rounded-md text-center text-black w-full
                `}>
                    <div className='font-bold m-2 p-4 bg-sky-600 rounded-lg border-b-4 border-sky-700 text-xl text-lime-200'>
                        {cookTime} minutes
                    </div>

                    <div className='flex text-lg text-white w-36'>
                        <div
                        onClick={() => setCookTime(cookTime + 1)}
                        className='cursor-pointer m-2 p-4 bg-sky-600 rounded-lg border-b-4 border-sky-700 text-lg text-white w-20'>
                            <PlusSquareFill 
                            className='text-sky-900'
                            />
                        </div>

                        <div
                        onClick={() => {
                            if (cookTime > 1) setCookTime(cookTime - 1);
                        }}
                        className='cursor-pointer m-2 p-4 bg-sky-600 rounded-lg border-b-4 border-sky-700 text-lg text-white w-20'>
                            <MinusSquare 
                            className='text-sky-900'
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className={`
                flex justify-center flex-wrap
                ${prompt !== 3 && 'hidden'}
            `}>
                <div className='m-2 p-4 bg-sky-600 rounded-lg border-b-4 border-sky-700 text-lg w-full text-center'>
                    What temperature does it need to be cooked on?
                </div>

                <input 
                value={cookTemp}
                type='number'
                onChange={e => setCookTemp(e.target.value)}
                className={`
                    m-2 my-6 p-4 rounded-md cursor-pointer text-center w-full bg-sky-900 font-bold text-xl text-lime-200
                `}>
                </input>
            </div>

            <div className={`
                flex justify-center flex-wrap
                ${prompt !== 4 && 'hidden'}
            `}>
                <div className='m-2 p-4 bg-sky-600 rounded-lg border-b-4 border-sky-700 text-lg w-full text-center'>
                    Please leave any additional notes here!
                </div>

                <input 
                onChange={e => setNotes(e.target.value)}
                value={notes}
                className={`
                    m-2 my-6 p-4 rounded-md cursor-pointer text-center text-white w-full bg-sky-900 font-bold
                `}>
                </input>
            </div>

            <div className='flex justify-between'>
                <div 
                onClick={() => {
                    if (prompt === 0) return;
                    setPrompt(prompt - 1)
                }}
                className='m-2 p-4 bg-sky-600 rounded-lg border-b-4 border-sky-700 text-lg cursor-pointer'>
                    Back
                </div>

                <div 
                onClick={async () => {
                    if (prompt === 4) {
                        if (!isEdit) {
                            await dispatch(createRecipe(brand, item, cookTime, cookTemp, notes));
                            await dispatch(resetMenu());
                            await dispatch(restoreUser());

                            setPrompt(0);
                            setBrand('');
                            setItem('');
                            setCookTime(8);
                            setCookTemp(400);
                            setNotes('');
                            
                            return;
                        };

                        await dispatch(editRecipe(recipeId, brand, item, cookTime, cookTemp, notes));
                        await dispatch(resetMenu());
                        await dispatch(restoreUser());

                        setPrompt(0);

                        return;
                    };

                    setPrompt(prompt + 1);
                }}
                className='m-2 p-4 bg-sky-600 rounded-lg border-b-4 border-sky-700 text-lg cursor-pointer'>
                    {prompt < 4 ? 'Next' : 'Submit'}
                </div>
            </div>
        </div>
    );
};

export default CreateRecipe;