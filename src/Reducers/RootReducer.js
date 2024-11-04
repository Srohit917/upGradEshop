import { combineReducers } from "redux";
import { UserReducer } from "./UserReducer";
import { ProductReducer } from "./ProductsReducer";
import { AddressReducer } from "./AddressReducer";
import { CategoriesReducer } from "./CategoriesReducer";

const rootReducer = combineReducers({
    userDetails: UserReducer,
    categories: CategoriesReducer,
    productDetails: ProductReducer,
    addresses: AddressReducer
})
export default rootReducer;