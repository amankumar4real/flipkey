import React from 'react';
import {connect} from 'react-redux';
import Vocation from '../common/Vacation';
import {changeText} from "../../redux/LandingPage/action"

class LandingPage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            page:'',
            inp:""
        }
    }

    handleClick = () => {
        this.props.changeText(this.state.inp)
        this.props.history.push(`/results?people=1&price=50&beds=1&place=${this.state.inp}`)
    }

    handleChange = (event) => {
        this.setState({
            inp: event.target.value
        })
    }

    render(){
        const {rentalData}=this.props
        console.log(rentalData)
        return(
            <div style={{background:'#ececec'}}>
                {/* 1.Front Search */}
                <div key="search">
                <div className="container-fluid" style={{
                    backgroundImage: "url('https://images.hdqwalls.com/download/trees-fall-reflection-autumn-4k-hb-2880x1800.jpg')", backgroundRepeat: "no-repeat",
                    backgroundSize: "cover", height: "400px"
                }}>
                    <div className='container py-5'>
                        <div className='container my-5 py-5'>
                            <div className='h1 text-white text-center'>
                                Find the perfect vacation rental
                                    </div>
                            <div className="col-12 p-1">
                                <div className="row mx-auto" >
                                    <input onChange={this.handleChange} placeholder="Where do you want to go?" className="form-control col-6" />
                                    <input type="date" className="form-control col-2" />
                                    <input type="date" className="form-control col-2" />
                                    <button className="form-control col-2 btn btn-warning text-light" onClick={this.handleClick}>Search</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

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

const mapDispatchToProps = dispatch => {
    return {
        changeText: payload => dispatch(changeText(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (LandingPage)