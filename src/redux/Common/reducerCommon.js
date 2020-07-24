import { PROPERTY_DETAILS } from './actionTypes'
import {COMMON_DATA} from './actionTypes'

const initialstate = {
    type_search :"Home",
    primaryData : [
        {
            images : ["https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
            "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
            "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
            "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
            "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"],
            name : "Available AnyTime",
            propertyType: "Villa",
            capcity:"2 bedrooms/ 2 bathrooms/ sleeps 6",
            ratings:5,
            pricePerNight: "$593"
        },
        {
            images : ["https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
            "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
            "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
            "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
            "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"],
            name : "Available AnyTime",
            propertyType: "Villa",
            capcity:"2 bedrooms/ 2 bathrooms/ sleeps 6",
            ratings:6,
            pricePerNight: "$593"
        },
        {
            images : ["https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
            "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
            "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
            "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
            "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"],
            name : "Available AnyTime",
            propertyType: "Villa",
            capcity:"2 bedrooms/ 2 bathrooms/ sleeps 6",
            ratings:6,
            pricePerNight: "$593"
        },
        {
            images : ["https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
            "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
            "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
            "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
            "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"],
            name : "Available AnyTime",
            propertyType: "Villa",
            capcity:"2 bedrooms/ 2 bathrooms/ sleeps 6",
            ratings:6,
            pricePerNight: "$593"
        },
        {
            images : ["https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
            "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
            "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
            "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
            "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"],
            name : "Available AnyTime",
            propertyType: "Villa",
            capcity:"2 bedrooms/ 2 bathrooms/ sleeps 6",
            ratings:6,
            pricePerNight: "$593"
        },
        {
            images : ["https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"],
            name : "Available AnyTime",
            propertyType: "Villa",
            capcity:"2 bedrooms/ 2 bathrooms/ sleeps 6",
            ratings:6,
            pricePerNight: "$593"
        }
    ]
}

const reducerPropertyDetails = (state = initialstate, {type,payload}) => {
    // return {
    //     ...state
    // }
    switch(type){
        case COMMON_DATA : 
            return {
                ...state,
                primaryData : payload
            }
        default :
          	return state;
    }

}

export default reducerPropertyDetails