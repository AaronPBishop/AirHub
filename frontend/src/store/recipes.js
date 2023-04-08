const initialState = {};

// ACTION CREATORS
export const populateRecipes = (recipes) => {
    return {
        type: 'POPULATE_RECIPES',
        payload: recipes
    };
};

// THUNKS
export const fetchRecipes = () => async (dispatch) => {
    const fetchReq = await fetch(`/api/recipes`, {
        method: 'GET'
    });

    const resData = await fetchReq.json();

    dispatch(populateRecipes(resData));
};

// MAIN REDUCER
const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'POPULATE_RECIPES': {
            return { ...action.payload };
        };

        default: return state;
    };
};

export default recipeReducer;