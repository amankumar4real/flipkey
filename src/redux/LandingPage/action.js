import {RENTAL_DATA} from './actionTypes'
import {change_text, set_coordinates} from "./actionTypes"

export const rentalData = payload => ({
    type: RENTAL_DATA ,
    payload 
})

export const changeText = payload => ({
    type: change_text ,
    payload 
   })

   export const setCoordinates = payload => ({
    type: set_coordinates,
    payload 
   })