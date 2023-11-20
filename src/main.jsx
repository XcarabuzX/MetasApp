import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Error from './components/shared/Error.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Lista from './components/list/Lista.jsx'
import Details from './components/new/Details.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index:true,
        element:<Lista/>
      },
      {
        path:"/lista",
        element: <Lista />
      },
      {
        path:"/crear",
        element:<Details/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
