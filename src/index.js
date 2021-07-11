
import ReactDOM from 'react-dom'
import App from './App';
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import Reducers from './reduces/Reducers'
import thunk from 'redux-thunk'
import AlertTemplate from 'react-alert-template-basic'
import {composeWithDevTools} from 'redux-devtools-extension';
const store=createStore(Reducers,composeWithDevTools(compose(applyMiddleware(thunk))));
const options = {
 
    position: positions.BOTTOM_CENTER,
    timeout: 500,
    offset: '30px',
  
    transition: transitions.SCALE
  }
ReactDOM.render(<Provider store={store}  > 
   <AlertProvider template={AlertTemplate} {...options}><App /></AlertProvider>
  </Provider>,document.getElementById('root'));
  