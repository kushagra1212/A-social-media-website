
import ReactDOM from 'react-dom'
import App from './App';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import Reducers from './reduces/Reducers'
import AlertTemplate from 'react-alert-template-basic'
const store=createStore(Reducers);
const options = {
 
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
  
    transition: transitions.SCALE
  }
ReactDOM.render(<Provider store={store}  > 
   <AlertProvider template={AlertTemplate} {...options}><App /></AlertProvider>
  </Provider>,document.getElementById('root'));
  