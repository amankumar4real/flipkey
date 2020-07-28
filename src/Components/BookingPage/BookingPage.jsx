import React from 'react'
import { afterPropData, propBookingData } from '../../redux/PropertyDetails/action'
import Vocation from '../common/Vacation'
import { connect } from 'react-redux'



class BookingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: "",
            endDate:'',
            price : 0
        }

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
    componentDidMount(){
        console.log(this.props)
        this.props.afterPropData(this.props.match.params)
        // this.props.getStartDate()
        // this.props.getEndDate()
        // this.props.getPrice()


        // this.setState({
        //     startDate : this.props.startDate,
        //     endDate : this.props.endDate,
        //     price : this.props.price
        // })
    }
    handleBooking = () => {
        // const s = this.props.startDate.toString().split(" ")[0]
        // const e = this.props.endDate.toString().split(" ")[0]
        // const d = Math.floor((Math.abs(s - e) / 1000)/86400)
        // const t = this.state.price * d
        console.log(this.props.startDate,this.props.endDate,this.props.recom.property_data[0].price)
        console.log(this.props)
        this.setState({
            startDate : this.props.startDate,
            endDate : this.props.endDate,
            price : this.props.recom.property_data[0].price
        })
        console.log(this.state,this.props)
        console.log(this.props.recom.property_data[0].price)
        const x = {
            property_id : this.props.match.params.id,
            from_date :this.state.startDate,
            end_date : this.state.endDate,
            price: this.state.price
        }
        console.log(x)
        // this.props.propBookingData(x)
        console.log(x)
    }
    render() {
        return (
            <div>
                <h3 className="text-muted">Your Secure Booking</h3>
                <div className="container-fluid ">
                    <div className="row justify-content-center p-3 bg-light">
                        <div className="col-8 m-2">
                            <div className="m-2">
                                <h4>
                                    Your Information
                                </h4>
                                <form>
                                    <div class="row">
                                        <div class="col">
                                            <label for="fname">Firstname *</label>
                                            <input id="fname" type="text" class="form-control" placeholder="First name" value="Mark" required />
                                        </div>
                                        <div class="col">
                                            <label for="lname">Lastname *</label>
                                            <input id="lname" type="text" class="form-control" placeholder="Last name" value="Mark" required />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div class="col">
                                            <label for="email">Email *</label>
                                            <input id="email" type="email" class="form-control" placeholder="Enter your mail id" value="Mark" required />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div class="col-3">
                                            <button type="button" class="btn btn-outline-secondary">Action</button>
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
                                        <div class="col-7">
                                            <input id="phone" type="number" class="form-control" placeholder="Phone Number" value="Mark" required />
                                        </div>
                                    </div>
                                    <div class="form-group form-check">
                                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                        <label class="form-check-label" for="exampleCheck1">Receive text message updates about your booking. Message rates may apply.</label>
                                    </div>
                                </form>
                            </div>
                            <div className="m-2">
                                <h4>
                                    Payment details
                                </h4>
                                <br />
                                <h5>
                                    Paying through RazorPay
                                </h5>
                                <p><small>To book this rental, we require you to pay via RazorPay.</small></p>
                                <p><small>When you click <strong>Continue to PayPal below</strong>, you'll be redirected to the PayPal site to complete your payment. Even if you don't have a PayPal account, you can pay as a guest, using a credit or debit card.</small></p>
                            </div>
                            <div className="m-2">
                                <h4>Indroduce Yourself to the Owner</h4>
                                <h5 className="text-warning">Be Sure to share</h5>
                                <ul>
                                    <li>Some info about you and who's coming with you</li>
                                    <li>What brings you to location ?</li>
                                    <li>What about this home interests you?</li>
                                </ul>
                                <label for="message">Message from the user</label>
                                <textarea id="message">

                                </textarea>
                            </div>
                            <div className="m-2">
                                <ul class="list-group list-group-flush">
                                    <li className="list-group-item">
                                    <h4>
                                    Review and Book
                                </h4>
                                    </li>
                                    <li className="list-group-item">
                                    <h5>You will be charged price</h5>
                                    </li>
                                    <li className="list-group-item">
                                        <p><small>The owner has 24 hours to respond, and we will only charge your card if your booking has</small></p>
                                    </li>
                                    <li>
                                        <button onClick={this.handleBooking}>Continue with Razor pay</button>
                                        <p><small className="text-muted">This booking is facilitated by FlipKey Inc (part of the TripAdvisor group) but the booking is solely between you and the owner/manager. By clicking above, you agree to the booking conditions and cancellation policy of the owner/manager, as well as FlipKey Inc’s terms & conditions (which includes a chargeback policy) and privacy policy. Although FlipKey Inc facilitates your booking, your payment may be processed by another group company, e.g. Holiday Lettings Ltd., on behalf of FlipKey, Inc.</small></p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-4 sticky-top m-2">

                        </div>
                    </div>
                </div>

                <hr/>
                <div>
                    <Vocation />
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.reducerPropertyDetails.bookingDetails,
        recom : state.reducerPropertyDetails.primaryData,
        startDate : state.reducerPropertyDetails.startDate,
        endDate : state.reducerPropertyDetails.endDate,
        price : state.reducerPropertyDetails.price
    }

}

const mapDispatchToProps = dispatch => {
    return {
        afterPropData : payload => dispatch(afterPropData(payload)),
        propBookingData: payload => dispatch(propBookingData(payload)),
        // changeStartDate : payload => dispatch(getStartDate(payload)),
        // changeEndDate: payload => dispatch(getEndDate(payload)),
        // changePrice : payload => dispatch(getPrice(payload))
   
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingPage)