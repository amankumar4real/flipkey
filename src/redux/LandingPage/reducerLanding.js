import { RENTAL_DATA } from './actionTypes'
import {change_text} from "./actionTypes"

const initialState = {
    rentalData:[
        {name:'bangalore', img:'https://s4.fkimg.com/res/1380077913/assets/fk/images/home/Gatlinburg.jpg', rentalCount:5},
        {name:'patna', img:'https://s4.fkimg.com/res/1380077913/assets/fk/images/home/Destin.jpg',rentalCount:852},
        {name:'kolkata', img:'https://s4.fkimg.com/res/1380077913/assets/fk/images/home/OuterBanks.jpg',rentalCount:1052},
        {name:'delhi', img:'https://s4.fkimg.com/res/1380077913/assets/fk/images/home/MyrtleBeach.jpg',rentalCount:4200},
        {name:'hyderabad', img:'https://s4.fkimg.com/res/1380077913/assets/fk/images/home/PanamaCityBeach.jpg',rentalCount:1990},
        {name:'pune', img:'https://s4.fkimg.com/res/1380077913/assets/fk/images/home/BigBearRegion.jpg',rentalCount:1580}
    ],
    landingText: ''
}

const reducreLanding = (state = initialState, {type, payload}) => {
    switch(type){
        case RENTAL_DATA : 
            return {
                ...state,
            }
        case change_text :
            return{
                ...state,
                landingText: payload
            }
        default :
          	return state;
    }
}

export default reducreLanding