import App from './App.tsx';
import { store } from './redux/store.ts';
import './scss/styles.scss';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
