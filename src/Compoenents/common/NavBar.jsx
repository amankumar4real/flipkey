import React from 'react';
import {connect} from 'react-redux'
import {changeType} from '../../redux/Auth/action'
class NavBar extends React.Component{
    constructor(props){
        super(props)
        this.state={
            type:''
        }
    }
    handleOwner=()=>{
        // this.setState({
        //     type:'owner'
        // })
        // console.log(this.state.type)
        this.props.changeType("owner")
    }
    handleUser=()=>{
        // this.setState({
        //     type:'user'
        // })
        this.props.changeType('user')
        // console.log(this.state.type)
    }
    render(){
        return(
            <div className='m-5'>
                <div>
                    <button className='btn-success' onClick={this.handleOwner}> Owner </button>
                </div>
                <div>
                    <button className='btn-danger' onClick={this.handleUser}> User </button>
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