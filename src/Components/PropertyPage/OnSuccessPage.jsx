import React from 'react'
import { connect } from 'react-redux'
import { messageData } from '../../redux/PropertyDetails/action'

class onSuccessPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    home = () => {
        this.props.history.push("/")
    }
    handleClick = () => {
        var details = this.props.details
        console.log(details)
        this.props.messageData({
            to: details.phone.toString(),
            message: `Hello Mr. ${details.firstname} ${details.lastname} your booking has been confirmed with total charge ${this.props.price} and pay ment mode has been done through Razor pay. Enjoy your vocation. Please contact our customer care for any discripencies`
        })
    }
    render() {
        return (
            <div className="mt-5 container-fluid w-25 justify-content-center">
                <ul class="list-group " style={{ borderRadius: "10px", textAlign: "center" }}>
                    <li class="list-group-item  active">Congratulations Mr. {this.props.name}</li>
                    {/* <li class="list-group-item "><img src={{this.pro}} alt=""/></li> */}
                    <li class="list-group-item ">Payment : Successful</li>
                    <li class="list-group-item "> Paid Amount : {this.props.price}</li>
                    <li class="list-group-item "> Payment Mode : RazorPay</li>
                    <li class="list-group-item ">Enjoy your Vocation and keep booking</li>
                    <li>
                        <form>
                            <div class="form-group">
                                <input type="text" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" value={this.props.details.phone} disabled style={{textAlign:"center"}} />
                            </div>
                        </form>
                        <span>
                            <button onClick={this.handleClick} className="btn btn-outline-primary  w-100">Message me details</button>
                        </span>
                    </li>
                </ul>
                <button className="btn btn-outline-primary  w-100" onClick={this.home}>Explore more properties</button>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        // data: statefined.reducerCommon.primaryData
        price: state.reducerPropertyDetails.price,
        details: state.reducerPropertyDetails.bookDetails,
        name: state.reducerAuth.username
    }
}
const mapDispatchToProps = dispatch => {
    return {
        messageData: payload => dispatch(messageData(payload))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(onSuccessPage)