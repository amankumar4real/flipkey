import React from 'react'
import {connect} from 'react-redux'
import {postReg, afterAuth} from '../../redux/Auth/action'
import Vacation from '../common/Vacation'
import {Link} from 'react-router-dom'
import GoogleLogin from 'react-google-login'

class Registation extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            name:'',
            password:'',
            phone:''
        }
    }
    handleChange=e=>{
        this.setState({
            [e.target.name]: e.target.value
        })

    }
    handleSubmit=e=>{
        e.preventDefault()
        const {email, name, password, phone}=this.state
        
        this.props.postReg({email:email, password:password,name:name, phone:Number(phone),type:this.props.type})
    }

    resposeGoogle = response => {
        const res={...response.profileObj, type:this.props.type}
        this.props.afterAuth(res)
    }
    render(){
        console.log(this.props.type)
        const type= this.props.type
        return(
            <div>
                <div className="container-fluid  my-5" id='regForm'>
                    <div className='row justify-content-center border'>  
                        <div className='text-center col-12' style={{width:400}}>
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
                                > 
                                {/*  */}
                                <Link to={`/${type}/login`}>Sign In</Link>
                                </span> 
                            </small>
                        </div> 
                        {/**************************registration Form*************************  */}
                        <div className='border m-2 p-2' style={{width:350}}>
                            <form onSubmit={this.handleSubmit}>
                                {/* Name */}
                                <div className="form-group">
                                        <input 
                                            type="name" 
                                            className="form-control" 
                                            aria-describedby="emailHelp"
                                            name='name'
                                            placeholder='User name'
                                            autoComplete='off'
                                            onChange={this.handleChange} 
                                        />
                                </div>
                                {/* Email */}
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
                                {/* password */}
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
                                {/* mobile Number */}
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        aria-describedby="mobileHelp"
                                        name='phone'
                                        placeholder='Mobile number'
                                        autoComplete='off'
                                        onChange={this.handleChange} 
                                    />
                                </div>
                                {/* forget password */}
                                <div className="text-info">
                                    {/* <Link to='/forget'> */}
                                        <p> Forget password? </p>
                                    {/* </Link> */}
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
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
        type:state.reducerAuth.reg_type
    }
}
const mapDispatchProps=dispatch=>{
    return{
        postReg: payload=>dispatch(postReg(payload)),
        afterAuth: payload => dispatch(afterAuth(payload))
    }
}
export default connect(mapStateToProps, mapDispatchProps) (Registation)