import { csrfFetch } from './csrf';

const initialState = {};

// ACTION CREATORS
export const populateUserData = (userData) => {
    return {
        type: 'POPULATE_USER_DATA',
        payload: userData
    };
};


// THUNKS
export const createrUserAccount = (firstName, lastName, email, password) => async (dispatch) => {
    const fetchReq = await csrfFetch(`/api/users`, {
        method: 'POST',
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password
        })
    });

    const resData = await fetchReq.json();

    dispatch(populateUserData(resData));
};

export const logInUser = (email, password) => async (dispatch) => {
    const fetchReq = await csrfFetch(`/api/session`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        })
    });

    const resData = await fetchReq.json();

    dispatch(populateUserData(resData));
};

export const restoreUser = () => async (dispatch) => {
    const fetchReq = await csrfFetch('/api/session');
    const resData = await fetchReq.json();
    
    dispatch(populateUserData(resData));
};


// MAIN REDUCER
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'POPULATE_USER_DATA': {
            return { ...action.payload };
        };

        default: return state;
    };
};

export default userReducer;