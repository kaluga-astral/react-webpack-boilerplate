import ReactDOM from 'react-dom';

import App from './App';

const render = () => {
  const root = document.getElementById('root');

  if (root) {
    ReactDOM.render(<App />, root);
  }
};

render();
