import React from 'react'
import {connect} from 'react-redux'
import Vacation from '../common/Vacation'
import {posReg} from '../../redux/Auth/action'
import {Link} from 'react-router-dom'
class Registation extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:''
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
            type: this.state.type
        }
        this.props.postLogin(loginData)
    }
    render(){
        return(
            <div>
                {/*registration page  */}
                <div className=' col-12 border m-2 p-2' style={{width:350}}>
                    <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                            <input 
                                type="name" 
                                className="form-control" 
                                aria-describedby="emailHelp"
                                name='name'
                                placeholder='user name'
                                autoComplete='off'
                                onChange={this.handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                aria-describedby="emailHelp"
                                name='mobile'
                                placeholder='mobile number'
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
                        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                    </form>
                </div> 
            </div>
        )
    }
}
export default Registation