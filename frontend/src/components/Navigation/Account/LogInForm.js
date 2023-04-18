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
            flex justify-center flex-wrap w-96 mt-32 py-4 rounded-lg
            bg-sky-700 border-b-4 border-sky-900 shadow
        `}>
            <input 
            onChange={e => setEmail(e.target.value)}
            placeHolder="Email"
            className={`
                bg-sky-900 rounded-lg h-10 cursor-pointer text-center w-80 mt-6 mb-4 text-lg text-white
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
                dispatch(logInUser(email, password));
                dispatch(resetMenu());
            }}
            className={`
                my-4 m-2 p-2 px-6 bg-sky-900 rounded-lg border-b-4 border-sky-950 text-lg cursor-pointer text-white
            `}>
                Log In
            </div>
        </div>
    );
};

export default LogInForm;