import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { createRecipe } from '../../../store/recipes.js';
import { resetMenu } from '../../../store/menu.js';

const CreateRecipe = () => {
    const dispatch = useDispatch();

    const [prompt, setPrompt] = useState(0);

    const [brand, setBrand] = useState('');
    const [item, setItem] = useState('');
    const [cookTime, setCookTime] = useState(8);
    const [cookTemp, setCookTemp] = useState('');
    const [notes, setNotes] = useState('');

    return (
        <div className='text-white mt-28 m-auto bg-sky-300 rounded-lg shadow w-90'>
            <div className={`
                flex justify-center flex-wrap
                ${prompt !== 0 && 'hidden'}
            `}>
                <div className='m-2 p-4 bg-sky-600 rounded-lg border-b-4 border-sky-700 text-lg w-full text-center'>
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
                <div className='m-2 p-4 bg-sky-600 rounded-lg border-b-4 border-sky-700 text-lg w-full text-center'>
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
                <div className='m-2 p-4 bg-sky-600 rounded-lg border-b-4 border-sky-700 text-lg w-full text-center'>
                    How many minutes should it cook for?
                </div>

                <div 
                className={`
                    flex justify-center
                    m-2 p-4 rounded-md text-center text-black w-full h-36
                `}>
                    <div className='font-bold m-2 p-4 bg-sky-600 rounded-lg border-b-4 border-sky-700 text-lg text-lime-200'>
                        {cookTime} minutes
                    </div>

                    <div className='flex text-lg text-white w-36'>
                        <div
                        onClick={() => setCookTime(cookTime + 1)}
                        className='cursor-pointer font-bold m-2 p-4 bg-sky-600 rounded-lg border-b-4 border-sky-700 text-lg text-white w-20'>
                            +
                        </div>

                        <div
                        onClick={() => setCookTime(cookTime - 1)}
                        className='cursor-pointer font-bold m-2 p-4 bg-sky-600 rounded-lg border-b-4 border-sky-700 text-lg text-white w-20'>
                            -
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
                <div className='m-2 p-4 bg-sky-600 rounded-lg border-b-4 border-sky-700 text-lg w-full text-center'>
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
                className='m-2 p-4 bg-sky-600 rounded-lg border-b-4 border-sky-700 text-lg cursor-pointer'>
                    Back
                </div>

                <div 
                onClick={async () => {
                    if (prompt === 4) {
                        await dispatch(createRecipe(brand, item, (cookTime * 60), cookTemp, notes));
                        await dispatch(resetMenu());

                        setPrompt(0);
                        setBrand('');
                        setItem('');
                        setCookTime(0);
                        setCookTemp('');
                        setNotes('');
                        
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