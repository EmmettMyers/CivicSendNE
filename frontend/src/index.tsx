import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const setPage = (page: string) => {
  root.render(
    <React.StrictMode>
      <App page={page} />
    </React.StrictMode>
  );
}

export default setPage;

setPage('home');