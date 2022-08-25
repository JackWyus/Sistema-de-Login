import React, { useState } from 'react';
import Input from '../../components/Button/index';
import Button from '../../components/Button/index';
import * as C from './style';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
   
  const handleLogin = () =>{
    //Vamos verificar se o email e senha estão preenchidos, se não estiverem, vamos setar um erro
    if(!email | !password){
      setError('Preencha todos os campos');
      return;
    };
    const res = signin(email, password);
    if(res){
      setError(res);
      return;
    }
    // Se o res encontrar algum signin com esse email e senha passado, direcione a página para a página de home
    navigate('/home')
  };

  return (
    <C.Container>
      <C.Label>Sistema de Login</C.Label>
      <C.Content>
        <Input
          Type='email'
          placeholder='Digite seu E-mail'
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError('')]}
        />
         <Input
          Type='password'
          placeholder='Digite sua Senha'
          value={password}
          onChange={(e) => [setPassword(e.target.value), setError('')]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text='Entrar' onClick={handleLogin} />
        <C.LabelSignup>
          Não tem uma conta?
          <C.Strong>
            <Link to='/signup'>&nbsp;Registre-se</Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};
 
export default Signin;