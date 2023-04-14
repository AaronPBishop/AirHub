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

export const rateRecipe = (id, rating) => async () => {
    await csrfFetch(`/api/recipes/${id}/rate`, {
        method: 'PUT',
        body: JSON.stringify({ rating })
    });
};

export const favoriteRecipe = (userId, recipeId) => async () => {
    await csrfFetch(`/api/favorites`, {
        method: 'POST',
        body: JSON.stringify({ userId, recipeId })
    });
};

export const unfavoriteRecipe = (favoriteId) => async () => {
    await csrfFetch(`/api/favorites/${favoriteId}`, { method: 'DELETE' });
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