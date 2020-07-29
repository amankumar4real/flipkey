import React from 'react';
import {connect} from 'react-redux';
import Vocation from '../common/Vacation';
import {changeText} from "../../redux/LandingPage/action";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

class LandingPage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            page:'',
            inp:"",
            startDate: new Date(),
            endDate:''
        }
    }
    componentDidUpdate(){
        console.log(this.state)
    }
    handleStartDate = date => {
        this.setState({
          startDate: date
        });
      };
    handleEndDate = date => {
      this.setState({
        endDate: date
      });
    };

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
                            <div className="col-12 p-1" style={{background:"#b7c1cb", borderRadius:5}}>
                                <div className="row m-1" >
                                        <input 
                                            onChange={this.handleChange} 
                                            placeholder="Where do you want to go?" 
                                            className="border col-6" 
                                        />
                                    <div className='col-6'>
                                        <div className='row'> 
                                            <div className='col-4 p-0 m-0'>
                                                <DatePicker
                                                    className='border p-2 '
                                                    placeholderText='Start Date'
                                                    selected={this.state.startDate}
                                                    onChange={this.handleStartDate}
                                                    selectsStart
                                                    startDate={this.state.startDate}
                                                    endDate={this.state.endDate}
                                                    
                                                    // monthsShown={2}
                                                />
                                            </div>
                                            <div className='col-4 p-0 m-0'>
                                                <DatePicker
                                                    className='border col p-2'
                                                    placeholderText='End Date'
                                                    selected={this.state.endDate}
                                                    onChange={this.handleEndDate}
                                                    selectsEnd
                                                    startDate={this.state.startDate}
                                                    endDate={this.state.endDate}
                                                    mindDate={this.state.startDate}
                                                    // monthsShown={2}  
                                                />
                                            </div>
                                            <button className="border btn btn-warning btn-block text-light col-4" onClick={this.handleClick}>Search</button>
                                        </div>
                                    </div>
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
                        rentalData?.map((item, ind)=>
                            (
                                <div className='text-center' key={ind}>
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
                                
                            </div>
                        </div>
                        <div className='col-4'>
                        <div className='border bg-white my-3' style={{height:'400px'}}>
                               
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