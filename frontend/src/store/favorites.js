import { csrfFetch } from './csrf';

const initialState = {};

// ACTION CREATORS
export const populateFavorites = (recipes) => {
    return {
        type: 'POPULATE_FAVORITES',
        payload: recipes
    };
};

// THUNKS
export const fetchFavorites = (userId) => async (dispatch) => {
    const fetchReq = await csrfFetch(`/api/favorites/${userId}`, { method: 'GET' });

    const resData = await fetchReq.json();

    dispatch(populateFavorites(resData));
};

// MAIN REDUCER
const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'POPULATE_FAVORITES': {
            return { ...action.payload };
        };

        default: return state;
    };
};

export default favoriteReducer;