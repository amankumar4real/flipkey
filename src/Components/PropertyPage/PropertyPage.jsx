import React from 'react'
import { connect } from 'react-redux'
import { getPropertyData } from '../../redux/Common/action'
import { afterPropData, getRecommendations, recomData } from '../../redux/PropertyDetails/action'
// import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import { Dropdown, Button, ButtonGroup, Form, FormCheck, Table } from 'react-bootstrap';
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
            toggle:false, 
            id:null
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
    handleRecom=(newId)=>{

        // this.setState({id:newId})
        this.props.history.push(`/results/${newId}`)
        window.location.reload(false)
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
            console.log("req ata")
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
            console.log('reaviews')
            console.log(review)
            tot = 0
            obj = [{ "0": 0 }, { "1": 0 }, { "2": 0 }, { "3": 0 }, { "4": 0 }, { "5": 0 }]
            review.map((item, ind) => {
                tot += item.rating
                if (item.rating == ind) {
                    obj[ind][ind]++
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
                                                <strong> <Icons.House className='mx-2' size={20}/>{property[0].type}</strong></span>
                                            <span className="badge badge-pill badge-light p-3 mr-5" style={{background:"#f5f8f9"}}>
                                                <Icons.DashSquare className='mx-2' size={20}/>
                                                <strong>{property[0].bed} Bedroom </strong></span>
                                            <span className="badge badge-pill badge-light p-3 mr-5" style={{background:"#f5f8f9"}}>
                                                <strong> <Icons.People size={20}/> Sleeps {property[0].no_people}  </strong></span>
                                            <span className="badge badge-pill badge-light p-3 mr-5" style={{background:"#f5f8f9"}}>
                                                <strong><Icons.Calendar4 size={20} className='mx-2'/> 7 days</strong></span>
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
                                                    {item==='tv'?
                                                    <Icons.Tv size={15} className='mx-2'/>:<Icons.CheckCircle size={15} className='mx-2'/>}
                                                    {item}
                                                </div>
                                                ))
                                            }
                                            </div>
                                        </div>
                                    </li>
                                    {/* Access */}
                                    <li id="Description" className="list-group-item ml-0 pl-0">
                                    <p style={{fontWeight:600}}>ACCESS</p>
                                        {
                                        suitability[0].parking && suitability[0].elevator ? 
                                        <div className='container'>
                                            <div className="row justify-contnent-between">
                                                <div className='col-6'>
                                                <img className='mx-2' src="https://img.icons8.com/dotty/80/000000/car.png"width='25px' />
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
                                        <hr/>
                                        {/* interaction witn guest */}
                                        <div>
                                        <p style={{fontWeight:600}}>INTERACTION WITH GUEST</p>
                                            <div className='d-flex justify-content-around'>
                                                <div className=''>
                                                    <img src="https://img.icons8.com/dotty/80/000000/headset.png"width="25px"/>
                                                </div>
                                                <div className='pl-2' style={{fontSize:15}}>
                                                    Detailed check-in and orientation information are emailed to guests prior to 
                                                    arrival - please review carefully to avoid delays at check-in. Guests should 
                                                    text/call the building manager prior to their departure to establish contact. 
                                                    The building manager will provide guests with access to the apartment upon arrival. 
                                                    Guests may contact building manager should any issues arise during their stay.
                                                </div>
                                            </div>
                                            <hr/>
                                        </div>
                                    </li>
                                    {/* policies */}
                                    <div>
                                        <p style={{fontWeight:600}}>POLICIES</p>
                                        <div className='d-flex justify-content-around'>
                                            <div className=''>
                                            <img src="https://img.icons8.com/ios/50/000000/check-file.png" width='25'/>
                                            </div>
                                            <div>
                                                <dl>
                                                    <dd className='pl-2'>
                                                        <strong>Check in time:</strong> 14:00, <strong>Check out time:</strong> 11:00
                                                    </dd>
                                                    <dd className='pl-2'>
                                                    If you have any questions about check-in or check-out times, please contact the owner/manager.
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className='row ml-1'>
                                            <Icons.CreditCard size={30} className='pr-2'/>
                                            <p className='mb-0'style={{fontWeight:600}}>Payment</p>
                                            <p className='pl-4'>
                                                This rental can only be paid for online through FlipKey using your credit/debit card or
                                                PayPal (never by bank or wire transfer).
                                            </p >
                                            <p className='pl-4'>Damage deposit: $300.00</p>
                                        </div>
                                        <div className='row ml-1'>
                                            <Icons.XCircle size={30} className='pr-2' />
                                            <p className='mb-0'style={{fontWeight:600}}>Smoking</p>
                                        </div>
                                            <p className='pl-4 mt-0'>No smoking at this property</p>
                                        <hr/>
                                    </div>
                                    {/* CANCELLATIONS policy */}
                                    <div>
                                        <p style={{fontWeight:600}}>CANCELLATIONS</p>
                                        <p>Change of plans? No problem. You could receive a partial or full refund, depending on when you cancel.</p>
                                        <Table>
                                            <tbody>
                                                <tr>
                                                    <td ><small style={{top:-20, position:'relative'}}>Booking confirmed</small></td>
                                                    <td>
                                                        {/* bullete point */}
                                                        <ul>
                                                            <li style={{listStyleType:'disc',top:-20,position:'relative'}}></li>
                                                        </ul>
                                                    </td>
                                                    {/* condition-1 */}
                                                    <td>
                                                        <div className='border w-100 p-2' style={{width:'100%',top:-10,left:-10, position:'relative', background:'#1fa1db'}}>
                                                            <strong> 100% refund </strong>within 24 hours after booking (provided the stay is at least 60 days away).
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><small style={{top:-20, position:'relative'}}><strong>24 </strong>hours after <br />booking</small></td>
                                                    {/* bullete point */}
                                                    <td>
                                                        <ul>
                                                            <li style={{listStyleType:'disc',top:-20,position:'relative'}}></li>
                                                        </ul>
                                                    </td>
                                                    {/* condition-2 */}
                                                    <td>
                                                        <div className='border w-100 p-2' style={{width:'100%',top:-10,left:-10, position:'relative', background:'#8ed0ec'}}>
                                                            <strong> 50% refund </strong>of the amount paid (minus the booking fee*) if cancelled at least 4 weeks before check-in.
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><small><strong>4</strong> weeks before</small></td>
                                                    {/* bullete point */}
                                                    <td>
                                                        <ul>
                                                            <li style={{listStyleType:'disc',top:-20,position:'relative'}}></li>
                                                        </ul>
                                                    </td>
                                                    {/* condition-3 */}
                                                    <td>
                                                        <div className='border w-100 p-2' style={{width:'100%',left:-10, position:'relative'}}>
                                                            <strong> No refund </strong>if cancelled less than 4 weeks before check-in.
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><small>Check-in date</small></td>
                                                    {/* bullete point */}
                                                    <td>
                                                        <ul>
                                                            <li style={{listStyleType:'disc',top:-20,position:'relative'}}></li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <small>* The booking fee is stated in the cancellation policy information on the payment page. This fee helps us run our secure platform and enables us to provide 24/7 customer support</small>
                                        <hr/>
                                    </div>
                                    {/* About the owner */}
                                    <div>
                                        <h4 style={{fontWeight:400}}>About the owner</h4>
                                        <p style={{fontFamily:"Arial, Helvetica, sans-serif"}}><strong>{owner[0].name}.</strong></p>
                                        <div style={{fontSize:15, fontFamily:" Comic Sans MS, cursive, sans-serif"}}>
                                            <p>Response Rate:<strong>{owner[0].response_rate}%</strong></p>
                                            <p>Years listed : <strong>{owner[0].year_listed}</strong></p>
                                            <p>Contact Info: <strong>{owner[0].phone}</strong></p>
                                            {owner[0].english?<p>Languages Spoken: English</p>:<p>Languages Spoken: Native</p>}
                                        </div>
                                    </div>    
                                    {/* map inegration */}
                                    <li id="Map" className="list-group-item ml-0 pl-0">
                                        <h4 className="mb-2">Map Integration</h4>

                                    </li>
                                    {/* calendar availability */}
                                    <li id="Availablitiy" className="list-group-item ml-0 pl-0">
                                        <p>One year calender integration</p>
                                    </li>
                                    {/* Reviews page */}
                                    <li className="list-group-item ml-0 pl-0">
                                        
                                        <h4 style={{fontWeight:400}}>Reviews</h4>
                                        {
                                        avg >= 4?<p><strong style={{fontSize:15}}><i>Very Good</i></strong> – based on {tot} reviews</p>:
                                        avg >= 3?<p><strong>Good </strong> – based on {tot} reviews</p>:
                                        avg >= 2?<p><strong>Average </strong> – based on {tot} reviews</p>:
                                        <p><strong>Worst </strong> – based on {tot} reviews</p>
                                        }
                                        {/* redirect to add review component */}
                                        <button className='btn rounded-0 btn-block text-center border w-50 mr-5'style={{color:'#066bc8', background:'#f4f4f4'}} >Write a review</button> {/* write a review button */}
                                    </li>
                                    <li id="Reviews" className="list-group-item ml-0 pl-0">
                                        {/* Excellent rating */}
                                        <div className='d-flex justify-content-start my-0'>
                                            <p style={{width:100}}>Excellent</p>
                                            <div
                                                style={{ height: "20px", width: "120px", background: "#f4f4f4"}}>
                                                <div style={{ height: "20px", width: a[5], background: "#00af87" }}></div>
                                            </div> 
                                            <p className='px-3 text-muted'>{obj[5][5]}</p>
                                        </div>
                                        {/* Very Good rating */}
                                        <div className='d-flex justify-content-start my-0 py-0'>
                                            <p style={{width:100}}>Very Good</p>
                                            <div>
                                                <div
                                                    style={{ height: "20px", width: "120px", background: "#f4f4f4"}}>
                                                    <div style={{ height: "20px", width: a[4], background: "#00af87" }}></div>
                                                </div>
                                            </div>
                                            <p className='px-3 text-muted'>{obj[4][4]}</p>
                                        </div>
                                        {/* Average rating */}
                                        <div className='d-flex justify-content-start my-0 py-0'>
                                            <p style={{width:100}}>Average</p>
                                            <div>
                                                <div
                                                    style={{ height: "20px", width: "120px", background: "#f4f4f4"}}>
                                                    <div style={{ height: "20px", width: a[3], background: "#00af87" }}></div>
                                                </div>
                                            </div>
                                            <p className='px-3 text-muted'>{obj[3][3]}</p>
                                        </div>
                                        {/* Poor rating */}
                                        <div className='d-flex justify-content-start my-0 py-0'>
                                            <p style={{width:100}}>Poor</p>
                                            <div>
                                                <div
                                                    style={{ height: "20px", width: "120px", background: "#f4f4f4"}}>
                                                    <div style={{ height: "20px", width: a[2], background: "#00af87" }}></div>
                                                </div>
                                            </div>
                                            <div className='px-3 text-muted'>{obj[2][2]}</div>
                                        </div>
                                        {/* Terrible */}
                                        <div className='d-flex justify-content-start my-0 py-0' >
                                            <p style={{width:100}}>Terrible</p>
                                            <div>
                                                <div
                                                    style={{ height: "20px", width: "120px", background: "#f4f4f4"}}>
                                                    <div style={{ height: "20px", width: a[1], background: "#00af87" }}></div>
                                                </div>
                                            </div>
                                            <p className='px-3 text-muted'>{obj[1][1]}</p>
                                        </div>
                                    </li>
                                    {/* displaying reviews */}
                                    {
                                        review.map(item => 
                                            (
                                                <li className="list-group-item">
                                                    <div className='d-flex justify-content-start'>
                                                        <div className='mx-2'>
                                                            <img src='/images/dummy_img.png' alt='img' width={60} className='rounded-circle border' />
                                                        </div>
                                                        <div className='d-flex flex-column '>
                                                            <p className='lead py-0 mb-0' style={{fontWeight:400}}>"{item.title}!!"</p>
                                                            <div >
                                                                <span className="px-2">
                                                                    {item.rating===5?<img src='/images/rating_5.png' width={100} alt='oops!'/>:item.rating}
                                                                </span>
                                                                <span className="px-2 text-muted" style={{fontSize:15}}>
                                                                    Reviewed {item.rev_date}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <p className="my-2">
                                                        {item.review}
                                                    </p>
                                                </li>
                                            )
                                        )
                                    }
                                    <li id="FAQs" className="list-group-item">
                                        <p>FAQ</p>
                                    </li>
                                    
                                    <li class="list-group-item">
                                        <p className='lead' style={{fontWeight:400}}>Recommended for you</p>
                                        <div className="row">
                                            {
                                                recData && recData.map(item =>(
                                                    <div className='col-4'>                                                    
                                                        <div className="card  border">
                                                            <img className="img-fluid" src={item.image_a} alt="Loading" />
                                                            <div className="card-body">
                                                                <p className="card-title">From $ {item.price}/<p className="small text-muted">per night</p></p>
                                                                <div className="card-text">
                                                                    {/* <Link to={`/results/${item.property_id}`} style={{ textDecoration: "none", color: "black" }}> */}
                                                                    <p onClick={()=>{this.handleRecom(item.property_id)}}>{item.name}</p>
                                                                    {/* </Link> */}
                                                                    <p>{item.city}</p>
                                                                    <p>{item.bed} beds/{item.no_people}/Sleep</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>

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