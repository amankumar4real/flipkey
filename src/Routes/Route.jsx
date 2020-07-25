import React from "react";
import {Route} from "react-router-dom";
import Register from "../Components/Auth/registration"
import Login from "../Components/Auth/Login"
import ResultPage from "../Components/Result/ResultPage"
import landingPage from "../Components/landing/landingPage";
import PropertyPage from "../Components/PropertyPage/PropertyPage"


const Routers = () => {
    return(
        <div>
                <Route path="/user/register" component = {Register}/>
                <Route path="/user/login" component = {Login}/>
                <Route path="/owner/register" component = {Register}/>
                <Route path="/owner/login" component = {Login}/>
                <Route  exact path="/results" component = {ResultPage} />
                <Route path="/results/:id" component = {PropertyPage} />
                <Route path="/" exact component ={landingPage}/>
            
        </div>
    )
}

export default Routers

