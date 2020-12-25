import {applyMiddleware, combineReducers, createStore} from "redux";
import reportReducer from "./report-reducer";
import dailyReportReducer from "./dailyReport-reducer";
import userReducer from "./user-reducer";
import thunkMiddleware from "redux-thunk"
import {reducer as formReducer} from "redux-form";
import appReducer from "./app-reducer";

let reducers = combineReducers({
    reportPage: reportReducer,
    dailyReportPage: dailyReportReducer,
    userPage: userReducer,
    form: formReducer,
    app: appReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;