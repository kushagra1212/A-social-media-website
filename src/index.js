import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import Reducers from "./reduces/Reducers";
import thunk from "redux-thunk";
import AlertTemplate from "react-alert-template-basic";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
const store = createStore(
  Reducers,
  composeWithDevTools(compose(applyMiddleware(thunk)))
);
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",

  transition: transitions.SCALE,
};
ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AlertProvider>
  </Provider>,

  document.getElementById("root")
);
