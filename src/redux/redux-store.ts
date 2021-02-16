import {applyMiddleware, combineReducers, createStore} from "redux";
import reportReducer from "./report-reducer";
import dailyReportReducer from "./dailyReport-reducer";
import userReducer from "./user-reducer";
import thunkMiddleware from "redux-thunk"
import {reducer as formReducer} from "redux-form";
import appReducer from "./app-reducer";
import { statisticsReducer } from "./statistics-reducer";

let rootReducer = combineReducers({
    reportPage: reportReducer,
    dailyReportPage: dailyReportReducer,
    userPage: userReducer,
    form: formReducer,
    app: appReducer,
    statisticsPage: statisticsReducer
});

type RootReducer = typeof rootReducer

export type AppStoreType = ReturnType<RootReducer>;

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store;