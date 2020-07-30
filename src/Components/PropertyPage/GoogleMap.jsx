import React from 'react';
import { connect } from 'react-redux';
import {GoogleMap, withScriptjs, withGoogleMap, Marker} from "react-google-maps"


function Googlemap({map_data}){

        var property_map = ""

        if(Object.keys(map_data).length != 0){
            property_map = map_data.property_data[0]
            console.log(property_map)
        }

        // here is the code for map

        function Map(){
        
            return(
                Object.keys(map_data).length != 0 ?
                <>
                    <GoogleMap defaultZoom={10}
                     defaultCenter={{lat: Number(property_map.city_lat), lng: Number(property_map.city_lng)}} 
                     >
                     <Marker key="position_on_map" position={{lat: Number(property_map.pro_lat), lng: Number(property_map.pro_lng)}} />
                    </GoogleMap>
                </>
                :
                <div>Loading.......</div>
            )
        }

        const WrappedMap = withScriptjs(withGoogleMap(Map))

        return(
            <div style={{ width: "35vw", height: "50vh" }}>
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
        map_data: state.reducerPropertyDetails.primaryData
    }

}

export default connect(mapStateToProps)(Googlemap)
