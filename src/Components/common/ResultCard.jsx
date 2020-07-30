import React from 'react'
import { connect } from 'react-redux'
import { getPropertyData } from '../../redux/Common/action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';
import { Dropdown, Button,ButtonGroup, Form, FormCheck } from 'react-bootstrap';            
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';            
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';            
import {Link} from 'react-router-dom'
import axios from 'axios';
import FilterResults from 'react-filter-search';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Next } from 'react-bootstrap/esm/PageItem';
import * as Icons from 'react-bootstrap-icons';

let params = new URLSearchParams(document.location.search.substring(1))

// console.log(params.get("beds"))

const sliderThumbStyles = (props) => (`
  width: 10px;
  height: 10px;
  background: ${props.color};
  cursor: pointer;
  outline: 2px solid #333;
  opacity: ${props.opacity};
  -webkit-transition: .2s;
  transition: opacity .1s;
`);
const Styles = styled.div
    `display: flex;  align-items: center;
  color: white;
  .value {
    flex: 1;
    font-size: 20px;
  }
  .slider {
    flex: 4;
    -webkit-appearance: none;
    width: 100%;
    height: 5px;
    border-radius: 5px;
    background: #efefef;
    outline: none;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      ${props => sliderThumbStyles(props)}
}&::-moz-range-thumb {
      ${props => sliderThumbStyles(props)}
    }
  }`;

// people, adult, child, beds, price, sortby,searchval

class ResultCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            people: 1,
            adult: 1,
            child: 0,
            beds: 1,
            price: 50,
            type: [],
            bath: 1,
            amenities: [],
            suitability: [],
            sortby:"relevence",
            dummydata:[],
            searchVal: "",
            startDate: new Date(),
            endDate: new Date(),
            shortListToggle:false
            // place: this.props.
        }
    }
    handleOnChange = (e) => {
        this.setState(
            { price: e.target.value },
            // console.log(e.target.value)
        )
        this.props.getPropertyData()
    }
   

    componentDidUpdate = () => {
        console.log('selected rental type')
        console.log(this.state.type)
        console.log('selected amenity type')
        console.log(this.state.amenities)
        console.log('selected suitability type')
        console.log(this.state.suitability)
        console.log(`sortby: ${this.state.sortby}`)
        console.log(`startDate: ${this.state.startDate}
        endData: ${this.state.endDate}`)
        console.log('shortList bg')
        console.log(this.state.shortListToggle)
    }
    componentWillMount(){
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response=> this.setState({dummydata:response.data}))
    }
    // handle date
    handleStartDate = date => {
        this.setState({
          startDate: date
        });
      };
    handleEndDate = date => {
      this.setState({
        endDate: date
      });
    };
    adultInc = () => {

        this.setState({
            adult: this.state.adult + 1,
            people: this.state.people + 1
        })
        console.log(this.state.adult)
    }
    adultDec = () => {
        if (this.state.adult > 1) {

            this.setState({
                adult: this.state.adult - 1,
                people: this.state.people - 1
            })
            console.log(this.state.adult)
        }
    }
    childInc = () => {
        this.setState({
            child: this.state.child + 1,
            people: this.state.people + 1
        })
        console.log(this.state.child)
    }
    childDec = () => {
        if (this.state.child > 0) {

            this.setState({
                child: this.state.child - 1,
                people: this.state.people - 1
            })
            console.log(this.state.child)
        }
    }
    bedroomsDec = () => {
        if (this.state.beds > 1) {
            this.setState({
                beds: this.state.beds - 1
            })
        }
    }
    bedroomsInc = () => {
        if (this.state.beds <= 15) {
            this.setState({
                beds: this.state.beds + 1
            })
        }
    }

    componentWillMount() {
        localStorage.getItem('people') && this.setState({
            people: Number(JSON.parse(localStorage.getItem('people'))),
            adult: Number(JSON.parse(localStorage.getItem('adult'))),
            child: Number(JSON.parse(localStorage.getItem('child'))),
            beds: Number(JSON.parse(localStorage.getItem('beds'))),
            price: Number(JSON.parse(localStorage.getItem('price'))),
            sortby: JSON.parse(localStorage.getItem('sortby')),
            searchVal: JSON.parse(localStorage.getItem('searchVal'))
        })

        
    }

    componentDidMount() {
        this.props.getPropertyData()
        console.log(this.props.landingText)
        
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('people', JSON.stringify(nextState.people));
        localStorage.setItem('adult', JSON.stringify(nextState.adult));
        localStorage.setItem('child', JSON.stringify(nextState.child));
        localStorage.setItem('beds', JSON.stringify(nextState.beds));
        localStorage.setItem('price', JSON.stringify(nextState.price));
        localStorage.setItem('sortby', JSON.stringify(nextState.sortby));
        localStorage.setItem('searchVal', JSON.stringify(nextState.searchVal))
    }


    handleClick = () => {
        // this.props.history.push("/results")
        const newUrl = new URL(window.location.origin + window.location.pathname)
        newUrl.searchParams.set("people", this.state.people)
        newUrl.searchParams.set("price", this.state.price)
        newUrl.searchParams.set("beds", this.state.beds)
        newUrl.searchParams.set("sortby", this.state.sortby)
        newUrl.searchParams.set("place", this.state.searchVal)

        for(var i = 0; i < this.state.amenities.length; i++){
            newUrl.searchParams.append("amenities", this.state.amenities[i])
        }

        for(var i = 0; i < this.state.type.length; i++){
            newUrl.searchParams.append("type", this.state.type[i])
        }

        for(var i = 0; i < this.state.suitability.length; i++){
            newUrl.searchParams.append("suitability", this.state.suitability[i])
        }

        // const newUrl = new URLSearchParams()
        console.log(newUrl.toString())

        window.location.href = newUrl.toString()
        // this.props.getPropertyData()

        this.props.getPropertyData()

    }
    // handle More filter's events and Rental Type handle events
    handleChange=(e)=>{
        const rentalTypeArr=this.state.type
        console.log('rental type')
        console.log(e.target)
        let check=e.target.checked
        // append value to type array
        if(check){
            this.setState({
                type:[...rentalTypeArr, e.target.value]
            })
        } 
        // if rental type is unselect i.e unchecked remove that value from type arr
        else{
            const result= rentalTypeArr.filter((type)=>type!=e.target.value)
            this.setState({
                type:[...result]
            })
        }
    }
    amenitiesHandleChange=e=>{
        const amenitiesArr=this.state.amenities;
        let check=e.target.checked
        // append value to amenities array
        if(check){
            this.setState({
                amenities:[...amenitiesArr, e.target.value]
            })
        } 
        // if amenity is unselected i.e unchecked remove that value from amenities arr
        else{
            const result= amenitiesArr.filter((amenity)=>amenity!=e.target.value)
            this.setState({
                amenities:[...result]
            })
        }
    }
    suitabilityHandleChange=e=>{
        const suitabilityArr=this.state.suitability;
        let check=e.target.checked
        // append value to amenities array
        if(check){
            this.setState({
                suitability:[...suitabilityArr, e.target.value]
            })
        } 
        // if amenity is unselected i.e unchecked remove that value from amenities arr
        else{
            const result= suitabilityArr.filter((type)=>type!=e.target.value)
            this.setState({
                suitability:[...result]
            })
        }
    }
    handleSort=(e)=>{
        this.setState({
            sortby: e.target.value
        })
    }
    handleSearch=e=>{
        this.setState({
            searchVal:e.target.value
        })
        console.log(e.target.value)
    }
     // handle short list
    handleShortList=e=>{
        this.setState({shortListToggle:!this.state.shortListToggle})
    }
    
    render() {
        const {dummydata,searchVal}= this.state;
        const rentalType=['apartment', 'hotel_apartment', 
            'house', 'villa', 'bungalow', 'castle', 'farmhouse', 'studio', 
            'houseboat', 'fort', 'private_room', 'hospital_apartment', 
            'B&B', 'guest_house', 'caravan']
        const amenities=['balcony', 'staffed', 'tv', 'fans', 'linen', 'towels',
            'housekeeper', 'wifi', 'swimming_pool', 'heated_pool', 'washing_machine', 'garden',
            'dvd', 'grill', 'fireplace', 'cot', 'dishwash', 'microwave', 'freezer', 'game', 'sea_view']
        const suitability=['pets', 'parking', 'children', 'smoke', 'elevator', 'wheelchair', 'cars_req']
        const { result } = this.props.data
        let shortListBg= this.state.shortListToggle?'#f7acbc':'red'
        console.log("bg",shortListBg)
        console.log(`primary Data:\n`)
        console.log(`${result}`)
        return (
            <div >
                {/* ******************************Search Box with date picker****************************** */}
                <div className="row my-2 border">
                    {/* searchBar, from date */}
                    <div className='col-6'>
                        <div className='row'>
                           <input type='text'  value={searchVal} onChange={this.handleSearch} className='col-8 border-left-0 border-top-0 border-bottom-0 rounded-0 p-2'/>
                           {/* <FilterResults 
                            value={searchVal}
                            data={dummydata}
                            renderResults={
                                results=>(
                                    results.map(ele=>console.log(ele.name, ele.email))
                                )
                            }
                           /> */}
                            <div className='col-4 p-0 m-0'>
                                <DatePicker
                                    className='border p-2 '
                                    placeholderText='Start Date'
                                    selected={this.state.startDate}
                                    onChange={this.handleStartDate}
                                    selectsStart
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    minDate={this.state.startDate}
                                    // monthsShown={2}
                                />
                            </div>
                        </div>
                    </div>
                    {/* to date, people and search button */}
                    <div className='col-6'>
                        <div className='row'>
                        <div className='col-4 p-0 m-0'>
                            <DatePicker
                                className='border col p-2'
                                placeholderText='End Date'
                                selected={this.state.endDate}
                                onChange={this.handleEndDate}
                                selectsEnd
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                minDate={this.state.startDate}
                                // monthsShown={2}  
                            />
                        </div>
                            <div className='col-4 btn-block border-left mx-0'>
                                    <Dropdown variant='white'className='rounded-0'>
                                        <DropdownToggle variant='white'className='rounded-0 w-100 m-0'>
                                            <Button variant='white' className='p-0 m-0 w-100'>
                                                {this.state.people} people
                                            </Button>
                                        </DropdownToggle> 

                                        <DropdownMenu
                                            alignRight
                                        >
                                            {/* adult */}
                                            <div style={{width:"210px"}} className='mx-3'>
                                                <div className='row m-2 p-1'>
                                                    <div className=' col-6 text-right px-2 lead'>
                                                        Adults 
                                                    </div>
                                                    <div className='col-6'>
                                                        <div className='row  border border-muted'>
                                                            <div className='col-4  m-0 p-0'>
                                                                <Button className='lead font-weight-bold p-1 m-0 btn-block btn-light rounded-0' onClick={this.adultDec}>
                                                                    -
                                                                </Button>
                                                            </div>
                                                            <div className='col-4 m-0 p-1'>
                                                                <div className='text-center'> {this.state.adult} </div>
                                                            </div>
                                                            <div className='col-4  m-0 p-0 text-center'>
                                                                <Button className='lead font-weight-bold p-1 m-0 btn-block btn-light rounded-0'onClick={this.adultInc}>
                                                                    +
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* children */}
                                                <div className='row m-2 p-1'>
                                                    <div className=' col-6 text-right px-2'>
                                                        <div className='row'>
                                                            <div className='col-12 lead my-0 py-0'>
                                                                Children
                                                            </div>
                                                            <div className='col-12 my-0 py-0'>
                                                                <small className='m-0 p-0'>age 0-16</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-6'>
                                                        <div className='row  border border-muted'>
                                                            <div className='col-4  m-0 p-0'>
                                                                <Button className='lead font-weight-bold p-1 m-0 btn-block btn-light rounded-0' onClick={this.childDec}>
                                                                    -
                                                                </Button>
                                                            </div>
                                                            <div className='col-4 m-0 p-1'>
                                                                <div className='text-center'> {this.state.child} </div>
                                                            </div>
                                                            <div className='col-4  m-0 p-0 text-center'>
                                                                <Button className='lead font-weight-bold p-1 m-0 btn-block btn-light rounded-0'onClick={this.childInc}>
                                                                    +
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>                                        
                                            </div>
                                        </DropdownMenu>                               
                                    </Dropdown>
                                </div>
                            {/* ***************** Search Button ********************** */}
                            <button className="col-4 w-100 m-0 btn btn-block text-light rounded-0" style={{background:'#e67618'}} onClick={this.handleClick}>Search</button>
                        </div>
                    </div>
                </div>
                {/* ***************************************** Filters Row ********************************** */}
                <div className="row border">
                    {/* ******************************* per Night ************************** */}
                    <div className='btn-block col-3 border-right mx-0'>
                        <Dropdown variant='white'className='rounded-0'>
                            <DropdownToggle variant='white'className='rounded-0 w-100 m-0'>
                                <Button variant='white' className='p-0 m-0 w-100'>
                                    Per night
                                </Button>
                            </DropdownToggle>
                            <DropdownMenu>
                                <div style={{width:"250px"}} className='mx-3'>
                                    <Dropdown.Header>
                                    <p className='lead text-body m-0 p-0'>
                                        Per night
                                    </p>
                                    </Dropdown.Header>
                                    {/* range slider */}
                                    <Styles opacity={this.state.price > 10 ? (this.state.price / 255) : .1} color={this.props.color}>
                                        <label className="font-weight-bold">Price:0</label>
                                        <input type="range" min={0} max={1000} value={this.state.price} className="slider ml-1" onChange={this.handleOnChange} />
                                        <p className="value">{this.state.price}</p>
                                    </Styles>
                                    <div className='text-right mx-5'>
                                        <Button onClick={this.handleClick} className='rounded-0'> Apply</Button>
                                    </div>
                                </div>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    {/* ******************************* BedRooms *************************** */}
                    <div className='btn-block col-3 border-right m-0'>
                        <Dropdown >
                            <DropdownToggle variant='white'className='rounded-0 w-100 m-0'>
                                <Button variant='white' className='p-0 m-0 w-100'>
                                    Bedrooms
                                </Button>
                            </DropdownToggle>
                            <DropdownMenu>
                                <div style={{width:"250px"}} className='mx-3'>
                                    <div className='row m-2 p-1'>
                                        <div className=' col-6 text-left px-2 lead'>
                                            Bedrooms
                                        </div>
                                        <div className='col-6'>
                                            <div className='row  border border-muted'>
                                                <div className='col-4  m-0 p-0'>
                                                    <Button className='lead font-weight-bold p-1 m-0 btn-block btn-light rounded-0' onClick={this.bedroomsDec}>
                                                        -
                                                    </Button>
                                                </div>
                                                <div className='col-4 m-0 p-1'>
                                                    <div className='text-center'> {this.state.beds} </div>
                                                </div>
                                                <div className='col-4  m-0 p-0 text-center'>
                                                    <Button className='lead font-weight-bold p-1 m-0 btn-block btn-light rounded-0'onClick={this.bedroomsInc}>
                                                        +
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Apply button */}
                                    <div className='text-right mx-3'>
                                        <Button onClick={this.handleClick} className='rounded-0 p-2'> Apply</Button>
                                    </div>
                                </div>
                            </DropdownMenu>
                        </Dropdown>    
                    </div>
                    {/* ******************************* Rental type ************************ */}
                    <div className='btn-block col-3 border-right m-0'>
                        <Dropdown>
                            <Dropdown.Toggle variant='white' className='rounded-0 w-100 m-0'>
                                <Button className='w-100 m-0 p-0'variant='white'>
                                    Rental Type
                                </Button>
                            </Dropdown.Toggle>
                            <Dropdown.Menu 
                                alignRight
                            >
                                <Dropdown.Header><p className='lead text-body m-0 p-0'>Rental Type</p></Dropdown.Header>
                                <Dropdown.Divider />
                                <div className='px-2 ' style={{width:'200px'}}>
                                    {/* adding rental types as a checkbox form */}
                                    {
                                        rentalType.map(type=>(
                                            <div key={type}>
                                                <Form.Check
                                                    type='checkbox'
                                                    label={type}
                                                    onChange={this.handleChange}
                                                    value={type}
                                                    // checked={this.state.isCheck}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            </Dropdown.Menu>
                        </Dropdown >                      
                    </div>
                    {/* ******************************* More Filters *********************** */}
                    <div className='btn-block col-3  m-0'>                       
                        <Dropdown>
                            <DropdownToggle variant='white' className='rounded-0 w-100'>
                            <Button className='w-100 m-0 p-0'variant='white'>
                                More filters
                            </Button>
                            </DropdownToggle>
                            <DropdownMenu
                                alignRight
                            >
                            <Dropdown.Divider/>
                            {/* window size */}
                                <div className='px-3' style={{width:'500px'}}>
                                    <div className='row'>
                                        {/* Amenities */}
                                        <div className='col-3'>
                                            <p className='lead'>Amenities</p>
                                        </div>
                                        <div className='col-9'>
                                            <div className='row'>
                                                {amenities.map(amenity=>(
                                                    <div className='col-6' key={amenity}>
                                                        <Form.Check
                                                            type='checkbox'
                                                            label={amenity}
                                                            onChange={this.amenitiesHandleChange}
                                                            value={amenity}
                                                        />
                                                    </div>

                                                ))}
                                            </div>      
                                        </div>
                                        <div className='col-12'><Dropdown.Divider/></div>
                                        {/* suitability */}
                                        <div className='col-3'>
                                            <p className='lead'>Suitability</p>
                                        </div>
                                        <div className='col-9'>
                                            <div className='row'>
                                                {suitability.map(type=>(
                                                    <div className='col-6' key={type}>
                                                        <Form.Check
                                                            type='checkbox'
                                                            label={type}
                                                            onChange={this.suitabilityHandleChange}
                                                            value={type}
                                                        />
                                                    </div>

                                                ))}
                                            </div>      
                                        </div>
                                    </div>
                                </div> 
                            </DropdownMenu>
                        </Dropdown>     
                    </div>
                </div>
                {/* ******************************** listing page ****************************************** */}
                <div className='row my-2'>
                    <div className="p-0 border ">
                        <div className="row">
                            <div className="d-flex justify-content-between border w-100 mx-3 p-2" style={{background:"#f5f8f9"}}>
                                <div> {result.length} apartment rentals</div>
                                <div className="">
                                    Sort by:
                                    <select name='sortby' value={this.state.sortby} onChange={this.handleSort}>
                                        <option value='relevence'>Relevence</option>
                                        <option value='low'>Price: low to high</option>
                                        <option value='high'>Price: high to low</option>
                                        <option value='reviews'>Number of Reviews</option>
                                    </select>
                                </div>
                            </div>
                            {/* scrolling part */}
                            <div className="col-12 mx-auto">
                                <div className='' style={{overflowY:'scroll', height:710}}>
                                {
                                    result ? result.map((item, ind) => (
                                        <div key={item.property_id} class="card mb-3 m-2 border-0 rounded-0">
                                            <div class="row">
                                                {/* carousel */}
                                                <div class="col-md-5">
                                                    <div id={`s${ind}`} class="carousel slide" data-interval="false">
                                                        <div class="carousel-inner">
                                                            <div class="carousel-item active">
                                                                <img class="d-block w-100 " src={item.image_a} width='300' height='250' alt="First slide" />
                                                            </div>
                                                            <div key = {ind}>
                                                                <div class="carousel-item">
                                                                    <img class="d-block w-100" src={item.image_b} width='300' height='250' alt="Third slide" />
                                                                </div>
                                                                <div class="carousel-item">
                                                                    <img class="d-block w-100" src={item.image_c} width='300' height='250' alt="Forth slide" />
                                                                </div>
                                                                <div class="carousel-item">
                                                                    <img class="d-block w-100" src={item.image_d} alt="Fifth slide" width='300' height='250' />
                                                                </div>
                                                            </div>
                                                                <div >
                                                                    {/* toggle shortList */}
                                                                    <Icons.Heart size={40} style={{position:'absolute' , top:-60, left:30, color:`${shortListBg}`}} />
                                                                </div>
                                                        </div>
                                                        <a class="carousel-control-prev" href={`#s${ind}`} role="button" data-slide="prev">
                                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                            <span class="sr-only">Previous</span>
                                                        </a>
                                                        <a class="carousel-control-next" href={`#s${ind}`} role="button" data-slide="next">
                                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                            <span class="sr-only">Next</span>
                                                        </a>
                                                    </div>
                                                </div>        
                                                <div class="col-md-7">
                                                        <div class="row">
                                                            <div class="col-8">
                                                                {/* dynamic routing */}
                                                            <Link to = {`/results/${item.property_id}`} style={{textDecoration:"none", color:"black", fontFamily:"Arial, Helvetica, sans-serif"}} >
                                                                    <h5 class="m-0 p-0" >
                                                                        {item.name}
                                                                    </h5>
                                                            </Link>
                                                                <p class=" m-0">{item.type}</p>
                                                                <p class=" mt-0">{item.bed} bedrooms/ 2 bathrooms/ sleep {item.no_people}</p>
                                                            </div>

                                                            <div className="col-4 text-right ">
                                                                <p className="my-0 text-muted "style={{fontSize:15}} >Price per night from</p>
                                                                <h4 class="my-0">${item.price}</h4>
                                                                <p className="my-0 text-muted" style={{fontSize:15}} >${`${item.price*7}`}-{`${item.price*8}`}/ week</p>
                                                            </div>
                                                            {/* about property */}
                                                            <p className='text-muted my-0 ml-3 w-75' style={{fontSize:16}}><strong>“Best stay yet!!”</strong> Me and my girlfriends (5) stayed here for our NYC stay! Suzanne and Edgar are AMAZING hosts! The apartment is clean,</p>
                                                            <p className='mx-2'>
                                                                <Icons.ClockHistory size={15} className='mx-2' />
                                                                Responds fast! avg. 1 hour 50 minutes
                                                            </p>
                                                        </div>
                                                        {/* button */}
                                                        <div className='col text-right m-0 p-0 '>
                                                            <Link to = {`/results/${item.property_id}`}>
                                                                <button className="btn px-4 mb-0 text-white" style={{background:'#0076df'}} >Book</button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    )) :
                                        <div className="card card-fluid">
                                            <div className="row">
                                                <div className="col-12 text-center py-5 my-5">
                                                    <img src="https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg"  width='250px'alt="loading" />
                                                </div>
                                            </div>

                                        </div>
                                }
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        data: state.reducerCommon.primaryData,
        landingText: state.reducreLanding.landingText
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPropertyData: payload => dispatch(getPropertyData(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultCard)