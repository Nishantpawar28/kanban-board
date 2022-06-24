import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import boardReducer from '../features/board/boardSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        board: boardReducer,
    },
})
