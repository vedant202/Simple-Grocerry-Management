import { combineReducers } from "redux";
import { amountReducer,productReducer, savingsReducer, subTotalreducer } from "./productsAndTotalReducer";

const reducers = combineReducers({
    amountReducer:amountReducer,
    savingsReducer:savingsReducer,
    subTotalReducer:subTotalreducer,
    productReducers: productReducer

})

export default reducers