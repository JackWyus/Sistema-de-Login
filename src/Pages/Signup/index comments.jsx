import React, { useState } from 'react';
import Input from '../../components/Input';
import Button  from '../../components/Button';
import * as C from './style.js';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [emailConf, setEmailConf] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handlesSignup = () => {
    if(!email | !emailConf | !senha){
      setError('Preencha todos os campos');
      return; // Vamos verificar se todos os campos foram preenchidos
    }else if(email !== emailConf){
      setError('Os e-mails não são iguais');
      return; //Vamos verificar se o email é diferente do email de Confirmação, se sim, vamos retornar uma mensagem de error.
    };

    const res = signup(email, senha);
    if(res){
      setError(res);
      return;
    };

    alert('Usuário Cadastrado com Sucesso!!');
    navigate('/')

  }

  return (
    <C.Container>
      <C.Label>SISTEMA DE LOGIN</C.Label>
      <C.Content>
        <Input
        type='email'
        placeholder='Digite seu E-mail'
        value={email}
        onChange={(e) => [setEmail(e.target.value), setError('')]}
        />
        <Input
        type='email'
        placeholder='Confirme seu E-mail'
        value={emailConf}
        onChange={(e) => [setEmail(e.target.value), setError('')]}
        />
        <Input
        type='password'
        placeholder='Confirme sua Senha'
        value={senha}
        onChange={(e) => [setEmail(e.target.value), setError('')]}
        />

        <C.labelError>{error}</C.labelError>
        <Button Text='Cadastrar' onClick={handlesSignup} />
        <C.LabelSignin>
          Já tem uma Conta?
          <C.Strong>
            <Link to='/'>&nbsp;Entre</Link>
          </C.Strong>
        </C.LabelSignin>
      </C.Content>
    </C.Container>
  );
};

export default Signup;