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
                    <div class="navbar-brand" href="#">
                        <img src="/images/fk-logo.svg" width="100" height="30" alt="logo"/>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <div class="navbar-nav ml-auto d-flex">
                                <div class="nav-item">
                                <div class="nav-link" href="#">
                                <FontAwesomeIcon 
                                    icon={["fas", 'heart']} 
                                    style={{color:'#f7acbc'}}
                                />
                                    My Shortlist <span class="sr-only">(current)</span></div>
                                </div>
                                <div class="nav-item dropdown">
                                    <div class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" >
                                        $USD
                                    </div>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <div class="dropdown-item" href="#"> GBP</div>
                                        <div class="dropdown-item" href="#">$ USD</div>
                                        <div class="dropdown-item" href="#">fr. CHF</div>
                                        <div class="dropdown-item" href="#">EUR</div>
                                        <div class="dropdown-item" href="#">$ AUD</div>
                                        <div class="dropdown-item" href="#">$ CAD</div>
                                        <div class="dropdown-item" href="#">Skr SEK</div>
                                        <div class="dropdown-item" href="#">THB</div>
                                        <div class="dropdown-item" href="#">R ZAR</div>
                                    </div>
                                </div>
                                <div class="nav-item">
                                    <div class="nav-link" href="#">Manage your booking</div>
                                </div>
                                <div class="nav-item dropdown">
                                    <div class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" >
                                        Help
                                    </div>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <p>Travelers</p>
                                        <div class="dropdown-item mt-0" href="#">Manage existing bookings</div>
                                        <div class="dropdown-item mt-0" href="#">Common questions</div>
                                        <p>Owners</p>
                                        <div class="dropdown-item mt-0" href="#">Common questions</div>
                                        <p>Search</p>
                                        <div class="dropdown-item mt-0" href="#">Find div rental</div>
                                        <div class="dropdown-item mt-0" href="#">Travel Inspiration</div>
                                    </div>
                                </div>
                                <div class="nav-item dropdown">
                                    <div class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" >
                                        Sign in
                                    </div>
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
                                    <div class="nav-link" href="#" tabindex="-1" aria-disabled="true">List your property</div>
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