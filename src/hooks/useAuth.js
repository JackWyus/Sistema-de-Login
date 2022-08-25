import { useContext } from 'react';
import { authContext } from '../contexts/authentication/auth coments';


function useAuth() {
  const context = useContext(authContext);  
  
  return context;
};

export default useAuth;