import React from 'react'
import { connect } from 'react-redux'
import { getPropertyData } from '../../redux/Common/action'
import { afterPropData } from '../../redux/PropertyDetails/action'


class PropertyPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dat: []
        }
    }
    componentDidMount() {

        const newUrl = new URL(window.location.href)

        // const newUrl = new URLSearchParams()
        console.log(newUrl.search)

        //temp
        // this.props.getPropertyData()


        //permannet axios call
        // this.props.afterPropData()

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
        const { result } = this.props.data
        console.log(result, this.props)
        var property
        for (var i = 0; i < result.length; i++) {
            if (result[i].id == 1) {
                property = result[i]
            }
        }
        console.log(property)

        return (
            <div>
                <div><strong>{property.name}</strong></div>
                <br></br>
                <div className="container container-fluid">
                    <div class="col-md-5 fill">
                        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img class="d-block w-100" src={property.image_a} alt="First slide" />
                                </div>
                                {
                                    <div key="myin">
                                        <div class="carousel-item">
                                            <img class="d-block w-100" src={property.image_b} alt="Third slide" />
                                        </div>
                                        <div class="carousel-item">
                                            <img class="d-block w-100" src={property.image_c} alt="Forth slide" />
                                        </div>
                                        <div class="carousel-item">
                                            <img class="d-block w-100" src={property.image_d} alt="Fifth slide" />
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
                    {/* <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">

                        <!-- Indicators -->
  <ol class="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>

                        <!-- Wrapper for slides -->
  <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img class="d-block w-100" src={property.image_a} data-color="lightblue" alt="First Image">
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>First Image</h5>
                                    </div>
    </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" src={property.image_b} data-color="lightblue" alt="First Image">
                                        <div class="carousel-caption d-none d-md-block">
                                            <h5>First Image</h5>
                                        </div>
    </div>
                                    <div class="carousel-item">
                                        <img class="d-block w-100" src={property.image_c} data-color="lightblue" alt="First Image">
                                            <div class="carousel-caption d-none d-md-block">
                                                <h5>First Image</h5>
                                            </div>
    </div>
                                        <div class="carousel-item">
                                            <img class="d-block w-100" src={property.image_d} data-color="lightblue" alt="First Image">
                                                <div class="carousel-caption d-none d-md-block">
                                                    <h5>First Image</h5>
                                                </div>
    </div>

                                            <!-- more slides -->
  </div>

                                        <!-- Controls -->
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span class="sr-only">Previous</span>
                                        </a>
                                        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="sr-only">Next</span>
                                        </a>

                                    </div> */}
                                </div>
                                {/* <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">

  <!-- Indicators -->
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>

  <!-- Wrapper for slides -->
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src = {property.image_a} data-color="lightblue" alt="First Image">
      <div class="carousel-caption d-none d-md-block">
        <h5>First Image</h5>
      </div>
    </div>
    <div class="carousel-item">
     <img class="d-block w-100" src = {property.image_b} data-color="lightblue" alt="First Image">
      <div class="carousel-caption d-none d-md-block">
        <h5>First Image</h5>
      </div>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src = {property.image_c} data-color="lightblue" alt="First Image">
      <div class="carousel-caption d-none d-md-block">
        <h5>First Image</h5>
      </div>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src = {property.image_d} data-color="lightblue" alt="First Image">
      <div class="carousel-caption d-none d-md-block">
        <h5>First Image</h5>
      </div>
    </div>

    <!-- more slides -->
  </div>

  <!-- Controls -->
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>

</div> */}

                                <div>

                                </div>
                            </div>
                            )
                    
                        }
                    }
                    
const mapStateToProps = (state) => {
    return {
                                data: state.reducerCommon.primaryData
                    
                        }
                        // data: state.reducerPropertyDetails.primaryData
                    }
                    
const mapDispatchToProps = dispatch => {
    return {
                                // getPropertyData: payload => dispatch(getPropertyData(payload))
                            }

                                // return {
                                //     afterPropData: payload => dispatch(afterPropData(payload))
                                // }
                            }

                            export default connect(mapStateToProps, mapDispatchToProps)(PropertyPage)