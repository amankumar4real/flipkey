import React from 'react'
import { connect } from 'react-redux'

class ResultCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { data } = this.props
        return (
            data.map(item => (
                <div class="card mb-3 card-fluid">
                    <div class="row">
                        <div class="col-md-5 fill">



                            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img class="d-block w-100" src={item.images[0]} alt="First slide" />
                                    </div>
                                    {
                                        item.images.map(image=>(
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
                        <div class="col-md-7">
                            <div class="card">
                                <div class="row">
                                    <h5 class="col-12">{item.name}</h5>
                                    <p class="col-12 float-left">{item.propertyType}</p>
                                    <p class="col-12">{item.capcity}</p>
                                    <p class="col-12">{item.ratings}</p>
                                    <p class="col-12">{item.pricePerNight}</p>
                                    <div className="float-right"> 
                                        <button className="btn btn-primary float-right">Book</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))


        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.reducerCommon.primaryData
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultCard)