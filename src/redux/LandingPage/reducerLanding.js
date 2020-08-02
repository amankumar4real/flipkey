import { RENTAL_DATA } from './actionTypes'
import {change_text, set_coordinates} from "./actionTypes"

const initialState = {
    rentalData:[
        {name:'bangalore', img:'https://s4.fkimg.com/res/1380077913/assets/fk/images/home/Gatlinburg.jpg', rentalCount:5, lat:12.9715987, lng:77.5945627},
        {name:'patna', img:'https://s4.fkimg.com/res/1380077913/assets/fk/images/home/Destin.jpg',rentalCount:5,lat:25.5940947, lng:85.1375645},
        {name:'kolkata', img:'https://s4.fkimg.com/res/1380077913/assets/fk/images/home/OuterBanks.jpg',rentalCount:1,lat:22.572646, lng:88.36389500000001},
        {name:'delhi', img:'https://s4.fkimg.com/res/1380077913/assets/fk/images/home/MyrtleBeach.jpg',rentalCount:4,lat:28.7040592, lng:77.10249019999999},
        {name:'hyderabad', img:'https://s4.fkimg.com/res/1380077913/assets/fk/images/home/PanamaCityBeach.jpg',rentalCount:4,lat:17.385044, lng:78.486671},
        {name:'pune', img:'https://s4.fkimg.com/res/1380077913/assets/fk/images/home/BigBearRegion.jpg',rentalCount:3,lat:18.5204303, lng:73.8567437}
    ],
    landingText: '',
    coordinate_landing: '',
    address_landing:''
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

        case set_coordinates :
            return{
                ...state,
                coordinate_landing: payload.co,
                address_landing: payload.ad
            }
        default :
          	return state;
    }
}

export default reducreLanding