import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";


import Home from "./components/Home";
import User from "./components/User";


const App = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} exact/>
                <Route path="/user" element={<User />} exact/>
                
            </Routes>
        </BrowserRouter>
    )
}


export default App;