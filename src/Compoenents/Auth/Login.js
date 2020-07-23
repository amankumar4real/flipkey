import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import Registraion from './registration'
import Vacation from '../common/Vacation'
import Navbar from '../common/Navbar'

export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isLogin:false
        }
    }
    handleSubmit=e=>{
        e.preventDefault()
    }
    render(){
        return(
            <div>
                <Navbar />
                <div className="container  my-5" id='loginForm'>
                    <div className='row justify-content-center border'>  
                        <div className='text-center' style={{width:400}}>
                            <p className='lead'>
                                With a single account, access both FlipKey and Tripadvisor
                            </p>
                            <small>
                                Don't have a Tripadvisor account? 
                                <span 
                                    className='text-info' 
                                    onClick={this.changeForm}
                                > 
                                Sign in
                                </span> 
                            </small>
                        </div>  
                         {/*login page  */}
                        <div className=' col-6 border m-2 p-2' style={{width:350}}>
                            <p>Sign in with Tripadvisor</p>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    aria-describedby="emailHelp"
                                    name='email'
                                    placeholder='Email address'
                                    autoComplete='off' 
                                    />
                                </div>
                                <div className="form-group">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    name='password'
                                    placeholder='Password'
                                    autoComplete='off' 
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
                        {/*registration page  */}
                         <Registraion />
                        {/* Vacation inspiration Component */}
                        <div  className="col-12" id='vacationPage'>
                            <Vacation />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}