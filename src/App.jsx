import React from 'react';
import RoutesWeb from './routes/routes.jsx'
import {AuthProvider} from './contexts/authentication/auth'

function App() {
  return (
    <AuthProvider>
      <RoutesWeb />
    </AuthProvider>
  );
};

export default App;