import { combineReducers } from "redux";
import { favoriteReducer } from "./favorite.reducer";
import { todoReducer } from "./todos.reducer";

export default combineReducers({
  todoReducer,
  favoriteReducer,
});
