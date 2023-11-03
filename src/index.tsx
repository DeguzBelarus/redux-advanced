import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { setupStore } from './redux/store';
import { App } from './App';
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const store = setupStore();
const app = <Provider store={store}>
  <App />
</Provider>;
root.render(app);
