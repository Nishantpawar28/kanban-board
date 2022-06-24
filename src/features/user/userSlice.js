import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: !!localStorage.getItem('authenticated'),
    details: localStorage.getItem('authenticated') ? JSON.parse(localStorage.getItem('user-details')) : null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: () => {
            localStorage.removeItem('user-details');
            localStorage.removeItem('authenticated');
            return {
                isAuthenticated: false,
                details: null,
            };
        },
        login: (state, action) => {
            state.isAuthenticated = true;
            state.details = action.payload;
            state.details.photoURL = '/static/mock-images/avatars/avatar_default.jpg';
            localStorage.setItem('user-details', JSON.stringify(state.details));
            localStorage.setItem('authenticated', "true");
        },
    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions

export default userSlice.reducer
