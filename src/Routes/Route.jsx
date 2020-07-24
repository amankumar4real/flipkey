import React from "react";
import {Route} from "react-router-dom";
import Register from "../Components/Auth/registration"
import Login from "../Components/Auth/Login"
import ResultPage from "../Components/Result/ResultPage.jsx"
import LandingPage from "../Components/landing/landingPage"


const Routers = () => {
    return(
        <div>
            <Route path="/" exact component = {LandingPage}/>
            <Route path="/result" component = {ResultPage}/>
            <Route path="/user/register" component = {Register}/>
            <Route path="/user/login" component = {Login}/>
            <Route path="/owner/register" component = {Register}/>
            <Route path="/owner/login" component = {Login}/>
        </div>
    )
}

export default Routers