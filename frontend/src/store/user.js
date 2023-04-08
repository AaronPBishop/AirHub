import { csrfFetch } from './csrf';

const initialState = {};

// ACTION CREATORS
export const populateUserData = (userData) => {
    return {
        type: 'POPULATE_USER_DATA',
        payload: userData
    };
};

export const clearUserData = () => {
    return {
        type: 'CLEAR_USER_DATA'
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

export const deleteSession = () => async (dispatch) => {
    await csrfFetch('/api/session', {
      method: 'DELETE'
    });

    dispatch(clearUserData());
};


// MAIN REDUCER
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'POPULATE_USER_DATA': {
            return { ...action.payload };
        };

        case 'CLEAR_USER_DATA': {
            return {};
        };

        default: return state;
    };
};

export default userReducer;