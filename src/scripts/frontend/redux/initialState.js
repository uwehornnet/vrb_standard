import CombinedReducer from "./reducer/CombinedReducer";
import {createStore} from "redux";

const initialState = createStore(
    CombinedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default initialState;