import { useSelector } from 'react-redux';

import SignUpForm from '../Navigation/Account/SignUpForm.js';
import LogInForm from '../Navigation/Account/LogInForm.js';
import AllRecipesContainer from '../AllRecipes/AllRecipesContainer.js';
import UserOptionsContainer from '../Navigation/UserOptions/UserOptionsContainer.js';
import SetRecipe from '../SetRecipe/SetRecipe.js';

const BaseContainer = () => {
    const menu = useSelector(state => state.menu);
    const setRecipe = useSelector(state => state.setRecipe.recipe);

    return (
        <div className={`
            bg-sky-200 w-5/6 m-auto rounded-lg overflow-auto my-4 h-11/12 container-shadow
        `}>
            <div className={`
                ${
                    menu.clickedLogIn ? 'hidden' : 
                    menu.clickedSignUp ? 'hidden' : 
                    menu.clickedAccount ? 'hidden' : 
                    (setRecipe && Object.keys(setRecipe).length) && 'hidden'
                }
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

            <div className={`
                ${(!setRecipe || !Object.keys(setRecipe).length) && 'hidden'}
                flex justify-center
            `}>
                <SetRecipe />
            </div>
        </div>
    );
};

export default BaseContainer;