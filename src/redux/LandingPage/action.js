import {RENTAL_DATA} from './actionTypes'
import {change_text} from "./actionTypes"

export const rentalData = payload => ({
    type: RENTAL_DATA ,
    payload 
})

export const changeText = payload => ({
    type: change_text ,
    payload 
   })