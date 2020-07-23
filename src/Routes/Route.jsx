import React from "react";
import {Route} from "react-router-dom";
import Register from "../Compoenents/Auth/registration"
import Login from "../Compoenents/Auth/Login"


const Routers = () => {
    return(
        <div>
            <Route path="/user/register" component = {Register}/>
            <Route path="/user/login" component = {Login}/>
            <Route path="/owner/register" component = {Register}/>
            <Route path="/owner/login" component = {Login}/>
        </div>
    )
}

export default Routers