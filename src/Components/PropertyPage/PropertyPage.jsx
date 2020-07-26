import React from 'react'
import { connect } from 'react-redux'
import { getPropertyData } from '../../redux/Common/action'
import { afterPropData } from '../../redux/PropertyDetails/action'
import { faDivide } from '@fortawesome/free-solid-svg-icons'


class PropertyPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoading: 0
        }
        window.onload = () =>{
            this.setState({
                isLoading:true
            })
        }
    }
    componentDidMount() {
        console.log(this.props.match.params)

        //permannet axios call
        this.props.afterPropData(this.props.match.params)


        // const {result} = this.props.data
        // console.log(result,this.props)
        // var property 
        // for(var i=0;i<result.length;i++){
        //     if(result[i].id == 1){
        //         property = result[i]
        //     }
        // }
        // console.log(property)
    }
    render() {
        // const  {data}  = this.props
       
        const data = this.props.data
        
        // data.push(this.props.data)
        console.log(data)
        var amenities
        var dispAmenitites
        var property
        var suitability
        if(Object.keys(data).length != 0){

             amenities = data.property_amenities[0]
    
             dispAmenitites = []
            for (var key in amenities){
                if(amenities[key] == "true"){
                    dispAmenitites.push(key)
                }
            }
             property = data.property_data    
             suitability = data.property_suitability

             console.log(property[0].image_a)
        }

        



        // uselful data
        // console.log(data)
        // if(Object.keys(data).length != 0 ){
        //     return  <div>Loading.......</div>
           
        // }
        // else{
        //     return <div>else part</div>
        // }
        return  (
            Object.keys(data).length != 0 ? 
                <div>
                <div>
                    <div className="container">
                        <div className="row">

                        <div class="col-md-12" >
                            <div id="carouselExampleControls" class="carousel slide w-100" data-ride="carousel">
                                <div class="carousel-inner w-100" role="list-box">
                                    <div class="carousel-item active">
                                        <img class="d-block w-100" src="" alt="First slide" />
                                    </div>

                                    <div key="myin">
                                        <div class="carousel-item">
                                            <img class="d-block w-100" src={property[0].image_a} alt="Third slide" />
                                        </div>
                                        <div class="carousel-item">
                                            <img class="d-block w-100" src={property[0].image_b} alt="Forth slide" />
                                        </div>
                                        
                                        <div class="carousel-item">
                                            <img class="d-block w-100" src={property[0].image_c} alt="Fifth slide" />
                                        </div>
                                        <div class="carousel-item">
                                            <img class="d-block w-100" src={property[0].image_d} alt="Fifth slide" />
                                        </div>
                                        <div class="carousel-item">
                                            <img class="d-block w-100" src={property[0].image_a} alt="Fifth slide" />
                                        </div>
                                    </div>

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
                        </div>
                    </div>
                </div>
                <div class="w-50 cotainer container-fluid">
                    <div class="row">
                        <div class="col-8 pb-5 pt-5 " >
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
                            <ul data-spy="scroll" data-target="#navbar-example2" data-offset="0" class="list-group list-group-flush">
                                <li id="Description." class="list-group-item">
                                    {property[0].name}
                            </li>
                                <li id="Description" class="list-group-item">
                                    <div class="mb-4">
                                        <span class="badge badge-pill badge-light p-3 mr-5"><strong>{property[0].type }</strong></span>
                                        <span class="badge badge-pill badge-light p-3 mr-5"><strong>{property[0].bed } Bedroom </strong></span>
                                        <span class="badge badge-pill badge-light p-3 mr-5"><strong> Sleeps {property[0].no_people }  </strong></span>
                                        <span class="badge badge-pill badge-light p-3 mr-5"><strong> </strong>7 days</span>
                                    </div>
                                    <div class="mb-4">
                                        BOOK WITH CONFIDENCE.Pay on FlipKey to get Payment Protection for this rental. Never pay by bank or wire transfer.
                                </div>
                                    <div class="mb-4">
                                        Key Info
                                        <div>
                                            <span class="m-5">{dispAmenitites[0]}</span>
                                            <span class="m-5">{dispAmenitites[5]}</span>
                                        </div>
                                        {suitability[0].parking && suitability[0].elevator?<div>
                                                <span class="m-5">Parking Available</span>
                                               <span class="m-5">Elevator Available</span>
                                            </div>:suitability[0].parking && suitability[0].wheelchair?<div>
                                            <span class="m-5">Parking Available</span>
                                            <span class="m-5"> wheelchair</span>
                                        </div>:suitability[0].parking?<div>
                                            <span class="m-5">Parking Available</span>
                                            <span class=" m-5"> No wheel chair</span>
                                        </div>:<div>
                                            <span class="m-5">Parking Not Available</span>
                                            <span class="m-5"> No wheel chair</span>
                                        </div>}
                                    </div>
                                </li>
                                <li id="Description" class="list-group-item">
                                    <div>
                                    <h4 class="mb-2">Description of the owner</h4>
                                        <p>
                                            This one-bedroom deluxe King Bed Villa is adjacent to the Great Smoky Mountain National Park.It exquisitely decorated and accommodates 4 guest comfortably (780 square feet) . This villa is in the heart of the Smoky Mountains. The resort has so much to offer. Some of the most popular attractions at the resort include Wild Bear Falls (the indoor waterpark), award winning restaurants, Serenity Spa and horse back riding! Your stay at the resort is sure to be an unforgettable vacation!
                                    </p>
                                    </div>
                                    <div>
                                    <h4 class="mb-2">Families</h4>                                        
                                    <div class="m-3">
                                            <span class="m-5">{suitability[0].children?"Great place for children":"Not suitable for children"}</span>
                                            <span class="m-5">{suitability[0].pets?"Pets are allowed":"No pets allowed"}</span>
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
                                    <div className="flex" style = {{flexDirection:"column"}}> 

                                        {
                                            
                                            dispAmenitites.map(item => (
                                                <div class="m-3">
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
                                                suitability[0].parking && suitability[0].elevator?<div>
                                                <span class="m-5">Parking Available</span>
                                               <span class="m-5">Elevator Available</span>
                                            </div>:suitability[0].parking && suitability[0].wheelchair?<div>
                                            <span class="m-5">Parking Available</span>
                                            <span class="m-5"> wheelchair</span>
                                        </div>:suitability[0].parking?<div>
                                            <span class="m-5">Parking Available</span>
                                            <span class=" m-5"> No wheel chair</span>
                                        </div>:<div>
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
                                        This rental can only be paid for online through FlipKey using your credit/debit card or PayPal (never by bank or wire transfer).
                                        </p>
                                        <p className="ml-5">Damage deposit: $200.00</p>
                                </div>
                                    <div>
                                        <h4>Smoking</h4>
                                        {
                                            suitability[0].smoke?<p className="ml-5" >Accesss to smoke</p>:<p className="ml-5">No smoking at this property</p>
                                        }
                                </div>
                                </li>
                                <li id="Description" class="list-group-item">
                                    <p>Need to create the cancellation component</p>
                                </li>
                                <li id="Description" class="list-group-item">
                                <h4 class="mb-2">About the owner</h4>

                                    <p>Name</p>
                                    <p>Average time reply</p>
                                    <p>And many more need to be added</p>
                                </li>
                                <li id="Map" class="list-group-item">
                                <h4 class="mb-2">Map Integration</h4>
                                    
                                </li>
                                <li id="Availablitiy" class="list-group-item">
                                    <p>One year calender integration</p>
                                </li>
                                <li class="list-group-item">
                                <h4 class="mb-2">Reviews </h4>

                                </li>
                                <li id="Reviews" class="list-group-item">
                                    <p>Excellent</p>
                                    <p>Good</p>
                                    <p>Bad</p>
                                    <p>shouls be a bar graph</p>
                                </li>
                                <li class="list-group-item">Reviw1</li>
                                <li class="list-group-item">Review2ros</li>
                                <li class="list-group-item">Review2</li>
                                <li class="list-group-item">Review2lisis in</li>
                                <li class="list-group-item">Review2</li>
                                <li class="list-group-item">Review2tetur ac</li>
                                <li class="list-group-item">Review2ros</li>

                                <li id="FAQs" class="list-group-item">
                                    <p>FAQ</p>
                                </li>
                                <li class="list-group-item">
                                <h4 class="mb-2">
                                    Build your perfect trip, with Flipkey & TripAdvisor</h4>

                                    <p>Build the sttaic component </p>
                                </li>
                                <li class="list-group-item">
                                    <p>
                                        Also Consider
                                </p>
                                </li>
                                <li class="list-group-item">
                                    This listing is created and maintained by the homeThis listing is created and maintained by the homeowner; we can only publish adverts in good faith as we don't own, manage or inspect any of the properties. We advise you to familiarize yourself with our terms of use.owner; we can only publish adverts in good faith as we don't own, manage or inspect any of the properties. We advise you to familiarize yourself with our terms of use.
                            </li>
                            </ul>
                        </div>
                        <div class="col-4 p-5">
                            <div class="card bg-light mb-3 sticky-top">
                                <div class="card-header">Header</div>
                                <div class="card-body">
                                    <h5 class="card-title">Light card title</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
            :<div>Loading</div>



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
    //     // getPropertyData: payload => dispatch(getPropertyData(payload))
    // }

    return {
        afterPropData: payload => dispatch(afterPropData(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyPage)