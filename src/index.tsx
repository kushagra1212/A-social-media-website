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
import './index.css';
import { RouterProvider } from 'react-router-dom';

import { router } from './router/ruter';
import { Profiler } from 'react';

const store = createStore(Reducers, composeWithDevTools(compose(applyMiddleware(thunk))));
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',

  transition: transitions.SCALE,
};
function onRender(
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions, // the Set of interactions belonging to this update
) {
  // Aggregate or log render timings...
  console.log({
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions,
  });
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!); // createRoot(container!) : when TypeScript
root.render(
  <Profiler id="App" onRender={onRender}>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <ErrorBoundaries>
          <RouterProvider router={router} />
        </ErrorBoundaries>
      </AlertProvider>
    </Provider>
  </Profiler>,
);
