import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./reducers/tasksSlice";






export const store = configureStore({
    reducer:{
        todo: tasksSlice
    }
})

