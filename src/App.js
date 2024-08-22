// App.js
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './AppRouter';
import { Provider } from './Context/StatusContext';  // Import the context provider

const App = () => {
  return (
    <Provider>
      <RouterProvider router={AppRouter} />
    </Provider>
  );
};

export default App;

