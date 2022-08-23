import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from '../Pages/Home/index';
import Login from '../Pages/Login/index';
import Register from '../Pages/Register/index';
import NotFound from '../Pages/NotFound/index';
import useAuth from '../hooks/useAuth';

const Private = ({ Item  }) => {
    const { signed } = useAuth();

    return signed > 0 ? <Item /> : <Login />;
};

function routesWeb(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/Home" element={ <Private Item={ Home } />}/>
                <Route path="/" element={ <Login/> }/>
                <Route path="/Register" element={ <Register/> }/>

                <Route path="*" element={ <NotFound/> }/>
            </Routes>
        </BrowserRouter>
    );
};

export default routesWeb;