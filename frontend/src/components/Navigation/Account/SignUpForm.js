import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { createrUserAccount } from '../../../store/user.js';

const SignUpForm = () => {
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div 
        className={`
            flex justify-center flex-wrap w-96 bg-amber-600 mt-16 py-4 rounded-lg
        `}>
            <input 
            onChange={e => setFirstName(e.target.value)}
            placeHolder="First Name"
            className={`
                bg-amber-100 rounded-lg h-10 cursor-pointer text-center w-80 my-3
            `}>
            </input>

            <input 
            onChange={e => setLastName(e.target.value)}
            placeHolder="Last Name"
            className={`
                bg-amber-100 rounded-lg h-10 cursor-pointer text-center w-80 my-3
            `}>
            </input>

            <input 
            onChange={e => setEmail(e.target.value)}
            placeHolder="Email"
            className={`
                bg-amber-100 rounded-lg h-10 cursor-pointer text-center w-80 my-3
            `}>
            </input>

            <input 
            onChange={e => setPassword(e.target.value)}
            placeHolder="Password"
            className={`
                bg-amber-100 rounded-lg h-10 cursor-pointer text-center w-80 my-3
            `}>
            </input>

            <div
            onClick={() => dispatch(createrUserAccount(firstName, lastName, email, password))}
            className={`
                text-white bg-amber-800 cursor-pointer leading-10 w-48 rounded-lg text-center border-b-4 border-amber-900 text-lg my-3
            `}>
                Create Account
            </div>
        </div>
    );
};

export default SignUpForm;