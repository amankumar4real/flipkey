import React from 'react'
// import React, { useState } from 'react'
import { afterPropData, propBookingData, totalPrice} from '../../redux/PropertyDetails/action'
import Vocation from '../common/Vacation';
import { connect } from 'react-redux';
import RazopPay from "../razoppay"


class BookingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            price: 0,
        }

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
            !this.props.token?this.props.history.push("/user/login"):
            Object.keys(data).length != 0 ?
                <div>
                    <div className="container-fluid  w-50" style={{ backgroundColor: "white" }}>
                        <div>
                            <div className=" mt-3 row d-flex justify-content-between" >
                                <h3 className="text-muted">Your Secure Booking</h3>
                                <h4 className=" p-2 mb-0 bg-light" >42 traverlers have <br></br>booked this rentals</h4>
                            </div>
                        </div>
                        <div className="row justify-content-center p-3 bg-light">
                            <div className="col-8">
                                <div className="m-2 p-2" style={{ backgroundColor: "white" }}>
                                    <h4>
                                        Your Information
                                </h4>
                                    <form>
                                        <div class="row mb-3">
                                            <div class="col">
                                                <label for="fname">Firstname *</label>
                                                <input id="fname" type="text" class="form-control" placeholder="First name" value="Mark" required />
                                            </div>
                                            <div class="col">
                                                <label for="lname">Lastname *</label>
                                                <input id="lname" type="text" class="form-control" placeholder="Last name" value="Mark" required />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div class="col">
                                                <label for="email">Email *</label>
                                                <input id="email" type="email" class="form-control" placeholder="Enter your mail id" value="Mark" required />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div class="col-4">
                                                <button type="button" class="btn btn-outline-secondary">US +1</button>
                                                <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span class="sr-only">Toggle Dropdown</span>
                                                </button>
                                                <div class="dropdown-menu">
                                                    <a class="dropdown-item" href="#">IND +91</a>
                                                    <a class="dropdown-item" href="#">US +1</a>
                                                    <a class="dropdown-item" href="#">Something else here</a>
                                                    <div role="separator" class="dropdown-divider"></div>
                                                    <a class="dropdown-item" href="#">Separated link</a>
                                                </div>
                                            </div>
                                            <div class="col-8">
                                                <input id="phone" type="number" class="form-control" placeholder="Phone Number" value="Mark" required />
                                            </div>
                                        </div>
                                        <div class="form-group form-check">
                                            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                            <label class="form-check-label" for="exampleCheck1">Receive text message updates about your booking. Message rates may apply.</label>
                                        </div>
                                    </form>
                                </div>
                                <div className="m-2 p-2" style={{ backgroundColor: "white" }}>
                                    <h4>
                                        Payment details
                                </h4>
                                    <br />
                                    <h5>
                                        Paying through RazorPay
                                </h5>
                                <hr/>
                                    <p><small>To book this rental, we require you to pay via RazorPay.</small></p>
                                    <p><small>When you click <strong>Continue to PayPal below</strong>, you'll be redirected to the PayPal site to complete your payment. Even if you don't have a PayPal account, you can pay as a guest, using a credit or debit card.</small></p>
                                </div>
                                <div className="m-2 p-2" style={{ backgroundColor: "white" }}>
                                    <h4>Indroduce Yourself to the Owner</h4>
                                    <h5 className="text-warning">Be Sure to share</h5>
                                    <ul>
                                        <li>Some info about you and who's coming with you</li>
                                        <li>What brings you to location ?</li>
                                        <li>What about this home interests you?</li>
                                    </ul>
                                    <p>Message for owner</p>
                                    <label for="message"></label>
                                    <textarea id="message" className="justify-content">

                                    </textarea>
                                </div>
                                <div className="m-2 p-2" style={{ backgroundColor: "white" }}>
                                    <ul class="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <h4>
                                                Review and Book
                                </h4>
                                        </li>
                                        <li className="list-group-item">
                                            <h5>You will be charged ${(property.price * this.props.days * this.props.guest) + (Math.round((this.props.days * property.price * this.props.guest) * 0.1)) + 60 + 60 + 60}</h5>
                                        </li>
                                        <li className="list-group-item">
                                            <p><small className="text-muted">The owner has 24 hours to respond, and we will only charge your card if your booking   </small></p>
                                        </li>
                                        <li>
                                            <RazopPay onClick={() => this.handleBooking(property.price)}/>
                                            {/* <button onClick={() => this.handleBooking(property.price)}>Continue with Razor pay</button> */}
                                            <p><small className="text-muted">This booking is facilitated by FlipKey Inc (part of the TripAdvisor group) but the booking is solely between you and the owner/manager. By clicking above, you agree to the booking conditions and cancellation policy of the owner/manager, as well as FlipKey Inc’s terms & conditions (which includes a chargeback policy) and privacy policy. Although FlipKey Inc facilitates your booking, your payment may be processed by another group company, e.g. Holiday Lettings Ltd., on behalf of FlipKey, Inc.</small></p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-4 ">
                                <div class="card sticky-top mt-2">
                                    <div className="card-header">
                                        <div id="carouselExampleControls" class="carousel slide  justify-content-center" data-ride="carousel">
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
                                    </div>
                                    <div class="card-body">
                                        <small class="card-text text-muted">
                                            <p>{property.name}</p>
                                            <p>{property.type}/{property.no_people}</p>
                                            <p>{property.city}</p>
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