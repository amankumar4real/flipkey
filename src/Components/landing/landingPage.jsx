import React from 'react';
import {connect} from 'react-redux';
import Vocation from '../common/Vacation';
import {changeText} from "../../redux/LandingPage/action";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import styles from '../landing/landing.module.css';
import Footer from '../common/footer/footer';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
  } from "react-places-autocomplete";
import {Link} from 'react-router-dom';
import PropertyListStatic from '../PropertyPage/PropertyListStatic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../fontAwesome/fontAwesome';
class LandingPage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            page:'',
            inp:"",
            startDate: new Date(),
            endDate: new Date(),
            coordinates: {lat: "12.9715987", lng: "77.5945627"},
            address:""
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
        this.props.history.push(`/results?people=1&price=10&beds=1&lat=${this.state.coordinates.lat}&lng=${this.state.coordinates.lng}&sortby=relevence`)
    }

    handleChange = (event) => {
        this.setState({
            inp: event.target.value
        })
    }
    handleSearch=(name)=>{
        console.log(name)
    }

    handleSelect = async value => {
            const results = await geocodeByAddress(value);
            const latLng = await getLatLng(results[0]);
            this.setState({
                address: value,
                coordinates: latLng
            })
          }

    changePlaces = address => {
        this.setState({ address });
        }


    render(){
        const {rentalData}=this.props
        
        
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
                            <div className='h1 text-white text-center' style={{fontWeight:400, fontFamily:'Arial'}}>
                                Find the perfect vacation rental
                                    </div>
                            <div className="col-12 p-1" style={{background:"#b7c1cb", borderRadius:5}}>
                                <div className="row m-1" >
                                        
                                <PlacesAutocomplete
                                    value={this.state.address}
                                    onChange={this.changePlaces}
                                    onSelect={this.handleSelect}
                                    
                                >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <>
                                        
                                        <input 
                                            {...getInputProps({ placeholder: "Type address" })}
                                            // placeholder="Where do you want to go?" 
                                            className="border col-6" 
                                        />
                                        <div className={styles.box}>
                                            {loading ? <div>...loading</div> : null}

                                            {suggestions.map(suggestion => {
                                                const style = {
                                                backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                                };

                                                return (
                                                <div  {...getSuggestionItemProps(suggestion, { style })}>
                                                    {suggestion.description}
                                                </div>
                                                );
                                            })}
                                            </div>
                                    </>
                                    )}
                                </PlacesAutocomplete>

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
                                                    minDate={new Date()}
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
                                                    minDate={new Date()}
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
                <div className='container-lg d-none d-md-block'>
                    <p className='h2 font-weight-light px-2'> Top vacation rental destinations</p>
                    <div className='row border justify-content-md-center'>
                    {
                        rentalData?.map((item, ind)=>
                            (
                                // <div className='text-center my-2' key={ind}>
                                    <div className=' col-lg-4 col-md-6 col-sm-12 p-2 w-100'>
                                    <Carousel className='text-center my-2' key={ind} showArrows={true} showIndicators={false} showStatus={false} showThumbs={false}>
                                        <div>
                                                <img src={item.img} alt={item.name} width='350px' height='250px'/>
                                            <Link to={`/results?people=1&price=10&beds=1&lat=${item.lat}&lng=${item.lng}&sortby=relevence`}>
                                                <div className='legend'style={{position:'absolute', padding:'0 25px', bottom:-20}}>
                                                    <p className={styles.legend}>{item.name}</p>
                                                    <p className='pb-2'>{item.rentalCount}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    </Carousel>
                                    </div>
                                // </div>
                            )
                        )
                    }
                    </div>
                </div>
                {/* Expert advice, great travel ideas */}
                <div className='container-lg d-none d-md-block'>
                    <div className='row mb-5'>
                        {/* Expert advice */}
                        <div className='col-4 pl-0'>
                            <div className='border bg-white my-3 p-4' style={{height:'300px'}}>
                                <h4 style={{fontWeight:400,fontFamily:'Arial'}}>
                                    Expert advice, great travel ideas
                                </h4>
                                <div className='d-flex'>
                                    <FontAwesomeIcon 
                                        icon={["fas", 'chart-area']} 
                                        className='p-3 text-white'
                                        size='4x'
                                        style={{borderRadius:"50%", background:"#7fb2e0"}}
                                    />
                                    <p className='pl-3 pb-0'>Check out the FlipKey blog for travel inspiration, destinations we love, insights for owners, and so much more!</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-4 pl-0'>
                            <div className='border bg-white my-3' style={{height:'300px'}}>
                                <div className='p-4'>
                                    <h4 style={{fontWeight:400,fontFamily:'Arial'}}>
                                        Featured destination
                                    </h4>
                                    <small>See all rentals in Gettysburg</small>
                                </div>
                                <img src={rentalData[3].img} alt="alt" className='mx-0 px-0 w-100 h-50' />
                            </div>
                        </div>
                        <div className='col-4 p-0 mb-5'>
                            <div className='border bg-white my-3' style={{height:'300px'}}>
                                <h4 className="p-4" style={{fontWeight:400,fontFamily:'Arial'}}>
                                    Popular Right Now
                                </h4>
                                <div style={{height:60, background:'#efefef'}} className="my-3 d-flex">
                                    <img src={rentalData[0].img} width='90' alt='img'/>
                                    <p className='pt-3 pl-2'>Trip Ideas</p>
                                </div>
                                <div style={{height:60,background:'#efefef'}} className="d-flex my-3">
                                    <img src={rentalData[4].img} width='90' alt='img'/>
                                    <p className='pt-3 pl-2'>Rental Galleries</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* list your prop static page */}
                <PropertyListStatic />
                {/* Footer */}
                <Footer />
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