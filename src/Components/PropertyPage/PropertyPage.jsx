import React from 'react'
import { connect } from 'react-redux'
import { getPropertyData } from '../../redux/Common/action'
import { afterPropData, getRecommendations } from '../../redux/PropertyDetails/action'
// import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import { Dropdown, Button, ButtonGroup, Form, FormCheck } from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
// import '@brainhubeu/react-carousel/lib/style.css';
import { faDivide } from '@fortawesome/free-solid-svg-icons'
import GoogleLogin from 'react-google-login';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import * as Icons from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

class PropertyPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoading: 0,
            people: 1,
            adult: 1,
            child: 0,
            startDate:new Date(),
            endDate:'',
            toggle:false
        }

    }
    handleBooking = () => {
        this.props.history.push(`/results/booking/${this.props.match.params.id}`)
    }
    //Axios call for 
    componentDidMount() {
        this.props.afterPropData(this.props.match.params)
        this.props.getRecommendations(this.props.match.params)
    }
    componentDidUpdate = () => {
        console.log(`startDate: ${this.state.startDate}
        endData: ${this.state.endDate}`)
    }
     // handle date
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
    adultInc = () => {

        this.setState({
            adult: this.state.adult + 1,
            people: this.state.people + 1
        })
        console.log(this.state.adult)
    }
    adultDec = () => {
        if (this.state.adult > 1) {

            this.setState({
                adult: this.state.adult - 1,
                people: this.state.people - 1
            })
            console.log(this.state.adult)
        }
    }
    childInc = () => {
        this.setState({
            child: this.state.child + 1,
            people: this.state.people + 1
        })
        console.log(this.state.child)
    }
    childDec = () => {
        if (this.state.child > 0) {

            this.setState({
                child: this.state.child - 1,
                people: this.state.people - 1
            })
            console.log(this.state.child)
        }
    }
     
    render() {
        const {toggle}= this.state
        const responsive = {
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 5,
                slidesToSlide: 1 // optional, default to 1.
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
                slidesToSlide: 2 // optional, default to 1.
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1 // optional, default to 1.
            }
        };
        //took data from props reducer
        const data = this.props.data
        const dataR = this.props.recom
        console.log(data, dataR)
        var recData
        if (Object.keys(dataR).length != 0) {
            recData = dataR.data
            console.log(recData)
        }

        // this if condition checks the data isloaded or not

        //this variables are defines outside because of axios post call
        //this if condition is to check whether the page loaded and do all the calculations after  that
        let amenities, dispAmenitites, property, suitability, owner, review, i, tot, avg, obj, a, obj_percent
        if (Object.keys(data).length != 0) {
            amenities = data.property_amenities[0]
            console.log("amenities")
            console.log(data.property_amenities[0])
            dispAmenitites = []
            for (var key in amenities) {
                if (amenities[key] == "true") {
                    dispAmenitites.push(key)
                }
            }
            property = data.property_data
            suitability = data.property_suitability
            owner = data.property_owner
            review = data.property_review
            tot = 0
            obj = [{ "0": 0 }, { "1": 0 }, { "2": 0 }, { "3": 0 }, { "4": 0 }, { "5": 0 }]
            review.map(item => {
                tot += item.rating
                console.log(item.rating)
                if (item.rating == 0) {
                    obj[0][0]++
                }
                if (item.rating == 1) {
                    obj[1][1]++
                }
                if (item.rating == 2) {
                    obj[2][2]++
                }
                if (item.rating == 3) {
                    obj[3][3]++
                }
                if (item.rating == 4) {
                    obj[4][4]++
                }
                if (item.rating == 5) {
                    obj[5][5]++
                }

            })

            // console.log(obj)
            avg = Math.floor(tot / review.length)

            obj_percent = [
                { "0": Math.ceil((obj[0][0] / review.length) * 100) },
                { "1": Math.ceil((obj[1][1] / review.length) * 100) },
                { "2": Math.ceil((obj[2][2] / review.length) * 100) },
                { "3": Math.ceil((obj[3][3] / review.length) * 100) },
                { "4": Math.ceil((obj[4][4] / review.length) * 100) },
                { "5": Math.ceil((obj[5][5] / review.length) * 100) }
            ]
            a = []
            for (let j = 0; j <= 5; j++) {
                a.push(Math.floor(obj_percent[j][j] * 80 / 100) + "px")
            }
        }

        console.log(a, avg)
        return (
            Object.keys(data).length != 0 ?
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 " >
                                <Carousel
                                    swipeable={false}
                                    draggable={false}
                                    showDots={false}
                                    responsive={responsive}
                                    ssr={false} // means to render carousel on server-side.
                                    infinite={true}
                                    autoPlay={false}
                                    autoPlaySpeed={0}
                                    keyBoardControl={true}
                                    customTransition="all 1"
                                    transitionDuration={1000}
                                    containerclassName="carousel-container"
                                    removeArrowOnDeviceType={["tablet", "mobile"]}
                                    deviceType={this.props.desktop}
                                    dotListclassName="custom-dot-list-style"
                                    itemclassName="carousel-item-padding-100-px"
                                >
                                    <img src={property[0].image_a} />
                                    <img src={property[0].image_b} />
                                    <img src={property[0].image_c} />
                                    <img src={property[0].image_d} />
                                    <img src={property[0].image_a} />
                                </Carousel>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 container">
                        <div className="row">
                            <div className="col-xl-8 pb-5 pt-5 col-md-12" >
                                <nav id="navbar-example2" className="navbar navbar-light bg-light sticky-top">
                                    <ul className="nav nav-pills active">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#Description.">Description</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#Map">Maps</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#Availability">Availablity</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#Reviews">Reviews</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#FAQs">FAQs</a>
                                        </li>
                                    </ul>
                                </nav>
                                <ul data-spy="scroll" data-target="#navbar-example2" data-offset="0" className="list-group list-group-flush">
                                    {/* property name */}
                                    <li id="Description." className="list-group-item">
                                        <p className="mb-0" style={{fontSize:30}}>The Perfect gateway for family an friends in</p>
                                        <p style={{fontSize:30}}>{property[0].name}</p>
                                    </li>
                                    <li id="Description" className="list-group-item ml-0 pl-0">
                                        <div className="mb-4">
                                            <span className="badge badge-pill badge-light p-3 mr-5" style={{background:"#f5f8f9"}}>
                                                <strong> <Icons.House size={20}/>{property[0].type}</strong></span>
                                            <span className="badge badge-pill badge-light p-3 mr-5" style={{background:"#f5f8f9"}}>
                                                <Icons.DashSquare size={20}/>
                                                <strong>{property[0].bed} Bedroom </strong></span>
                                            <span className="badge badge-pill badge-light p-3 mr-5" style={{background:"#f5f8f9"}}>
                                                <strong> <Icons.People size={20}/> Sleeps {property[0].no_people}  </strong></span>
                                            <span className="badge badge-pill badge-light p-3 mr-5" style={{background:"#f5f8f9"}}>
                                                <strong><Icons.Calendar4 size={20}/> 7 days</strong></span>
                                        </div>
                                        {/* BOOK WITH CONFIDENCE */}
                                        <div className="mb-4">
                                            <p className="h5" style={{color:'#00af87'}}>
                                                BOOK WITH CONFIDENCE.
                                            </p>
                                            {/* redirect to help page */}
                                            {/* <Link to='/'> */}
                                            <p className=""style={{color:'#00af87'}}>
                                                Pay on FlipKey to get Payment Protection for this rental. Never pay by bank or wire transfer.
                                            </p>
                                            {/* </Link> */}
                                        </div>
                                    </li>
                                        {/* Key info */}
                                        <div className="mb-4">
                                            <p style={{fontWeight:600}} >
                                                KEY INFO
                                            </p>
                                            <div className='container'>
                                                <div className="row justify-contnent-between">
                                                    <div className='col-6'>
                                                        <Icons.CheckCircle size={15} className='mx-2'/> 
                                                        {dispAmenitites[0]}
                                                    </div>
                                                    <div className='col-6'>
                                                        <Icons.CheckCircle size={15} className='mx-2'/> 
                                                        {dispAmenitites[5]}
                                                    </div>
                                                </div>
                                            </div>
                                            {suitability[0].parking && suitability[0].elevator ? 
                                                <div className='container'>
                                                    <div className="row justify-contnent-between">
                                                    <div className='col-6'>
                                                        <Icons.CheckCircle size={15} className='mx-2'/>
                                                        Parking Available
                                                    </div>
                                                    <div className='col-6'>
                                                        <Icons.CheckCircle size={15} className='mx-2'/>
                                                        Elevator Available
                                                    </div>
                                                    </div>
                                                </div> 
                                                : suitability[0].parking && suitability[0].wheelchair ?
                                                    <div className='container'>
                                                        <div className="row justify-contnent-between">
                                                        <div className='col-6'>
                                                            <Icons.CheckCircle size={15} className='mx-2' />
                                                            Parking Available
                                                        </div>
                                                        <div className='col-6'> 
                                                            <Icons.CheckCircle size={15} className='mx-2'/>
                                                            wheelchair
                                                        </div>
                                                        </div>
                                                    </div> 
                                                    : suitability[0].parking ? 
                                                        <div className='container'>
                                                            <div className="row justify-contnent-between">
                                                            <div className='col-6'><Icons.CheckCircle size={15} className='mx-2'/>Parking Available</div>
                                                            <div className='col-6'><Icons.XCircle size={15} className='mx-2'/> No wheel chair</div>
                                                            </div>
                                                        </div> 
                                                        : 
                                                        <div className='container'>
                                                            <div className="row justify-contnent-between">
                                                            <div className='col-6'><Icons.XCircle size={15} className='mx-2'/>Parking Not Available</div>
                                                            <div className='col-6'><Icons.XCircle size={15} className='mx-2'/> No wheel chair</div>
                                                            </div>
                                                        </div>
                                            }
                                        </div>
                                        {/* Description of the owner */}
                                    <li id="Description" className="list-group-item ml-0 pl-0">
                                        <div>
                                            <p className="mb-2 lead" style={{fontWeight:400}}>Description from owner</p>
                                            <p className='text-muted' style={{fontSize:15}}>
                                                This one-bedroom deluxe King Bed Villa is adjacent to the Great Smoky Mountain National
                                                Park.It exquisitely decorated and accommodates 4 guest comfortably (780 square feet) .
                                                This villa is in the heart of the Smoky Mountains. The resort has so much to offer. Some
                                                of the most popular attractions at the resort include Wild Bear Falls (the indoor
                                                waterpark), award winning restaurants, Serenity Spa and horse back riding! Your stay at
                                                the resort is sure to be an unforgettable vacation!
                                            </p>
                                        </div>
                                    </li>
                                    {/* Families */}
                                    <li id="Description" className="list-group-item ml-0 pl-0">
                                       <p style={{fontWeight:600}} >FAMILIES</p>
                                        <div className='container'>
                                            <div className="row justify-contnent-between">
                                                <div className='col-6'>
                                                    {suitability[0].children ? 
                                                    <div> <Icons.CheckCircle size={15} className='mx-2'/>
                                                        Great place for children 
                                                    </div>
                                                    : <div> <Icons.XCircle size={15} className='mx-2' />Not suitablefor children</div>
                                                    }
                                                </div>
                                                <div className='col-6'>
                                                {suitability[0].pets ? 
                                                <div><Icons.CheckCircle  size={15} className='mx-2'/>
                                                Pets are allowed </div>
                                                : <div> <Icons.XCircle size={15} className='mx-2'/>No pets allowed</div>
                                                }
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    {/* Beds and Bathrooms */}
                                    <li id="Description" className="list-group-item ml-0 pl-0">
                                        <p style={{fontWeight:600}}>BED & BATHROOM</p>
                                        <div className='container'>
                                            <div className="row justify-contnent-between">
                                                <div className='col-6'>
                                                    <Icons.CheckCircle size={15} className='mx-2' />{property[0].bed} Beds Available
                                                </div>
                                                <div className='col-6'>
                                                    <Icons.CheckCircle size={15} className='mx-2' />{property[0].bath} Beds Available
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    {/* amenities */}
                                    <li id="Description" className="list-group-item ml-0 pl-0">
                                       <p style={{fontWeight:600}}>AMENITIES</p>
                                        <div className='container'>
                                            <div className="row justify-contnent-between">
                                            {
                                                dispAmenitites.map((item, ind) => (
                                                <div className='col-6' key={ind}>
                                                    {item}
                                                </div>
                                                ))
                                            }
                                            </div>
                                        </div>
                                    </li>
                                    {/* Access */}
                                    <li id="Description" className="list-group-item ml-0 pl-0">
                                        <h4 className="mb-2">Access</h4>
                                        {
                                        suitability[0].parking && suitability[0].elevator ? 
                                        <div className='container'>
                                            <div className="row justify-contnent-between">
                                                <div className='col-6'>
                                                    <Icons.CheckCircle size={15} className='mx-2'/> Parking Available
                                                </div>
                                                <div className='col-6'>
                                                    <Icons.CheckCircle size={15} className='mx-2'/>
                                                    Elevator Available
                                                </div>
                                            </div>
                                        </div> 
                                        : suitability[0].parking && suitability[0].wheelchair ? 
                                        <div className='container'>
                                            <div className='col-6'> <Icons.XCircle size={15} className='mx-2'/>Parking Available</div>
                                            <div className='col-6'><Icons.XCircle size={15} className='mx-2'/> wheelchair</div>
                                        </div> 
                                        : suitability[0].parking ? 
                                        <div className='container'>
                                            <div className='col-6'> <Icons.XCircle size={15} className='mx-2'/>Parking Available</div>
                                            <div className='col-6'> No wheel chair</div>
                                        </div> 
                                        : <div className='container'>
                                            <div className="col-6"> <Icons.CheckCircle size={15} className='mx-2'/>Parking Not Available</div>
                                            <div className="col-6"><Icons.CheckCircle size={15} className='mx-2'/> No wheel chair</div>
                                        </div>
                                        }
                                    </li>
                                    <li id="Description" className="list-group-item ml-0 pl-0">
                                        <h5>
                                            Check in time: Anytime
                                        </h5>
                                        <div>
                                            <h4>Payment</h4>
                                            <p className="ml-5">
                                                This rental can only be paid for online through FlipKey using your credit/debit card or
                                                PayPal (never by bank or wire transfer).
                                            </p>
                                            <p className="ml-5">Damage deposit: $200.00</p>
                                        </div>
                                        <div>
                                            <h4>Smoking</h4>
                                            {
                                            suitability[0].smoke ? <p className="ml-5">Accesss to smoke</p> : <p className="ml-5">No
                                                smoking at this property</p>
                                            }
                                        </div>
                                    </li>
                                    <li id="Description" className="list-group-item ml-0 pl-0">
                                        <p>Need to create the cancellation component</p>
                                    </li>
                                    <li id="Description" className="list-group-item ml-0 pl-0">
                                        <h4 className="mb-2">About the owner</h4>

                                        <p><strong>{owner[0].name}</strong></p>
                                        <p>Response Rate:{owner[0].response_rate}</p>
                                        <p>Years listed : {owner[0].year_listed}</p>
                                        <p>Contact Info: {owner[0].phone}</p>
                                        {owner[0].english?<p>Languages Spoken: English</p>:<p>Languages Spoken: Native</p>}

                                    </li>
                                    <li id="Map" className="list-group-item ml-0 pl-0">
                                        <h4 className="mb-2">Map Integration</h4>

                                    </li>
                                    <li id="Availablitiy" className="list-group-item ml-0 pl-0">
                                        <p>One year calender integration</p>
                                    </li>
                                    <li className="list-group-item ml-0 pl-0">
                                        <h4 className="mb-2">Reviews </h4>
                                        {
                                        avg >= 4?<p>Very Good based on {tot} reviews</p>:
                                        avg >= 3?<p>Good based on {tot} reviews</p>:
                                        avg >= 2?<p>Average based on {tot} reviews</p>:
                                        <p>Worst based on {tot} reviews</p>
                                        }
                                    </li>
                                    <li id="Reviews" className="list-group-item ml-0 pl-0">
                                        <div>
                                            <span className='p-5'>Excellent</span>
                                            <span>
                                                <div
                                                    style={{ height: "20px", width: "80px", backgroundColor: "grey",border:"1px solid black",borderRadius:"5px" }}>
                                                    <div style={{ height: "20px", width: a[5], backgroundColor: "green" }}></div>
                                                </div>
                                            </span>
                                            <span>{obj[5][5]}</span>
                                        </div>
                                        <div>
                                            <span className='p-5'>Very Good</span>
                                            <span>
                                                <div
                                                    style={{ height: "20px", width: "80px", backgroundColor: "grey",border:"1px solid black",borderRadius:"5px" }}>
                                                    <div style={{ height: "20px",  width: a[4], backgroundColor: "green" }}></div>
                                                </div>
                                            </span>
                                            <span>{obj[4][4]}</span>
                                        </div>
                                        <div>
                                            <span className='p-5'>Average</span>
                                            <span>
                                                <div
                                                    style={{ height: "20px", width: "80px", backgroundColor: "grey",border:"1px solid black",borderRadius:"5px" }}>
                                                    <div style={{ height: "20px",  width: a[3], backgroundColor: "green" }}></div>
                                                </div>
                                            </span>
                                            <span>{obj[3][3]}</span>
                                        </div>
                                        <div>
                                            <span className='p-5'>Poor</span>
                                            <span>
                                                <div
                                                    style={{ height: "20px", width: "80px", backgroundColor: "grey",border:"1px solid black",borderRadius:"5px" }}>
                                                    <div style={{ height: "20px",  width: a[2], backgroundColor: "green" }}></div>
                                                </div>
                                            </span>
                                            <span>{obj[2][2]}</span>
                                        </div>
                                        <div>
                                            <span className='p-5'>Terrible</span>
                                            <span>
                                                <div
                                                    style={{ height: "20px", width: "80px", backgroundColor: "grey",border:"1px solid black",borderRadius:"5px" }}>
                                                    <div style={{ height: "20px",  width: a[1], backgroundColor: "green" }}></div>
                                                </div>
                                            </span>
                                            <span>{obj[1][1]}</span>
                                        </div>
                                    </li>
                                    {
                                        review.map(item => 
                                            (
                                                <li className="list-group-item">
                                                    <div>
                                                        <span style={{height:"30px" ,width:"30px",borderRadius:"50%", border:"1px solid black"}}>

                                                        </span>
                                                        <span>
                                                            <h4>{item.title}</h4>

                                                        </span>
                                                    </div>
                                                    <div className="mb-3 mr-2">
                                                        <span className="mb-3">
                                                            Ratings: {item.rating}
                                                        </span>
                                                        <span className="mb-3">
                                                            Reviewed {item.rev_date}
                                                        </span>
                                                    </div>
                                                    <p>
                                                        {item.review}
                                                    </p>
                                                </li>
                                            )
                                        )
                                    }
                                    <li id="FAQs" className="list-group-item">
                                        <p>FAQ</p>
                                    </li>
                                    <li>
                                        Recommended for you
                                    </li>
                                    <li className="list-group-item">
                                        <h4 className="mb-2">
                                            Build your perfect trip, with Flipkey & TripAdvisor</h4>

                                        <p className="pl-5">Build the sttaic component </p>
                                        <p className="pl-5 text-muted">Pay Online to be covered by payment protection </p>
                                        <p className="pl-5">Real opinions real reviews</p>
                                        <p className="pl-5 text-muted">Genuine guest feedback from 100,000+ reviews </p>
                                        <p className="pl-5">Safe, simple, secure</p>
                                        <p className="pl-5 text-muted">When you pay online with PayPal or by credit/debit card </p>
                                        <p className="pl-5">Quick response times </p>
                                        <p className="pl-5 text-muted">Know where you're staying within 24 hours </p>

                                    </li>
                                    <li className="list-group-item">
                                        <p>
                                            Also Consider
                                        </p>
                                    </li>
                                    <li className="list-group-item">
                                        This listing is created and maintained by the homeThis listing is created and maintained by the
                                        homeowner; we can only publish adverts in good faith as we don't own, manage or inspect any of
                                        the properties. We advise you to familiarize yourself with our terms of use.owner; we can only
                                        publish adverts in good faith as we don't own, manage or inspect any of the properties. We
                                        advise you to familiarize yourself with our terms of use.
                                    </li>
                                </ul>
                            </div>
                            {/* ***********************PriceForm************************ */}
                            <div className="col-4 pl-5 pr-0 mt-5 d-none d-xl-block d-md-none">
                                <div className="card bg-light my-5 mr-0 pr-0 sticky-top border" style={{right:0}}>
                                    <div className="ml-2">
                                        <small className=''>Total Cost</small>
                                        <h2 style={{fontWeight:600}}>${property[0].price}</h2>
                                    </div>
                                    <div className="p-2">
                                        <div className="" style={{background: "#f5f8f9"}}>
                                            {/* Date: from Month and to Month */}
                                            <div className="row px-0 mx-0">
                                                {/* startDate */}
                                                <div className='col-6 p-0 m-0'>
                                                        <DatePicker
                                                            className='border col p-2 '
                                                            placeholderText='Start Date'
                                                            selected={this.state.startDate}
                                                            onChange={this.handleStartDate}
                                                            selectsStart
                                                            startDate={this.state.startDate}
                                                            endDate={this.state.endDate}
                                                            // monthsShown={2}
                                                        />
                                                    </div>
                                                {/* fromDate */}
                                                <div className='col-6 p-0 m-0'>
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
                                            </div>
                                            {/* Guests edit dropdown */}
                                            <div className="row mt-2 mx-0 bg-white">
                                                    <div className='col btn-block border m-0 p-0'>
                                                        <Dropdown variant='white' className='rounded-0'>
                                                            <DropdownToggle variant='white' className='rounded-0 w-100 m-0'>
                                                                <Button variant='white' className='p-0 m-0 w-100'>
                                                                    {this.state.people} guests
                                                                </Button>
                                                            </DropdownToggle>
                                                            <DropdownMenu alignRight>
                                                                {/* adult */}
                                                                <div style={{ width: "180px" }} className='mx-3'>
                                                                    <div className='row p-1'>
                                                                        <div className=' col-6 text-right px-2 lead'>
                                                                            Adults
                                                                        </div>
                                                                        <div className='col-6'>
                                                                            <div className='row  border border-muted'>
                                                                                <div className='col-4  m-0 p-0'>
                                                                                    <Button
                                                                                        className='lead font-weight-bold p-1 m-0 btn-block btn-light rounded-0' onClick={this.adultDec}>
                                                                                        -
                                                                                    </Button>
                                                                                </div>
                                                                                <div className='col-4 m-0 p-1'>
                                                                                    <div className='text-center'> 
                                                                                        {this.state.adult}
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col-4  m-0 p-0 text-center'>
                                                                                    <Button
                                                                                        className='lead font-weight-bold p-1 m-0 btn-block btn-light rounded-0'onClick={this.adultInc}>
                                                                                        +
                                                                                    </Button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {/* children */}
                                                                    <div className='row p-1'>
                                                                        <div className=' col-6 text-right px-2'>
                                                                            <div className='row'>
                                                                                <div className='col-12 lead my-0 py-0'>
                                                                                    Children
                                                                                </div>
                                                                                <div className='col-12 my-0 py-0'>
                                                                                    <small className='m-0 p-0'>age 0-16</small>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='col-6'>
                                                                            <div className='row  border border-muted'>
                                                                                <div className='col-4  m-0 p-0'>
                                                                                    <Button
                                                                                        className='lead font-weight-bold p-1 m-0 btn-block btn-light rounded-0' onClick={this.childDec}>
                                                                                        -
                                                                                    </Button>
                                                                                </div>
                                                                                <div className='col-4 m-0 p-1'>
                                                                                    <div className='text-center'>
                                                                                        {this.state.child}
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col-4  m-0 p-0 text-center'>
                                                                                    <Button
                                                                                        className='lead font-weight-bold p-1 m-0 btn-block btn-light rounded-0' onClick={this.childInc}>
                                                                                        +
                                                                                    </Button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                            <div className="py-2 my-2">
                                                {/* 1.toggle dropdown */}
                                                {toggle ? (
                                                    <div className="w-100 ">
                                                    <div className="row justify-content-between px-3">
                                                        <div className="">
                                                        <div className="small">Rate for 4 nights</div>
                                                        <div className="small">
                                                            Tax{" "}
                                                            <span className="bg-secondary rounded-circle px-1">
                                                            ?
                                                            </span>
                                                        </div>
                                                        <div className="small">
                                                            Booking fee{" "}
                                                            <span className="bg-secondary rounded-circle px-1">
                                                            ?
                                                            </span>
                                                        </div>
                                                        <div className="small">
                                                            Owner fees{" "}
                                                            <span className="bg-secondary rounded-circle px-1">
                                                            ?
                                                            </span>
                                                        </div>
                                                        </div>
                                                        <div className="">
                                                        <div className="small">$768</div>
                                                        <div className="small text-right">$78</div>
                                                        <div className="small text-right">$60</div>
                                                        <div className="small text-right">$60</div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                {/* Total  */}
                                                <div className="row justify-content-between px-3">
                                                    <div className="lead">Total</div>
                                                    <div className="lead">${property[0].price}</div>
                                                </div>
                                                {/* 2.toggle dropdown */}
                                                {toggle ? (
                                                    <div className="w-100 ">
                                                    <div className="row justify-content-between px-3">
                                                        <div className="">
                                                        <div className="small">Refundable damage deposit</div>
                                                        <div className="small">
                                                            Total + Deposit
                                                        </div>
                                                        </div>
                                                        <div className="">
                                                        <div className="small">$768</div>
                                                        <div className="small text-right">$78</div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                {/* show details toggle */}
                                                <div className="row justify-content-between px-3">
                                                    <div className="small text-muted">No Hidden Fees</div>
                                                    <div
                                                        className="small text-info"
                                                        onClick={() =>
                                                            this.setState({ toggle: !this.state.toggle})
                                                        }
                                                    >
                                                        {this.state.toggle?'Hide details':'Show details'}
                                                    </div>
                                                </div>
                                                {/* Book now button */}
                                                <button className="btn btn-info btn-block font-weight-bold mt-3" onClick={this.handleBooking}>
                                                    Book now
                                                </button>
                                                {/* Contact owner  */}
                                                <button className="btn btn-outline-secondary btn-block font-weight-bold">
                                                    Contact owner
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-success text-center pb-3 px-2" style={{fontSize:15}}>
                                        Book online with Payment Protection
                                    </div>
                                </div>
                            </div>                            
                            {/* <div className="row">
                                <div className="col-12">
                                    <p>import Vocation and the footer</p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            : 
            <div>Loading</div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // data: statefined.reducerCommon.primaryData
        data: state.reducerPropertyDetails.primaryData,
        recom: state.reducerPropertyDetails.recomDetails
    }

}

const mapDispatchToProps = dispatch => {
    // return {
    // // getPropertyData: payload => dispatch(getPropertyData(payload))
    // }

    return {
        afterPropData: payload => dispatch(afterPropData(payload)),
        getRecommendations: payload => dispatch(getRecommendations(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyPage)