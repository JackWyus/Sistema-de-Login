import { authContext } from '../contexts/authentication/auth coments'; // vamos importar o authContext

//Ao invés de fazermos isso em toda página que vamos precisar, basta importar a função "useAuth" e para que esse contexto fique visível na nossa aplicação 
function useAuth() {
  const context = useContext(authContext);  

  return context;
};

export default useAuth;