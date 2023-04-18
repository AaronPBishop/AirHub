import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { createrUserAccount } from '../../../store/user.js';
import { resetMenu } from '../../../store/menu.js';

const SignUpForm = () => {
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div 
        className={`
            flex justify-center flex-wrap w-96 bg-amber-600 mt-24 py-4 rounded-lg
            bg-sky-700 border-b-4 border-sky-900 shadow
        `}>
            <input 
            onChange={e => setFirstName(e.target.value)}
            placeHolder="First Name"
            className={`
                bg-sky-900 rounded-lg h-10 cursor-pointer text-center w-80 my-3 text-lg text-white
            `}>
            </input>

            <input 
            onChange={e => setLastName(e.target.value)}
            placeHolder="Last Name"
            className={`
                bg-sky-900 rounded-lg h-10 cursor-pointer text-center w-80 my-3 text-lg text-white
            `}>
            </input>

            <input 
            onChange={e => setEmail(e.target.value)}
            placeHolder="Email"
            className={`
                bg-sky-900 rounded-lg h-10 cursor-pointer text-center w-80 my-3 text-lg text-white
            `}>
            </input>

            <input 
            onChange={e => setPassword(e.target.value)}
            placeHolder="Password"
            className={`
                bg-sky-900 rounded-lg h-10 cursor-pointer text-center w-80 my-3 text-lg text-white
            `}>
            </input>

            <div
            onClick={() => {
                dispatch(createrUserAccount(firstName, lastName, email, password));
                dispatch(resetMenu());
            }}
            className={`
                my-3 m-2 p-2 px-3 bg-sky-900 rounded-lg border-b-4 border-sky-950 text-lg cursor-pointer text-white
            `}>
                Create Account
            </div>
        </div>
    );
};

export default SignUpForm;