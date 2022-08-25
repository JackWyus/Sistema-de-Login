import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from '../Pages/Home/index';
import Signin from '../Pages/Signin/index';
import Signup  from '../Pages/Signup/index';
import NotFound from '../Pages/NotFound/index';
import useAuth from '../hooks/useAuth';

const Private = ({ Item  }) => {
    const { signed } = useAuth();

    return signed > 0 ? <Item /> : <Signin />;
};

function routesWeb(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={ <Private Item={ Home } />}/>
                <Route path="/" element={ <Signin/> }/>
                <Route path="/signup " element={ <Signup /> }/>

                <Route path="*" element={ <NotFound/> }/>
            </Routes>
        </BrowserRouter>
    );
};

export default routesWeb;