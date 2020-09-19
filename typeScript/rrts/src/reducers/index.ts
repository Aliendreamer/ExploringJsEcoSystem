import {combineReducers } from "redux";
import {todoReducer} from "./todo";
export interface StoreState{
   todos:import("../actions").Todo[]
}
export const reducers = combineReducers<StoreState>({
   todos:todoReducer
})