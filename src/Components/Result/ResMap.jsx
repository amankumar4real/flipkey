import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from "react-google-maps"
import {Link} from "react-router-dom"


function ResMap({map_data}){

        var property_map = ""

        if(map_data.length != 0){
            property_map = map_data.result
            // console.log(property_map[0].lat_ci)
        }

        // here is the code for map

        function Map(){
            const [selectedProperty, setSelectedProperty] = useState(null);
        

            useEffect(() => {
                const listener = e => {
                  if (e.key === "Escape") {
                    setSelectedProperty(null);
                  }
                };
                window.addEventListener("keydown", listener);
            
                return () => {
                  window.removeEventListener("keydown", listener);
                };
              }, []);

            return(
                property_map.length != 0 ?
                <div>
                    <GoogleMap defaultZoom={10}
                     defaultCenter={{lat: Number(property_map[0].lat_ci), lng: Number(property_map[0].lng_ci)}} 
                     >
                    {property_map.map(prop => (
                        <Marker
                            key={prop.name}
                            position={{
                                lat: Number(prop.lat_pro),
                                lng: Number(prop.lng_pro)
                            }}
                            onClick={() => {
                                setSelectedProperty(prop);
                            }}
                            // icon={{
                            //     url: `/skateboarding.svg`,
                            //     scaledSize: new window.google.maps.Size(25, 25)
                            // }}
                        />
                    ))}

                    {selectedProperty && (
                            <InfoWindow
                            onCloseClick={() => {
                                setSelectedProperty(null);
                            }}
                            position={{
                                lat: Number(selectedProperty.lat_pro),
                                lng: Number(selectedProperty.lng_pro)
                            }}
                            >
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
                                    {/* <div class="col-md-5"> */}
                                        <div id={`s${6}`} class="carousel slide" data-interval="false">
                                            <div class="carousel-inner">
                                                <div class="carousel-item active">
                                                    <img class="d-block w-100 " src={selectedProperty.image_a} width='300' height='250' alt="First slide" />
                                                </div>
                                                <div key = {"hio"}>
                                                    <div class="carousel-item">
                                                        <img class="d-block w-100" src={selectedProperty.image_b} width='300' height='250' alt="Third slide" />
                                                    </div>
                                                    <div class="carousel-item">
                                                        <img class="d-block w-100" src={selectedProperty.image_c} width='300' height='250' alt="Forth slide" />
                                                    </div>
                                                    <div class="carousel-item">
                                                        <img class="d-block w-100" src={selectedProperty.image_d} alt="Fifth slide" width='300' height='250' />
                                                    </div>
                                                </div>
                                                    <div >
                                                        {/* toggle shortList */}
                                                        {/* <Icons.Heart size={40} style={{position:'absolute' , top:-60, left:30, color:`${shortListBg}`}} /> */}
                                                    </div>
                                            </div>
                                            <a class="carousel-control-prev" href={`#s${2}`} role="button" data-slide="prev">
                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span class="sr-only">Previous</span>
                                            </a>
                                            <a class="carousel-control-next" href={`#s${3}`} role="button" data-slide="next">
                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span class="sr-only">Next</span>
                                            </a>
                                        </div>
                                    {/* </div>   */}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <Link to = {`/results/${selectedProperty.property_id}`} style={{textDecoration:"none", color:"black", fontFamily:"Arial, Helvetica, sans-serif"}} >
                                                <h5 class="bolder" >
                                                    {selectedProperty.name}
                                                </h5>
                                        </Link>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <p class=" mt-0">{selectedProperty.bed} bedrooms/ {selectedProperty.bath} bathrooms/ sleep {selectedProperty.no_people}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 text-right">
                                        <Link to = {`/results/${selectedProperty.property_id}`}>
                                            <button className="btn px-4 mb-0 text-white" style={{background:'#0076df'}} >Book</button>
                                        </Link>
                                    </div>
                                </div>
                                
                            </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </div>
                :
                <div>Loading.......</div>
            )
        }

        const WrappedMap = withScriptjs(withGoogleMap(Map))

        return(
            <div style={{ width: "50vw", height: "88vh", paddingTop:'5px' }}>
                <WrappedMap 
                googleMapURL= {`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCcS0j7hDpSs-F4xDi2q6AkTD_sWqECR9M`} 
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        )
}

const mapStateToProps = (state) => {
    return {
        map_data: state.reducerCommon.primaryData
    }

}

export default connect(mapStateToProps)(ResMap)
