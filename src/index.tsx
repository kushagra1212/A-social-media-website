import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import ReactDOM from 'react-dom/client';
import Reducers from './reduces/Reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import AlertTemplate from 'react-alert-template-basic';
import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ErrorBoundaries } from './Errors/ErrorBoundaries';

import { RouterProvider } from 'react-router-dom';

import { router } from './router/ruter';

const store = createStore(Reducers, composeWithDevTools(compose(applyMiddleware(thunk))));
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',

  transition: transitions.SCALE,
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!); // createRoot(container!) : when TypeScript
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <ErrorBoundaries>
        <RouterProvider router={router} />
      </ErrorBoundaries>
    </AlertProvider>
  </Provider>,
);
