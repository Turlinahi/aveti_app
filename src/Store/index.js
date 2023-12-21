import { configureStore } from "@reduxjs/toolkit";
import userReducer from './UserSlice';


const store = configureStore ({
    reducer:{
        user: userReducer /* from here we receive our state */
    }
})

export default store;
