import { PROPERTY_DETAILS } from './actionTypes'

const initialstate = {
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
    return{
        ...state
    }
}

export default reducerPropertyDetails