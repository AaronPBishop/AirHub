import { useDispatch } from 'react-redux';

import { setClickedSignUp } from '../../../store/menu.js';

const SignUpButton = () => {
    const dispatch = useDispatch();

    return (
        <div 
        onClick={() => dispatch(setClickedSignUp())}
        className={`
            text-white bg-amber-800 cursor-pointer leading-10 w-20 rounded-lg text-center border-b-4 border-amber-900 text-lg
        `}>
            Sign Up
        </div>
    );
};

export default SignUpButton;