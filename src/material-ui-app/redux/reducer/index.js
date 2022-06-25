import { combineReducers } from "redux";
import { friendReducer } from "./FriendReducer";
import { postReducer } from "./PostReducer";
import { ureducer } from "./UReducer";
import { userReducer } from "./UserReducer";

export const reducer = combineReducers({
    user:userReducer,
    posts:postReducer,
    friend:friendReducer,
    u:ureducer
})