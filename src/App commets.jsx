import React from 'react';
import RoutesWeb from './routes/routes.jsx'
import {AuthProvider} from './contexts/authentication/auth'

function App() {
  return (
    <AuthProvider> // Vamos colocar encapsulando o "<RoutesWeb />" para que o contexto "AuthProvider" possa ser usado em qualquer parte da aplicação, então podemos acessar seus valores.
      <RoutesWeb />
    </AuthProvider>
  );
};

export default App;