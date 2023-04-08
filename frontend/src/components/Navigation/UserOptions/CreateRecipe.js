import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { createRecipe } from '../../../store/recipes.js';
import { resetMenu } from '../../../store/menu.js';

const CreateRecipe = () => {
    const dispatch = useDispatch();

    const [prompt, setPrompt] = useState(0);

    const [brand, setBrand] = useState('');
    const [item, setItem] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [cookTemp, setCookTemp] = useState('');
    const [notes, setNotes] = useState('');

    return (
        <div className='text-white mt-20'>
            <div className={`
                flex justify-center flex-wrap
                ${prompt !== 0 && 'hidden'}
            `}>
                <div className='m-2 p-4 bg-amber-600 rounded-lg border-b-4 border-amber-900 text-lg w-full text-center'>
                    What is the product brand?
                </div>

                <input 
                onChange={e => setBrand(e.target.value)}
                className={`
                    m-2 p-4 rounded-md cursor-pointer text-center text-black w-full
                `}>
                </input>
            </div>

            <div className={`
                flex justify-center flex-wrap
                ${prompt !== 1 && 'hidden'}
            `}>
                <div className='m-2 p-4 bg-amber-600 rounded-lg border-b-4 border-amber-900 text-lg w-full text-center'>
                    What type of food is this?
                </div>

                <input 
                onChange={e => setItem(e.target.value)}
                className={`
                    m-2 p-4 rounded-md cursor-pointer text-center text-black w-full
                `}>
                </input>
            </div>

            <div className={`
                flex justify-center flex-wrap
                ${prompt !== 2 && 'hidden'}
            `}>
                <div className='m-2 p-4 bg-amber-600 rounded-lg border-b-4 border-amber-900 text-lg w-full text-center'>
                    How many minutes should it cook for?
                </div>

                <input 
                onChange={e => setCookTime(e.target.value * 60)}
                className={`
                    m-2 p-4 rounded-md cursor-pointer text-center text-black w-full
                `}>
                </input>
            </div>

            <div className={`
                flex justify-center flex-wrap
                ${prompt !== 3 && 'hidden'}
            `}>
                <div className='m-2 p-4 bg-amber-600 rounded-lg border-b-4 border-amber-900 text-lg w-full text-center'>
                    What temperature does it need to be cooked on?
                </div>

                <input 
                onChange={e => setCookTemp(e.target.value)}
                className={`
                    m-2 p-4 rounded-md cursor-pointer text-center text-black w-full
                `}>
                </input>
            </div>

            <div className={`
                flex justify-center flex-wrap
                ${prompt !== 4 && 'hidden'}
            `}>
                <div className='m-2 p-4 bg-amber-600 rounded-lg border-b-4 border-amber-900 text-lg w-full text-center'>
                    Please leave any additional notes here!
                </div>

                <input 
                onChange={e => setNotes(e.target.value)}
                className={`
                    m-2 p-4 rounded-md cursor-pointer text-center text-black w-full
                `}>
                </input>
            </div>

            <div className='flex justify-between'>
                <div 
                onClick={() => {
                    if (prompt === 0) return;
                    setPrompt(prompt - 1)
                }}
                className='m-2 p-4 bg-amber-600 rounded-lg border-b-4 border-amber-900 text-lg cursor-pointer'>
                    Back
                </div>

                <div 
                onClick={async () => {
                    if (prompt === 4) {
                        await dispatch(createRecipe(brand, item, cookTime, cookTemp, notes));
                        await dispatch(resetMenu());
                    };

                    setPrompt(prompt + 1);
                }}
                className='m-2 p-4 bg-amber-600 rounded-lg border-b-4 border-amber-900 text-lg cursor-pointer'>
                    {prompt < 4 ? 'Next' : 'Submit'}
                </div>
            </div>
        </div>
    );
};

export default CreateRecipe;