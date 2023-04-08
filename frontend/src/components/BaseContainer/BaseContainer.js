import { useSelector } from 'react-redux';

import SignUpForm from '../Navigation/Account/SignUpForm.js';
import AllRecipesContainer from '../AllRecipes/AllRecipesContainer.js';

const BaseContainer = () => {
    const menu = useSelector(state => state.menu);

    return (
        <div className={`
            bg-amber-400 h-screen
        `}>
            <div className={`
                ${menu.clickedLogIn ? 'hidden' : menu.clickedSignUp && 'hidden'}
            `}>
                <AllRecipesContainer /> 
            </div>

            <div className={`
                ${!menu.clickedSignUp && 'hidden'}
                flex justify-center
            `}>
                <SignUpForm />
            </div>
        </div>
    );
};

export default BaseContainer;