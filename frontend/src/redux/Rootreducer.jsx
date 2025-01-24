import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './features/user-slice.jsx'

const rootReducer = combineReducers({
    user: userReducer,
})

export default rootReducer