import { combineReducers } from "redux"
import { UserReducer } from "./UserReducer"

const rootReducer = combineReducers({
    userDetails: UserReducer
})
export default rootReducer;