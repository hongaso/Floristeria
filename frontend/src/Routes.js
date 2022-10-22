import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './core/Home';
import Signin from './core/Signin';
import Signup from './core/Signup';
import AddFlores from './core/AddFlores';
import AddCategory from './core/AddCategory';
import Flores from './core/Flores';

const SwitchRoutes = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/signin' element={<Signin/>} />
                <Route path='/signup' element={<Signup/>} />
                <Route path='/addcategory' element={<AddCategory/>} />
                <Route path='/addflores' element={<AddFlores/>} />
                <Route path='/flores/:floresId' element={<Flores/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default SwitchRoutes;