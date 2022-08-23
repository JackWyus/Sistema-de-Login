import { createContext, useEffect, useState } from "react";
//Contexto (context) disponibiliza uma forma de passar dados entre a árvore de componentes sem precisar passar props manualmente em cada nível.

//Vamos exportar o authContext e o createContext passando um objeto vázio.
export const authContext = createContext({});

// Vamos crair o authProvider que vai receber um children
export const AuthProvider = ({ children }) => {
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
    /*Vamos criar uma função responsável por fazer o cadastro do usuário*/
    const signUp = (email, password) => {
        const usersStorage = JSON.parse(localStorage.getItem("users_db"));
        const hasUser = usersStorage?.filter((user) => user.email === email); // Vamos verificar se existe algum email cadastrao no sistema com esse que a função vai receber como parâmetro

        // Se tiver um email já cadastrado, vamos retornar uma mensagem informando ao usuário
        if(hasUser?.length){
            return "Usuário já cadastrado com esse e-mail";
        };
        //Se não tiver, vamos criar um novo cadastro para ele então.

        let newUser;
        if(usersStorage){
            //Se existir usuários já cadastrado no nosso banco, ele só vai concatenar com os já existente representado por ", {email,password}"
            newUser = [...usersStorage, { email, password }]; 
        }else{
            // Caso ainda não existe nenhum cadastro - vamos criar apenas um conjunto de objeto mesmo.
            newUser = [{email, password}]; 
        };
        localStorage.setItem("users_db", JSON.stringify(newUser));

        return;
    };


    const signOut = () => {
        setUser(null);
        localStorage.removeItem("user_token");
    };

    return (
    <authContext.Provider 
        value={{ user, signed: !!user, signin, signUp, signOut}} //Vamos retornar nossos valores, para que possamos usar eles em qualquer parte da nossa aplicação - signed: !!user -> vai verificar se existe um usuário 
    >
    { children }
    </authContext.Provider>
    );
};


// ! Operador lógico NÃO (Logical NOT)
// || Operador lógico OU (Logical OR)
// && Operador lógico E (Logical AND)