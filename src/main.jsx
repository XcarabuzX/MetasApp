import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Error from './components/shared/Error.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Lista from './components/list/Lista.jsx'
import Details from './components/new/Details.jsx'
import Memory from './services/Memory.jsx'
import Modal from './components/shared/Modal.jsx'

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
        element: <Lista />,
        children:[
          {
            path:"/lista/:id",
            element: 
              <Modal>
                <Details/>
              </Modal>
          }
        ]
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
    <Memory>
      <RouterProvider router={router} />
    </Memory>
  </React.StrictMode>,
)
