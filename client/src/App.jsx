import React from 'react';
import AllRoutes from 'views/routes';
import { BrowserRouter } from 'react-router-dom'

const App = () => {
    return (
        <BrowserRouter>
            <AllRoutes />
        </BrowserRouter>
    )
}

export default App;
