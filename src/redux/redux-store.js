import {applyMiddleware, combineReducers, createStore} from "redux";
import reportReducer from "./report-reducer";
import dailyReportReducer from "./dailyReport-reducer";
import accountReducer from "./account-reducer";
import thunkMiddleware from "redux-thunk"

let reducers = combineReducers({
    reportPage: reportReducer,
    dailyReportPage: dailyReportReducer,
    accountPage: accountReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;