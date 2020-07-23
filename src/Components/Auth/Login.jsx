import React from 'react';
import {connect} from 'react-redux'
import Vacation from '../common/Vacation'
import {postLogin, afterAuth} from '../../redux/Auth/action'
import GoogleLogin from 'react-google-login'
import {Link} from 'react-router-dom'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isLogin:false,
            type:'user',
            email:'',
            password:''
        }
    }

    handleChange=e=>{
        this.setState({
            [e.target.name]: e.target.value
        }) 
    }

    handleSubmit=e=>{
        e.preventDefault()
        const loginData={
            email: this.state.email,
            password: this.state.password,
            type: this.props.type
        }
        this.props.postLogin(loginData)
    }

    changeForm=()=>{
        this.setState({isLogin:!this.state.isLogin})
    }

    resposeGoogle = response => {
        const res={...response.profileObj, type:this.props.type}
        this.props.afterAuth(res)
        // console.log(res)
        // console.log(response.profileObj)

    }
    
    render(){
        console.log("props- type")
        console.log(this.props.type)
        const type= this.props.type
        return(
            <div>
                <div className="container  my-5" id='loginForm'>
                    <div className='row justify-content-center border'> 
                        <div className='text-center col-12'>
                            <p className='lead'>
                                With a single account, access both FlipKey and Tripadvisor
                            </p>
                            <div className='border m-2 p-2 mx-auto' style={{width:350}}>
                                <div className='border'>
                                    <GoogleLogin
                                    clientId = "612955599883-laa8c4lqqn9b2ki4ik7k6a4apsima2hh.apps.googleusercontent.com"
                                    buttonText = "SignIn with Google"
                                    onSuccess ={this.resposeGoogle}
                                    onFailure = {this.resposeGoogle}
                                    cookiePolicy = {'single_host_origin'}
                                    className = "w-100"
                                    />
                                </div>
                            </div>
                            <small>
                                Don't have a Tripadvisor account? 
                                <span 
                                    className='text-info' 
                                    onClick={this.changeForm}
                                > 
                                {/*  */}
                                <Link to={`/${type}/register`}>Sign Up</Link>
                                </span> 
                            </small>
                        </div>
                        
                         {/*login page  */}
                        <div className='border m-2 p-2' style={{width:350}}>
                            <p>Sign up with Tripadvisor</p>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    aria-describedby="emailHelp"
                                    name='email'
                                    placeholder='Email address'
                                    autoComplete='off'
                                    onChange={this.handleChange} 
                                    />
                                </div>
                                <div className="form-group">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    name='password'
                                    placeholder='Password'
                                    autoComplete='off' 
                                    onChange={this.handleChange}
                                    />
                                </div>
                                <div className="text-info">
                                    {/* <Link to='/forget'> */}
                                        <p> Forget password? </p>
                                    {/* </Link> */}
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Sign in</button>
                            </form>
                        </div> 
                        <div  className="col-12" id='vacationPage'>
                            <Vacation />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        type:state.reducerAuth.login_type
    }
}
const mapDispatchProps=dispatch=>{
    return{
        postLogin: payload=>dispatch(postLogin(payload)),
        afterAuth: payload=>dispatch(afterAuth(payload))
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Login)