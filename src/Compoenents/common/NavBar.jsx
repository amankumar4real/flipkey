import React from 'react';
import {connect} from 'react-redux'
import {changeType} from '../../redux/Auth/action'
import {Link} from "react-router-dom"

class NavBar extends React.Component{
    constructor(props){
        super(props)
        this.state={
            type:''
        }
    }
    handleOwner=()=>{
        this.props.changeType("owner")

    }

    handleUser=()=>{
        this.props.changeType('user')
    }

    render(){
        return(
            <div className='m-5'>
                <div>
                    <button className='btn' onClick={this.handleOwner}><Link to="/owner/login">Owner</Link></button>
                </div>
                <div>
                    <button className='btn' onClick={this.handleUser}><Link to="/user/login">User</Link></button>
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
export default connect(null, mapDispatchToProps)(NavBar)