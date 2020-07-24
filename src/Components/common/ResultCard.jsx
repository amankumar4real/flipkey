import React from 'react'
import { connect } from 'react-redux'
import { getPropertyData } from '../../redux/Common/action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'


class ResultCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: "",
            result: []
        }

    }
    componentDidMount() {
        // this.props.getPropertyData()
    }

    shortList = (key) => {
        this.props.addShortList({
            
        })
    }    
    render() {

        const { result } = this.props.data
        
        console.log(result)
        if(result){
            return (
                result.map( item => (
                    <div key={item.property_id} class="card mb-3 card-fluid">
                        <div class="row">
                            {typeof item.image == "string" ?
                                <div class="col-md-5 fill">
                                    <img className="img-card img-fluid" src={item.image} />
                                </div>
                                :

                                <div class="col-md-5 fill">
                                    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                                        <div class="carousel-inner">
                                            <div class="carousel-item active">
                                                <img class="d-block w-100" src={item.images[0]} alt="First slide" />
                                            </div>
                                            {
                                                item.images.map(image => (
                                                    <div class="carousel-item">
                                                        <img class="d-block w-100" src={image} alt="Second slide" />
                                                    </div>
                                                ))
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


                            }

                            <div class="col-md-7">
                                <div class="container container-fluid">
                                    <div class="row">
                                        <div class="col-8">
                                            <h5 class="col-12  mt-2"><strong>{item.name}</strong></h5>
                                            <p class=" col-12  mt-2">People: {item.no_people}</p>
                                            <p class=" col-12  mt-2">No. of Bedrooms:{item.bed}</p>
                                            <p class=" col-12  mt-2">Property Type:{item.type}</p>
                                            <button className="btn btn-light" onClick={this.shortList}>
                                                <FontAwesomeIcon 
                                                icon={["fas", 'heart']} 
                                                style={{color:'#f7acbc'}}
                                            /></button>
                                        </div>
                                        
                                        <div className="col-4">
                                            <p className="mb-0 " ><small>Price per ight</small></p>
                                            <p class="mt-0 mb-5"><strong>${item.price}</strong></p>
                                            <button className="btn btn-primary btn-fluid mt-5 mr-1" onClick={this.booking}>Book</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )
        }
        else {
            return (
                <div className="card card-fluid">
                    <div className="row">
                        <div className="col-12">
                            <img src="https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg" alt=""/>
                        </div>
                    </div>
                    
                </div>
            )
        }

    }
}

const mapStateToProps = (state) => {
    return {
        data: state.reducerCommon.primaryData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPropertyData: payload => dispatch(getPropertyData(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultCard)