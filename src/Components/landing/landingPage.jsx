import React from 'react';
import {connect} from 'react-redux';
import Vocation from '../common/Vacation';
import FrontSearch  from '../FrontSearch/FrontSearch';

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
            <div style={{background:'#ececec'}}>
                {/* 1.Front Search */}
                <FrontSearch />
                {/* 2.Vocation Component */}
                <Vocation />
                {/* 3. Rental Data Rendering part */}
                <div className='container'>
                    <p className='h2 font-weight-light px-2'> Top vacation rental destinations</p>
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
                {/* Expert advice, great travel ideas */}
                <div className='container my-5'>
                    <div className='row'>
                        {/* Expert advice */}
                        <div className='col-4 ' >
                            <div className='border bg-white my-3' style={{height:'400px'}}>
                                <div className='border m-5 p-3 border-info'>
                                    <p className='text-'>
                                    Expert advice, great travel ideas
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                        <div className='border bg-white my-3' style={{height:'400px'}}>
                                sree
                            </div>
                        </div>
                        <div className='col-4'>
                        <div className='border bg-white my-3' style={{height:'400px'}}>
                                sree
                            </div>
                        </div>
                    </div>

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