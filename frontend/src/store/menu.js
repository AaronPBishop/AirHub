const initialState = {
    clickedSignUp: false,
    clickedLogIn: false,
    clickedAccount: false,
    clickedCreateRecipe: false
};

// ACTION CREATORS
export const setClickedLogIn = () => {
    return {
        type: 'CLICKED_LOGIN'
    };
};

export const setClickedSignUp = () => {
    return {
        type: 'CLICKED_SIGNUP'
    };
};

export const setClickedAccount = () => {
    return {
        type: 'CLICKED_ACCOUNT'
    };
};

export const setClickedCreateRecipe = () => {
    return {
        type: 'CLICKED_CREATE_RECIPE'
    };
};

export const resetMenu = () => {
    return {
        type: 'RESET_MENU'
    };
};

// MAIN REDUCER
const menuReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'CLICKED_SIGNUP': {
            if (currentState.clickedSignUp) {
                currentState.clickedSignUp = false;
                return currentState;
            };

            for (let key in currentState) currentState[key] = false;

            currentState.clickedSignUp = true;

            return currentState;
        };

        case 'CLICKED_LOGIN': {
            if (currentState.clickedLogIn) {
                currentState.clickedLogIn = false;
                return currentState;
            };

            for (let key in currentState) currentState[key] = false;
            
            currentState.clickedLogIn = true;

            return currentState;
        };

        case 'CLICKED_ACCOUNT': {
            if (currentState.clickedAccount) {
                currentState.clickedAccount = false;
                
                for (let key in currentState) currentState[key] = false;

                return currentState;
            };

            for (let key in currentState) currentState[key] = false;
            
            currentState.clickedAccount = true;

            return currentState;
        };

        case 'CLICKED_CREATE_RECIPE': {
            for (let key in currentState) currentState[key] = false;
            
            currentState.clickedCreateRecipe = true;
            currentState.clickedAccount = true;

            return currentState;
        };

        case 'RESET_MENU': {
            for (let key in currentState) currentState[key] = false;

            return currentState;
        };

        default: return currentState;
    };
};

export default menuReducer;