import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { logInUser } from '../../../store/user.js';
import { resetMenu } from '../../../store/menu.js';

const LogInForm = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div 
        className={`
            flex justify-center flex-wrap w-96 bg-amber-600 mt-16 py-4 rounded-lg
        `}>
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
            onClick={() => {
                dispatch(logInUser(email, password));
                dispatch(resetMenu());
            }}
            className={`
                text-white bg-amber-800 cursor-pointer leading-10 w-48 rounded-lg text-center border-b-4 border-amber-900 text-lg my-3
            `}>
                Log In
            </div>
        </div>
    );
};

export default LogInForm;