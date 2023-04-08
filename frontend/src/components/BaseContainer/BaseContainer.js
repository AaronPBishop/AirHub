import { useSelector } from 'react-redux';

import SignUpForm from '../Navigation/Account/SignUpForm.js';
import LogInForm from '../Navigation/Account/LogInForm.js';
import AllRecipesContainer from '../AllRecipes/AllRecipesContainer.js';
import UserOptionsContainer from '../Navigation/UserOptions/UserOptionsContainer.js';

const BaseContainer = () => {
    const menu = useSelector(state => state.menu);

    return (
        <div className={`
            bg-amber-400 h-screen
        `}>
            <div className={`
                ${menu.clickedLogIn ? 'hidden' : menu.clickedSignUp ? 'hidden' : menu.clickedAccount && 'hidden'}
            `}>
                <AllRecipesContainer /> 
            </div>

            <div className={`
                ${!menu.clickedSignUp && 'hidden'}
                flex justify-center
            `}>
                <SignUpForm />
            </div>

            <div className={`
                ${!menu.clickedLogIn && 'hidden'}
                flex justify-center
            `}>
                <LogInForm />
            </div>

            <div className={`
                ${!menu.clickedAccount && 'hidden'}
                flex justify-center
            `}>
                <UserOptionsContainer />
            </div>
        </div>
    );
};

export default BaseContainer;