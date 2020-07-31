import React from "react";
import {Route} from "react-router-dom";
import Register from "../Components/Auth/registration"
import Login from "../Components/Auth/Login"
import ResultPage from "../Components/Result/ResultPage"
import landingPage from "../Components/landing/landingPage";
import PropertyPage from "../Components/PropertyPage/PropertyPage";
import Inbox from '../Components/Auth/inbox';
import Subscription from '../Components/Auth/subscription';
import AccountInfo from '../Components/Auth/accountInfo';
import PropertyList from '../Components/PropertyPage/propertyList';
import ShortList from '../Components/Result/shortList';
import BookingPage from "../Components/BookingPage/BookingPage";
import OnSuccessPage from "../Components/PropertyPage/OnSuccessPage"

const Routers = () => {
    return(
        <div>
                {/* <Route exact path="/nav" exact component ={Navbar}/> */}
                <Route path="/" exact component ={landingPage}/>
                <Route path="/user/register" component = {Register}/>
                <Route path="/user/login" component = {Login}/>
                <Route path="/inbox" component = {Inbox}/>
                <Route path="/subscription" component = {Subscription}/>
                <Route path="/account_info" component = {AccountInfo}/>
                <Route path="/property_list" component = {PropertyList}/>
                <Route path="/short_list" component = {ShortList}/>
                <Route path="/owner/register" component = {Register}/>
                <Route path="/owner/login" component = {Login}/>
                <Route exact path="/results" component = {ResultPage} />
                <Route exact path="/results/:id" component = {PropertyPage} />
                <Route path="/results/booking/:id" component = {BookingPage} />
                <Route path="/paymentdone" component = {OnSuccessPage} />
        </div>
    )
}

export default Routers

