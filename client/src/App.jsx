import React, { useEffect } from 'react'
import AllRoutes from 'views/routes'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from 'context/UserContext'
import { ToastContainer } from 'react-toastify'
import { GlobalHistory } from 'components/globalhistory'
import 'react-toastify/dist/ReactToastify.css'
const App = () => {

  useEffect(() => {
    // Setup local storage
    if (!localStorage.getItem('collapsed')) {
      localStorage.setItem('collapsed', false)
    }
    if (!localStorage.getItem('selected_sidebar_key')) {
      localStorage.setItem('selected_sidebar_key', 1)
    }
    // if (!localStorage.getItem('user')) {
    //     localStorage.setItem('user', null)
    // }
  }, [])

  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <GlobalHistory />
          <AllRoutes />
        </BrowserRouter>
      </UserProvider>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
