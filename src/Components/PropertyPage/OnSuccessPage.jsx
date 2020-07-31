import React from 'react'
import { connect } from 'react-redux'



class onSuccessPage extends React.Component{
    constructor(props){
        super(props)
        this.state =  {}
    }

    render(){
        return (
            <div className="container-fluid w-25 justify-content" style={{height:"500px", width:"500px", backgroundColor:"cyan"}}>
                Payment : {this.props.price} 
                <br/>
                Succcessfull
                <br/>
                Enjoy your Vocation and keep booking
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // data: statefined.reducerCommon.primaryData
        price: state.reducerPropertyDetails.total_price
    }
}


export default connect(mapStateToProps)(onSuccessPage)