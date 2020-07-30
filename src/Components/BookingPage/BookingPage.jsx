import React from 'react'
// import React, { useState } from 'react'
import { afterPropData, propBookingData, totalPrice} from '../../redux/PropertyDetails/action'
import Vocation from '../common/Vacation';
import { connect } from 'react-redux';
import RazopPay from "../razoppay";
import * as Icons from 'react-bootstrap-icons'; 


class BookingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            price: 0,
            firstname:'',
            lastname:'',
            email:'',
            phone:'',
            checkbox:false,
            isRazorPay:false,
            message:''
        }

    }
    handleSubmit=(e)=>{
        e.preventDefault()
        console.log(this.state)
    }
    handleChange=e=>{
        this.setState({   
            checkbox: !this.state.checkbox
        })
    }
    handleFirstName=e=>{
        this.setState({   
            firstname: e.target.value
        })
    }
    handleLastName=e=>{
        this.setState({   
            lastname: e.target.value
        })
    }
    handleEmail=e=>{
        this.setState({   
            email: e.target.value
        })
    }
    handlePhone=e=>{
        this.setState({   
            phone: e.target.value
        })
    }
    handleRadioBtn=(e)=>{
        this.setState({   
            isRazorPay: !this.state.isRazorPay
        })
    }
    componentDidUpdate(){
        console.log(this.state)
    }
    
    componentDidMount() {
        this.props.afterPropData(this.props.match.params)
        this.props.totalPrice((this.props.property.price * this.props.days * this.props.guest) + (Math.round((this.props.days * this.props.property.price * this.props.guest) * 0.1)) + 60 + 60 + 60)

    }
    handleBooking = p => {
        if (!this.props.startDate) {

            const x = {
                property_id: this.props.match.params.id,
                from_date: this.convertDate(new Date()),
                end_date: this.convertDate(new Date()),
                price: (this.props.property.price * this.props.days * this.props.guest) + (Math.round((this.props.days * p * this.props.guest) * 0.1)) + 60 + 60 + 60,
                token: this.props.token
            }
            // this.props.propBookingData(x)
            console.log(x, "n")
        }
        else {
            const x = {
                property_id: this.props.match.params.id,
                from_date: this.convertDate(this.props.startDate),
                end_date: this.convertDate(this.props.endDate),
                price: this.props.price,
                token: this.props.token
            }
            // this.props.propBookingData(x)
            console.log(x)
        }
    }
    convertDate = (date) => {
        date = date.toString().split(" ")
        var mon = date[1]
        var day = date[2]
        var year = date[3]
        if (mon == "Jan") {
            mon = "01"
        }
        else if (mon == "Feb") {
            mon = "02"
        }
        else if (mon == "Mar") {
            mon = "03"
        }
        else if (mon == "Apr") {
            mon = "04"
        }
        else if (mon == "May") {
            mon = "05"
        }
        else if (mon == "Jun") {
            mon = "06"
        }
        else if (mon == "Jul") {
            mon = "07"
        }
        else if (mon == "Aug") {
            mon = "08"
        }
        else if (mon == "Sep") {
            mon = "09"
        }
        else if (mon == "Oct") {
            mon = "10"
        }
        else if (mon == "Nov") {
            mon = "11"
        }
        else {
            mon = "12"
        }
        return year + "-" + mon + "-" + day
    }

    render() {
        console.log(this.props.property)
        let dateS, dateE
        if (!this.props.startDate) {
            dateS = new Date()
            dateE = new Date()
        }
        else {
            dateS = this.props.startDate
            dateE = this.props.endDate
        }
        dateE = dateE.toString().split(" ")
        dateS = dateS.toString().split(" ")


        var data = this.props.property  
        var property
        if (Object.keys(data).length != 0) {
            property = data.property_data[0]
            console.log(property)
        }
        return (
            // !this.props.token?this.props.history.push("/user/login"):
            Object.keys(data).length != 0 ?
                <div>
                    <div className="container my-4 p-0">
                        <div className="d-flex justify-content-start m-0 p-0" >
                            <Icons.LockFill size={40} color="#bbbbbb" className='pr-2 '/>
                            <h3 className="text-muted">Your Secure Booking</h3><span className='text-danger'>*</span>
                            {/* <h4 className=" p-2 mb-0 bg-light" >42 traverlers have <br></br>booked this rentals</h4> */}
                        </div>
                        {/* *************** outer frame *************** */}
                        <div className="row justify-content-center border bg-light">
                            {/* *****************************Form***************************** */}
                            <div className="col-xl-8 col-md-12">
                                <div className="m-2 p-2" style={{ backgroundColor: "white" }}>
                                    <h4>
                                        Your Information
                                    </h4>
                                    <form>
                                        <div class="row mb-3">
                                            {/* first name */}
                                            <div class="col-xl-6 col-md-12">
                                                <label for="fname">Firstname <span className='text-danger'>*</span></label>
                                                <input 
                                                    name='firstname'
                                                    type="text" 
                                                    class="form-control" 
                                                    placeholder="First name" 
                                                    autoComplete='off'
                                                    value={this.state.firstname}
                                                    onChange={this.handleFirstName} 
                                                    required 
                                                />
                                            </div>
                                            {/* last name */}
                                            <div class="col-xl-6 col-md-12">
                                                <label for="lname">Lastname <span className='text-danger'>*</span></label>
                                                <input 
                                                    name='lastname' 
                                                    type="text" 
                                                    class="form-control" 
                                                    placeholder="Last name" 
                                                    autoComplete='off'
                                                    value={this.state.lastname}
                                                    onChange={this.handleLastName}
                                                    required />
                                            </div>
                                            {/* email */}
                                            <div class="col-xl-6 col-md-12">
                                                <label for="email">Email <span className='text-danger'>*</span></label>
                                                <input 
                                                    name='email' 
                                                    type="email" 
                                                    class="form-control" 
                                                    placeholder="Enter your mail id" 
                                                    autoComplete='off'
                                                    value={this.state.email}
                                                    onChange={this.handleEmail}
                                                    required />
                                            </div>
                                            {/* phone */}
                                            <div class="col-xl-6 col-md-12">
                                                <label for="phone">Mobile phone number <span className='text-danger'>*</span></label>
                                                <input 
                                                    name='phone' 
                                                    type="number" 
                                                    class="form-control" 
                                                    placeholder="phone number" 
                                                    autoComplete='off'
                                                    value={this.state.phone}
                                                    onChange={this.handlePhone}
                                                    required />
                                            </div>
                                        </div>
                                        <div class="form-group form-check">
                                            <input 
                                                type="checkbox" 
                                                class="form-check-input" 
                                                value={this.state.checkbox}
                                                onChange={this.handleChange}
                                                name='checkbox'
                                            />
                                            <label class="form-check-label" for="exampleCheck1">Receive text message updates about your booking. Message rates may apply.</label>
                                        </div>
                                    </form>
                                </div>
                                {/* ********************** Payment Details *********************** */}
                                <div className="m-2 p-2" style={{ backgroundColor: "white" }}>
                                    <h4>
                                        Payment details
                                    </h4>
                                    {/* razor log */}
                                    <div class="form-group form-check border px-0 pt-2 " style={{width:120}}>
                                        <input type='radio' name='razor_payment' value={this.state.isRazorPay} onChange={this.handleRadioBtn}/>
                                        <img src='/images/razor_logo.png' alt='logo' width='100'/>
                                    </div>
                                    <h5>
                                        Paying through RazorPay
                                    </h5>
                                <hr/>
                                    <p style={{fontSize:15}}>To book this rental, we require you to pay via RazorPay.</p>
                                    <p style={{fontSize:15}}>When you click <strong>Continue to RazorPay below</strong>, you'll be redirected to the RazorPay site to complete your payment. Even if you don't have a RazorPay account, you can pay as a guest, using a credit or debit card.</p>
                                </div>
                                <div className="m-2 p-2" style={{ backgroundColor: "white" }}>
                                    <h4>Indroduce Yourself to the Owner</h4>
                                    {/* <Icons.LightningFill size={25}/> */}
                                    <h5 className="text-warning">Be Sure to share</h5>
                                    <ul>
                                        <li className='py-0 text-muted'>Some info about you and who's coming with you</li>
                                        <li className='py-0 text-muted'>What brings you to location ?</li>
                                        <li className='py-0 text-muted'>What about this home interests you?</li>
                                    </ul>
                                    <p className='pb-0 mb-0 text-muted'>Message for owner<span className='text-danger'>*</span></p>
                                    <label for="message"></label>
                                    <textarea id="message" className="justify-content w-100" onChange={(e)=>this.setState({message:e.target.value})} >

                                    </textarea>
                                </div>
                                <div className="m-2 p-2" style={{ backgroundColor: "white" }}>
                                    <h4>
                                        Review and Book
                                    </h4>
                                    <p>You will be charged <strong>${(property.price * this.props.days * this.props.guest) + (Math.round((this.props.days * property.price * this.props.guest) * 0.1)) + 60 + 60 + 60}</strong></p>
                                    <p className="text-muted" style={{fontSize:15}} >The owner has 24 hours to respond, and we will only charge your card if your booking.</p>
                                    <RazopPay onClick={() => this.handleBooking(property.price)}/>
                                    {/* <button onClick={() => this.handleBooking(property.price)}>Continue with Razor pay</button> */}
                                    <p><small className="text-muted">This booking is facilitated by FlipKey Inc (part of the TripAdvisor group) but the booking is solely between you and the owner/manager. By clicking above, you agree to the booking conditions and cancellation policy of the owner/manager, as well as FlipKey Inc’s terms & conditions (which includes a chargeback policy) and privacy policy. Although FlipKey Inc facilitates your booking, your payment may be processed by another group company, e.g. Holiday Lettings Ltd., on behalf of FlipKey, Inc.</small></p>    
                                </div>
                            </div>
                            <div className="col-4 ">
                                <div class="card sticky-top mt-5 rounded-0 w-100">
                                    <div id="carouselExampleControls" class="carousel slide w-100 m-0 p-0 justify-content-center" data-ride="carousel">
                                        <div class="carousel-inner">
                                            <div class="carousel-item active">
                                                <img class="d-block img-fluid" src={property.image_a} width='300' alt="First slide" />
                                            </div>
                                            {
                                                <div key="myin">
                                                    <div class="carousel-item">
                                                        <img class="d-block  img-fluid" src={property.image_b} width='300' alt="Third slide" />
                                                    </div>
                                                    <div class="carousel-item">
                                                        <img class="d-block  img-fluid" src={property.image_c} width='300' alt="Forth slide" />
                                                    </div>
                                                    <div class="carousel-item">
                                                        <img class="d-block  img-fluid" src={property.image_d} alt="Fifth slide" width='300' />
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span class="sr-only">Previous</span>
                                        </a>
                                        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="sr-only">Next</span>
                                        </a>
                                    </div>
                                    <div class="card-body">
                                        <small class="card-text text-muted">
                                            <p className='mx-0'>{property.name}</p>
                                            <p className='mx-0'>{property.type}/{property.no_people}</p>
                                            <p className='mx-0'>{property.city}</p>
                                        </small>
                                        <p className="card-text">
                                            {dateS[0]}, {dateS[1]} {dateS[2]} - {dateE[0]}, {dateE[1]} {dateE[2]},{dateE[3]}
                                        </p>
                                        <p className="mb-3">
                                            {this.props.days} {this.props.days == 1 ? "night" : "nights"},  {this.props.guest} {this.props.guest == 1 ? "guest" : "guests"}
                                        </p>
                                        <ul className="list-group list-group-flush m-0 ">
                                            <li className="list-group-item m-0">
                                                    Detailed Quote
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between m-0">
                                                <small>Rate for {this.props.days} {this.props.days == 1 ? "night" : "nights"}</small>
                                                <small>${(property.price * this.props.days * this.props.guest) + (Math.round((this.props.days * property.price * this.props.guest) * 0.1)) + 60 + 60 + 60}</small>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between m-0">
                                                <strong>Total</strong>
                                                <strong> ${(property.price * this.props.days * this.props.guest) + (Math.round((this.props.days * property.price * this.props.guest) * 0.1)) + 60 + 60 + 60}</strong>
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr />
                    <div>
                        <Vocation />
                    </div>
                </div>
                :
                <div>Loading</div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.reducerPropertyDetails.bookingDetails,
        property: state.reducerPropertyDetails.primaryData,
        startDate: state.reducerPropertyDetails.startDate,
        endDate: state.reducerPropertyDetails.endDate,
        price: state.reducerPropertyDetails.price,
        guest: state.reducerPropertyDetails.guest,
        days: state.reducerPropertyDetails.days,
        token: state.reducerAuth.token
    }

}

const mapDispatchToProps = dispatch => {
    return {
        afterPropData: payload => dispatch(afterPropData(payload)),
        propBookingData: payload => dispatch(propBookingData(payload)),
        totalPrice: payload => dispatch(totalPrice(payload)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingPage)