import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { favoriteReducer } from "./redux/reducers/favorite.reducer";
import { Provider } from "react-redux";

import { todoReducer } from "./redux/reducers/todos.reducer";
import mainReducer from "./redux/reducers";

const root = ReactDOM.createRoot(document.getElementById("root"));

//const store = createStore(favoriteReducer);
const store = createStore(todoReducer);

//const store = createStore(mainReducer);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
