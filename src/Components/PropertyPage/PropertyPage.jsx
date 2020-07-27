import React from 'react'
import { connect } from 'react-redux'
import { getPropertyData } from '../../redux/Common/action'
import { afterPropData } from '../../redux/PropertyDetails/action'
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import { Dropdown, Button, ButtonGroup, Form, FormCheck } from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import '@brainhubeu/react-carousel/lib/style.css';
import { faDivide } from '@fortawesome/free-solid-svg-icons'
import GoogleLogin from 'react-google-login';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

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
            endDate:''
        }
        window.onload = () => {
            this.setState({
                isLoading: true
            })
        }
    }
    componentDidMount() {
        this.props.afterPropData(this.props.match.params)
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
    // handle guests 
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
        // const  {data}  = this.props

        const data = this.props.data

   
        console.log(data)
        var amenities,dispAmenitites,property,suitability,owner,review,i,tot,avg,obj,a,obj_percent;

        if (Object.keys(data).length != 0) {
            amenities = data.property_amenities[0]
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
            obj = [{"0":0},{"1":0},{"2":0},{"3":0},{"4":0},{"5":0}]
            review.map(item=>{
                tot += item.rating
                console.log(item.rating)
                if(item.rating == 0){
                    obj[0][0]++
                }
                if(item.rating == 1){
                    obj[1][1]++
                }
                if(item.rating == 2){
                    obj[2][2]++
                }
                if(item.rating == 3){
                    obj[3][3]++
                }
                if(item.rating == 4){
                    obj[4][4]++
                }
                if(item.rating == 5){
                    obj[5][5]++
                }

            })
            
                // console.log(obj)
                avg = Math.floor(tot/review.length)

        obj_percent = [
            {"0":Math.ceil((obj[0][0]/review.length)*100)},
            {"1":Math.ceil((obj[1][1]/review.length)*100)},
            {"2":Math.ceil((obj[2][2]/review.length)*100)},
            {"3":Math.ceil((obj[3][3]/review.length)*100)},
            {"4":Math.ceil((obj[4][4]/review.length)*100)},
            {"5":Math.ceil((obj[5][5]/review.length)*100)}
        ]
        a = []
        for(var i=0;i<=5;i++){
            a.push(Math.floor(obj_percent[i][i]*80/100)+"px")
        }
            }

        // uselful data
        // console.log(data)
        // if(Object.keys(data).length != 0 ){
        //     return  <div>Loading.......</div>

        // }
        // else{
        //     return <div>else part</div>
        // }
     
return (
    Object.keys(data).length != 0 ?
        <div>
            {/* Carosuel */}
            <div>
                <div className="container">
                    <div className="row">
                        <div class="col-md-12">
                            <Carousel plugins={[ 'centered' , 'infinite' , 'arrows' , { resolve: slidesToShowPlugin, options: {
                                numberOfSlides: 3 } }, ]} offset="5" breakpoints={{
                                                    640: {
                                                        plugins: [
                                                            {
                                                                resolve: slidesToShowPlugin,
                                                                options: {
                                                                    numberOfSlides: 3
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    900: {
                                                        plugins: [
                                                            {
                                                                resolve: slidesToShowPlugin,
                                                                options: {
                                                                    numberOfSlides: 5
                                                                }
                                                            },
                                                        ]
                                                    }
                                                }}>
                                <img src={property[0].image_a} />
                                <img src={property[0].image_b} />
                                <img src={property[0].image_c} />
                                <img src={property[0].image_d} />
                                {/* <img src={property[0].image_a} /> */}
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-50 cotainer container-fluid">
                <div class="row">
                    <div class="col-8 pb-5 pt-5 ">
                        {/* navbar */}
                        <nav id="navbar-example2" class="navbar navbar-light bg-light sticky-top">
                            <ul class="nav nav-pills active">
                                <li class="nav-item">
                                    <a class="nav-link" href="#Description.">Description</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#Map">Maps</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#Availability">Availablity</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#Reviews">Reviews</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#FAQs">FAQs</a>
                                </li>
                            </ul>
                        </nav>
                        <ul data-spy="scroll" data-target="#navbar-example2" data-offset="0"
                            class="list-group list-group-flush">
                            <li id="Description." class="list-group-item">
                                {property[0].name}
                            </li>
                            <li id="Description" class="list-group-item">
                                <div class="mb-4">
                                    <span
                                        class="badge badge-pill badge-light p-3 mr-5"><strong>{property[0].type}</strong></span>
                                    <span class="badge badge-pill badge-light p-3 mr-5"><strong>{property[0].bed} Bedroom
                                        </strong></span>
                                    <span class="badge badge-pill badge-light p-3 mr-5"><strong> Sleeps {property[0].no_people}
                                        </strong></span>
                                    <span class="badge badge-pill badge-light p-3 mr-5"><strong> </strong>7 days</span>
                                </div>
                                <div class="mb-4">
                                    <p className="text-success">
                                        BOOK WITH CONFIDENCE
                                    </p>
                                    <p className="text-success">Pay on FlipKey to get Payment Protection for this rental. Never
                                        pay by bank or wire transfer.
                                    </p>
                                </div>
                                <div class="mb-4 border">
                                    <p style={{fontWeight:600, left:0}} >
                                        KEY INFO
                                    </p>
                                    <div>
                                        <span class="m-5">{dispAmenitites[0]}</span>
                                        <span class="m-5">{dispAmenitites[5]}</span>
                                    </div>
                                    {suitability[0].parking && suitability[0].elevator ? <div>
                                        <span class="m-5">Parking Available</span>
                                        <span class="m-5">Elevator Available</span>
                                    </div> : suitability[0].parking && suitability[0].wheelchair ? <div>
                                        <span class="m-5">Parking Available</span>
                                        <span class="m-5"> wheelchair</span>
                                    </div> : suitability[0].parking ? <div>
                                        <span class="m-5">Parking Available</span>
                                        <span class=" m-5"> No wheel chair</span>
                                    </div> : <div>
                                        <span class="m-5">Parking Not Available</span>
                                        <span class="m-5"> No wheel chair</span>
                                    </div>}
                                </div>
                            </li>
                            <li id="Description" class="list-group-item">
                                <div>
                                    <h4 class="mb-2">Description of the owner</h4>
                                    <p>
                                        This one-bedroom deluxe King Bed Villa is adjacent to the Great Smoky Mountain National
                                        Park.It exquisitely decorated and accommodates 4 guest comfortably (780 square feet) .
                                        This villa is in the heart of the Smoky Mountains. The resort has so much to offer. Some
                                        of the most popular attractions at the resort include Wild Bear Falls (the indoor
                                        waterpark), award winning restaurants, Serenity Spa and horse back riding! Your stay at
                                        the resort is sure to be an unforgettable vacation!
                                    </p>
                                </div>
                                <div>
                                    <h4 class="mb-2">Families</h4>
                                    <div class="m-3">
                                        <span class="m-5">{suitability[0].children ? "Great place for children" 
                                        : "Not suitablefor children"}</span>
                                        <span class="m-5">{suitability[0].pets ? "Pets are allowed" : "No pets allowed"}</span>
                                    </div>
                                </div>

                            </li>
                            <li id="Description" class="list-group-item">
                                <div>
                                    <h4 class="mb-2">Bed & Bathroom</h4>


                                    <div class="m-3">
                                        <span class="m-5">{property[0].bed} Beds Available</span>
                                        <span class="m-5">{property[0].bath} Beds Available</span>
                                    </div>
                                </div>
                            </li>
                            <li id="Description" class="list-group-item">
                                <div>
                                    <h4 class="mb-2">Amenities</h4>
                                    <div className="flex" style={{ columns: "2 auto" }}>

                                        {

                                        dispAmenitites.map((item, ind) => (
                                        <div class="m-3" key={ind}>
                                            <span class="p-5 m-5">{item}</span>
                                        </div>
                                        ))

                                        }

                                    </div>

                                    <p>Should add more or less button</p>
                                </div>
                            </li>
                            <li id="Description" class="list-group-item">
                                <div>
                                    <h4 class="mb-2">Access</h4>

                                    <div class="m-3">
                                        {
                                        suitability[0].parking && suitability[0].elevator ? <div>
                                            <span class="m-5">Parking Available</span>
                                            <span class="m-5">Elevator Available</span>
                                        </div> : suitability[0].parking && suitability[0].wheelchair ? <div>
                                            <span class="m-5">Parking Available</span>
                                            <span class="m-5"> wheelchair</span>
                                        </div> : suitability[0].parking ? <div>
                                            <span class="m-5">Parking Available</span>
                                            <span class=" m-5"> No wheel chair</span>
                                        </div> : <div>
                                            <span class="m-5">Parking Not Available</span>
                                            <span class="m-5"> No wheel chair</span>
                                        </div>





                                        }

                                    </div>
                                </div>
                            </li>
                            <li id="Description" class="list-group-item">
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
                            <li id="Description" class="list-group-item">
                                <p>Need to create the cancellation component</p>
                            </li>
                            <li id="Description" class="list-group-item">
                                <h4 class="mb-2">About the owner</h4>

                                <p><strong>{owner[0].name}</strong></p>
                                <p>Response Rate:{owner[0].response_rate}</p>
                                <p>Years listed : {owner[0].year_listed}</p>
                                <p>Contact Info: {owner[0].phone}</p>
                                {owner[0].english?<p>Languages Spoken: English</p>:<p>Languages Spoken: Native</p>}

                            </li>
                            <li id="Map" class="list-group-item">
                                <h4 class="mb-2">Map Integration</h4>

                            </li>
                            <li id="Availablitiy" class="list-group-item">
                                <p>One year calender integration</p>
                            </li>
                            <li class="list-group-item">
                                <h4 class="mb-2">Reviews </h4>
                                {
                                avg >= 4?<p>Very Good based on {tot} reviews</p>:
                                avg >= 3?<p>Good based on {tot} reviews</p>:
                                avg >= 2?<p>Average based on {tot} reviews</p>:
                                <p>Worst based on {tot} reviews</p>
                                }


                            </li>
                            <li id="Reviews" class="list-group-item">
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
                            review.map(item => (
                            <li class="list-group-item">
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
                            ))
                            }


                            <li id="FAQs" class="list-group-item">
                                <p>FAQ</p>
                            </li>
                            <li>
                                Recommended for you
                            </li>
                            <li class="list-group-item">
                                <h4 class="mb-2">
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
                            <li class="list-group-item">
                                <p>
                                    Also Consider
                                </p>
                            </li>
                            <li class="list-group-item">
                                This listing is created and maintained by the homeThis listing is created and maintained by the
                                homeowner; we can only publish adverts in good faith as we don't own, manage or inspect any of
                                the properties. We advise you to familiarize yourself with our terms of use.owner; we can only
                                publish adverts in good faith as we don't own, manage or inspect any of the properties. We
                                advise you to familiarize yourself with our terms of use.
                            </li>
                        </ul>
                    </div>
                    {/* ***********************PriceForm************************ */}
                    <div class="col-4 pl-5  mt-5 border">
                        <div class="card bg-light my-5 mr-0 pr-0 sticky-top border" style={{right:0}}>
                            <div class="">
                                <small className='text-muted'>Total</small>
                                <h2>${property[0].price}</h2>
                            </div>
                            <div class="card-body">
                                <div class="card-text">
                                    <div > 
                                        {/* from Month and to Month */}
                                        <div className="row">
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
                                        <div className="row mt-2 bg-white">
                                            <div className='col btn-block border m-0 p-0'>
                                                <Dropdown variant='white' className='rounded-0'>
                                                    <DropdownToggle variant='white' className='rounded-0 w-100 m-0'>
                                                        <Button variant='white' className='p-0 m-0 w-100'>
                                                            {this.state.people} guest
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
                                                                                className='lead font-weight-bold p-1 m-0 btn-block btn-light rounded-0'>
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
                                                                                className='lead font-weight-bold p-1 m-0 btn-block btn-light rounded-0'>
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
                                                                                className='lead font-weight-bold p-1 m-0 btn-block btn-light rounded-0'>
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
                                                                                className='lead font-weight-bold p-1 m-0 btn-block btn-light rounded-0'>
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
                                        <div>
                                            <span className="float-left">Total</span>
                                            <span className="float-right">{property[0].price}</span>
                                        </div>
                                        <div>
                                            <span className="float-left  text-muted">No Hidden values</span>
                                            <span className="float-right text-muted">Show details</span>
                                        </div>
                                        <button type="button" class="btn btn-primary">Book</button>
                                        <button type="submit" class="btn btn-light">Contact owner</button>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer text-muted">
                                Book online with payment protection
                            </div>
                        </div>
                    </div>
                    hr
                    <div class="row">
                        <div class="col-12">
                            <p>import Vocation and the footer</p>
                        </div>
                    </div>
                </div>
                {/* <div>

                </div>
                <div>

                </div> */}
            </div>
        </div>
        : <div>Loading</div>
        )

}
}

const mapStateToProps = (state) => {
return {
// data: state.reducerCommon.primaryData
data: state.reducerPropertyDetails.primaryData
}

}

const mapDispatchToProps = dispatch => {
// return {
// // getPropertyData: payload => dispatch(getPropertyData(payload))
// }

return {
afterPropData: payload => dispatch(afterPropData(payload))
}
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyPage)