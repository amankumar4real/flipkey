import React from 'react';
import {connect} from 'react-redux';

class LandingPage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            page:''
        }
    }
    render(){
        const {rentalData}=this.props
        console.log(rentalData)
        return(
            <div className='container'>
                <p className='h2 font-weight-light'> Top vacation rental destinations</p>
                <div className='row border justify-content-md-center'>
                {
                    rentalData?.map(item=>
                        (
                        <div className='text-center'>
                            <div className=' col-lg-4 col-md-6 col-sm-12 p-2 w-100'>
                                <img src={item.img} alt={item.name} width='350px' height='250px'/>
                            </div>
                        </div>
                        )
                    )
                }
                </div>
            </div>
        )
        
    }
}
const mapStateToProps=state=>{
    return{
        rentalData: state.reducreLanding.rentalData
    }
}
export default connect(mapStateToProps, null) (LandingPage)