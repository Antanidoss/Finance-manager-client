import {applyMiddleware, combineReducers, createStore} from "redux";
import reportReducer from "./report-reducer";
import dailyReportReducer from "./dailyReport-reducer";
import accountReducer from "./account-reducer";
import thunkMiddleware from "redux-thunk"
import {reducer as formReducer} from "redux-form";

let reducers = combineReducers({
    reportPage: reportReducer,
    dailyReportPage: dailyReportReducer,
    accountPage: accountReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;