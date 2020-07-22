import React from 'react'
import {connect} from 'react-redux'
import {userValidation, posReg} from '../../redux/Auth/action'
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
        
        this.props.posReg({email:email, password:password,name:name, phone:Number(phone),type:this.props.login_type})
    }
    render(){
        console.log(this.props.login_type)
        return(
            <div>
                {/*registration page  */}
                <div className=' col-12 col-xl-12 border m-2 p-2' style={{width:350}}>
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
                                name='phone'
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
const mapStateToProps=(state)=>{
    return{
        // login_type: state.login_type,
        login_type:state.reducerAuth.login_type
    }
}
const mapDispatchProps=dispatch=>{
    return{
        userValidation: payload=>dispatch(userValidation(payload)),
        posReg: payload=>dispatch(posReg(payload))
    }
}
export default connect(mapStateToProps, mapDispatchProps) (Registation)