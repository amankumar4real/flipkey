import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../fontAwesome/fontAwesome'
import {changeType} from '../../redux/Auth/action';

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
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    < span className="navbar-toggler-icon" />
                    </button>
                    <a class="navbar-brand" href="#">
                        <img src="/images/fk-logo.svg" width="100" height="30" alt="logo"/>
                    </a>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <div class="navbar-nav ml-auto d-flex">
                                <div class="nav-item">
                                <a class="nav-link" href="#">
                                <FontAwesomeIcon 
                                    icon={["fas", 'heart']} 
                                    style={{color:'#f7acbc'}}
                                />
                                    My Shortlist <span class="sr-only">(current)</span></a>
                                </div>
                                <div class="nav-item dropdown">
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
                                </div>
                                <div class="nav-item">
                                    <a class="nav-link" href="#">Manage your booking</a>
                                </div>
                                <div class="nav-item dropdown">
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
                                </div>
                                <div class="nav-item dropdown">
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
                                </div>
                                <div class="nav-item">
                                    <a class="nav-link" href="#" tabindex="-1" aria-disabled="true">List your property</a>
                                </div>
                            </div>
                    </div>
                </nav>
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