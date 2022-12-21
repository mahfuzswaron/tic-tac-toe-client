import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Entry from './app/pages/Entry';
/* const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "entry",
        element: <Entry />
      }
    ]
  },

]); */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      {/* <RouterProvider router={router} /> */}
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
