import { createContext, useEffect, useState } from "react";
//Contexto (context) disponibiliza uma forma de passar dados entre a árvore de componentes sem precisar passar props manualmente em cada nível.

//Vamos exportar o authContext e o createContext passando um objeto vázio.
export const authContext = createContext({});

// Vamos crair o authProvider que vai receber um children
export const authProvider = ({ children }) => {
    const [user, setUser] = useState();

    /*Toda vez que o useEffect carregar nossa aplicação, vamos verificar no "localStorage" o "user_tokne" e o "users_db"*/
    useEffect(() => {
        const userToken = localStorage.getItem("user_token");
        const usersStorage = localStorage.getItem("users_db");

        /*Vamos verificar se existe um token E se existe um usuário */
        if(userToken && usersStorage){
            /*Verificação simples se o usuário tem o mesmo email do que userToken */
            const hasUser = JSON.parse(usersStorage)?.filter(
                (user) => user.email === JSON.parse(userToken).email);
            
            /*Se for o mesmo, vamos setar para o nosso "setUser" o usuário do nosso banco*/
            if(hasUser) setUser(hasUser[0]);  
        };

    }, []); 

    const signin = (email, password) => {
        /*Vamos declarar um variável userStorage que vai receber os nossos usuários do nosso banco*/
        const usersStorage = JSON.parse(localStorage.getItem("users_db"));

        /*Filtro de verificação se existe algum email cadastrado*/
        const hasUser = usersStorage?.filter((user) => user.email === email);

        /*Condicional: Se existe um usuário cadastrado com esses dados que estamos entrando(email e password) se não vamos retornar alguns avisos*/
        if(hasUser?.length){
            /*Vamos verificar os dados(email e password) que o usuário passou são validos*/
            if(hasUser[0].email === email && hasUser[0].password === password){
                //Gerando um token aleátorio para termos um controle 
                const token = Math.random().toString(36).substring(2);
                localStorage.setItem("user_token", JSON.stringify({email, token})); // geralmente é só o token
                setUser({email, password});
                return;
            }else{
                //caso o email ou senha que o usuário passou e não condiz com o existente
                return "Email ou senha incorretos";
            };
        }else{
            // caso não existe usuário
            return "Usuário não cadastrado";
        };
    };

    return <authContext.Provider> { children } </authContext.Provider>;

};


// ! Operador lógico NÃO (Logical NOT)
// || Operador lógico OU (Logical OR)
// && Operador lógico E (Logical AND)