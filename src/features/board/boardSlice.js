import {createSlice} from '@reduxjs/toolkit'
import tasks from "../../pages/Tasks";

const initialState = {
    boards: [
        {
            id: 1,
            title: 'Backlog',
            cards: []
        },
        {
            id: 2,
            title: 'Todo',
            cards: []
        },
        {
            id: 3,
            title: 'Ongoing',
            cards: []
        },
        {
            id: 4,
            title: 'Done',
            cards: []
        },
    ],
    tasks: [
        {
            id: 1,
            bid: 1,
            details:{
            }
        },
    ]
}

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        createTask: ({board}, {payload}) => {
            board[0].push(payload);
        },
        updateBoard: (state, {payload}) => {
            state.boards = payload;
        },
        deleteTaskById: (state, {payload}) => {
            const indexOfTask = tasks.findIndex((item) => item.id === payload);
            tasks.splice(indexOfTask, 1);
        },
        updateTaskById: (state, {payload}) => {
            const indexOfTask = tasks.findIndex((item) => item.id === payload.id);
            tasks[indexOfTask] = payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const {createTask, deleteTaskById, updateTaskById, updateBoard} = boardSlice.actions

export default boardSlice.reducer
