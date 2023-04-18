import { useDispatch } from 'react-redux';

import { setClickedLogIn } from '../../../store/menu.js';
import { clearRecipeData } from '../../../store/setRecipe.js';

const LogInButton = () => {
    const dispatch = useDispatch();

    return (
        <div 
        onClick={() => {
            dispatch(clearRecipeData());
            dispatch(setClickedLogIn());
        }}
        className={`
            text-white bg-amber-800 cursor-pointer leading-10 w-20 rounded-lg text-center border-b-4 border-amber-900 text-lg
        `}>
            Log In
        </div>
    );
};

export default LogInButton;