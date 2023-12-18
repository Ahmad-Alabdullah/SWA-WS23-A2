import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import About from './app/about/page';
import App from './App';
import Create from './app/create/page';
import Login from './app/login/page';
import { LoginProvider } from './context/LoginProvider';
import NotFound from './app/notFound/page';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Search from './app/search/page';
import SearchDetails from './app/searchDetails/page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'search/:id',
        element: <SearchDetails />,
      },
      {
        path: 'create',
        element: <Create />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
  </React.StrictMode>,
);
