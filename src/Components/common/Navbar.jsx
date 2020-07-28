import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../fontAwesome/fontAwesome'
import {changeType, signOut} from '../../redux/Auth/action';

class Navbar extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
                    type:'',
                    username:'',
                    isAuth:false
                 }
    }
    handleOwner=()=>{
        this.props.changeType("owner")
    }
    handleUser=()=>{
        this.props.changeType('user')
    }
    handleSignOut=()=>{
        this.props.signOut()
    }
    componentDidUpdate(){
        console.log(this.props.loginData)

    }

render() {
    
    const {username, token}= this.props.loginData
    return (
        <div>
            
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    < span className="navbar-toggler-icon" />
                </button>
                {/* Flipkey logo */}
                <div className="navbar-brand">
                    <Link to='/'>
                        <img src="/images/fk-logo.svg" width="100" height="30" alt="logo" />
                    </Link>
                </div>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <div className="navbar-nav ml-auto d-flex">
                        {/* ShortList */}
                        <div className="nav-item">
                            <div className="nav-link">
                                <FontAwesomeIcon icon={["fas", 'heart' ]} style={{color:'#f7acbc'}} />
                                <Link to='/short_list' className='text-muted text-decoration-none'>
                                    My Shortlist 
                                </Link>
                            </div>
                        </div>
                        {/* currency converter */}
                        <div className="nav-item dropdown">
                            <div className="nav-link dropdown-toggle" role="button"
                                data-toggle="dropdown">
                                $USD
                            </div>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <div className="dropdown-item" > GBP</div>
                                <div className="dropdown-item" >$ USD</div>
                            </div>
                        </div>
                        {/* Manage your booking */}
                        <div className="nav-item">
                            <div className="nav-link" >Manage your booking</div>
                        </div>
                        {/* help */}
                        <div className="nav-item dropdown">
                            <div className="nav-link dropdown-toggle" role="button"
                                data-toggle="dropdown">
                                Help
                            </div>
                            <div className="dropdown-menu">
                                <p>Travelers</p>
                                <div className="dropdown-item mt-0" >Manage existing bookings</div>
                                <div className="dropdown-item mt-0" >Common questions</div>
                                <p>Owners</p>
                                <div className="dropdown-item mt-0" >Common questions</div>
                                <p>Search</p>
                                <div className="dropdown-item mt-0" >Find div rental</div>
                                <div className="dropdown-item mt-0" >Travel Inspiration</div>
                            </div>
                        </div>
                        {/* 
                            isAuth is T-- signOut
                            else --- signIn
                         */}
                        {
                        token?
                            <div className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle"  id="navbarDropdown" role="button"
                                    data-toggle="dropdown">
                                    {username.split(' ')[0]}
                                </div>
                                <div className="dropdown-menu" >
                                    <div className="dropdown-item">
                                        <Link to='/inbox' style={{color:'black'}}>Traveler inbox</Link>
                                    </div>
                                    <div className="dropdown-item">
                                        <Link to='/account_info'style={{color:'black'}}>Account info</Link>
                                    </div>
                                    <div className="dropdown-item">
                                        <Link style={{color:'black'}} to='/subscription'>Manage subscriptions</Link>
                                    </div>
                                    <div className="dropdown-item">
                                        <Link style={{color:'black'}} to='/'onClick={this.handleSignOut}>Sign out</Link>
                                    </div>  
                                </div>
                            </div>
                        :
                            <div className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle"  id="navbarDropdown" role="button"
                                    data-toggle="dropdown">
                                    Sign in
                                </div>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <div className="dropdown-item">
                                        <Link style={{color:'black'}} to='/user/login' onClick={this.handleUser}>Travellers </Link>
                                    </div>
                                    <div className="dropdown-item">
                                        <Link to='/owner/login'style={{color:'black'}} onClick={this.handleOwner}>Owners/Managers</Link>
                                    </div>
                                </div>
                            </div>
                        }
                        {/* List your property */}
                        <div className="nav-item">
                            <div className="nav-link"  tabIndex="-1" aria-disabled="true">
                                <Link to='/property_list' className='text-muted text-decoration-none'>
                                    List your property
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

}

const mapStateToProps=state=>{
    return{
        loginData: state.reducerAuth
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
            changeType: payload=>dispatch(changeType(payload)),
            signOut: payload=>dispatch(signOut(payload))
        }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)