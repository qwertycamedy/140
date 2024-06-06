import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'store/store';

import App from './App.jsx';

import 'assets/styles/_vars.scss';
import 'assets/styles/_fonts.scss';
import 'assets/styles/_settings.scss';
import 'assets/styles/_other.scss';

console.log('Hello 140!')

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
