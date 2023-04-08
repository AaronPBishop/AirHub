import { csrfFetch } from './csrf';

const initialState = {};

// ACTION CREATORS
export const setRecipe = (recipe) => {
    return {
        type: 'SET_RECIPE',
        payload: recipe
    };
};

export const clearRecipeData = () => {
    return {
        type: 'CLEAR_RECIPE_DATA'
    };
};

// THUNKS
export const fetchSetRecipe = (id) => async (dispatch) => {
    const fetchReq = await fetch(`/api/recipes/${id}`, {
        method: 'GET'
    });

    const resData = await fetchReq.json();

    dispatch(setRecipe(resData));
};

export const postNewComment = (id, comment) => async () => {
    await csrfFetch(`/api/recipes/${id}/new_comment`, {
        method: 'POST',
        body: JSON.stringify({ comment })
    });
};

// MAIN REDUCER
const setRecipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_RECIPE': {
            return { ...action.payload };
        };

        case 'CLEAR_RECIPE_DATA': {
            return {};
        };

        default: return state;
    };
};

export default setRecipeReducer;