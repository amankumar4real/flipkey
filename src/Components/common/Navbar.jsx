import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {changeType} from '../../redux/Auth/action'

class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type:''
        }
    }
    handleOwner=()=>{
        this.props.changeType("owner")
    }
    handleUser=()=>{
        this.props.changeType('user')
    }

    render() {
        return (
            <div>
                <div className="ml-1 mb-0 pb-0">
                    <p className="text-danger mb-0"><small>COVID-19 Update</small></p>
                    <p><small>The impact of COVID-19 on travel is unprecedented. Like you, we’re monitoring the situation. Rest assured, we’re here to help with questions about your plans. Learn more here: <a className="bg-warning" href="https://helpcenter.flipkey.com/faq/view/About-the-coronavirus-outbreak-COVID-19">About the coronavirus outbreak (COVID-19)</a></small></p>
                </div>
                <hr className="mt-0"></hr>
                <div className="mt-0 mb-0 pt-0">



                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <a class="navbar-brand" href="#">
                            flipkey
                        </a>
                        <button 
                            class="navbar-toggler" 
                            type="button" data-toggle="collapse" 
                            data-target="#navbarSupportedContent" 
                            aria-controls="navbarSupportedContent" 
                            aria-expanded="false" 
                            aria-label="Toggle navigation"
                        >
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse">
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item">
                                    <a class="nav-link" href="#">My Shortlist <span class="sr-only">(current)</span></a>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" >
                                        $USD
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item" href="#"> GBP</a>
                                        <a class="dropdown-item" href="#">$ USD</a>
                                        <a class="dropdown-item" href="#">fr. CHF</a>
                                        <a class="dropdown-item" href="#">EUR</a>
                                        <a class="dropdown-item" href="#">$ AUD</a>
                                        <a class="dropdown-item" href="#">$ CAD</a>
                                        <a class="dropdown-item" href="#">Skr SEK</a>
                                        <a class="dropdown-item" href="#">THB</a>
                                        <a class="dropdown-item" href="#">R ZAR</a>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Manage your booking</a>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" >
                                        Help
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <p>Travelers</p>
                                        <a class="dropdown-item mt-0" href="#">Manage existing bookings</a>
                                        <a class="dropdown-item mt-0" href="#">Common questions</a>
                                        <p>Owners</p>
                                        <a class="dropdown-item mt-0" href="#">Common questions</a>
                                        <p>Search</p>
                                        <a class="dropdown-item mt-0" href="#">Find a rental</a>
                                        <a class="dropdown-item mt-0" href="#">Travel Inspiration</a>
                                    </div>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" >
                                        Sign in
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <div class="dropdown-item"> 
                                        <Link to='/user/login' onClick={this.handleUser}>Travellers </Link>
                                        </div>
                                        <div class="dropdown-item"> 
                                        <Link to='/owner/login' onClick={this.handleOwner}>Owners/Managers</Link>
                                        </div>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#" tabindex="-1" aria-disabled="true">List your property</a>
                                </li>
                            </ul>
                            {/* <form class="form-inline my-2 my-lg-0">
                                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form> */}
                        </div>
                    </nav>





                </div>
            </div>
        )
    }
        
}
const mapDispatchToProps=(dispatch)=>{
    return{
        changeType: payload=>dispatch(changeType(payload))
    }
}
export default connect(null, mapDispatchToProps)(Navbar)