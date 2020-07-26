import React from 'react'
import { connect } from 'react-redux'
import { getPropertyData } from '../../redux/Common/action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';
import { Dropdown, Button,ButtonGroup, Form, FormCheck } from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';


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




class ResultCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            people: 1,
            adult: 1,
            beds: 1,
            child: 0,
            price: 50,
            type: [],
            bath: 1,
            amenities: [],
            suitability: [],
        }
    }
    handleOnChange = (e) => {
        this.setState(
            { price: e.target.value },
            console.log(e.target.value)
        )
        // setTimeout(()=>{
        //     this.props.getPropertyData()
        // },2000)
        this.props.getPropertyData()
    }

    componentDidUpdate = () => {
        console.log('selected rental type')
        console.log(this.state.type)
        console.log('selected amenity type')
        console.log(this.state.amenities)
        console.log('selected suitability type')
        console.log(this.state.suitability)
    }

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

    componentDidMount() {
        this.props.getPropertyData()
    }


    handleClick = () => {

        // this.props.history.push("/results")
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.set("people", this.state.people)
        newUrl.searchParams.set("price", this.state.price)
        newUrl.searchParams.set("beds", this.state.beds)

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
    render() {
        {/* type of property- apartment, hotel_apartment, 
                        house, villa, bungalow, castle, farmhouse, studio, 
                        houseboat, fort, private_room, hospital_apartment, 
                        B&B, guest_house, caravan 
        -----------------------------------------------------------
            values for amenities:
            balcony, staffed, tv, fans, linen, towels,
            housekeeper, wifi, swimming_pool, heated_pool, washing_machine, garden,
            dvd, grill, fireplace, cot, dishwash, microwave, freezer, game, sea_view
        ------------------------------------------------------------
            values for Suitability:
            pets, parking, children, smoke, elevator, wheelchair, cars_req
        */}
                    
        const rentalType=['apartment', 'hotel_apartment', 
            'house', 'villa', 'bungalow', 'castle', 'farmhouse', 'studio', 
            'houseboat', 'fort', 'private_room', 'hospital_apartment', 
            'B&B', 'guest_house', 'caravan']
        const amenities=['balcony', 'staffed', 'tv', 'fans', 'linen', 'towels',
            'housekeeper', 'wifi', 'swimming_pool', 'heated_pool', 'washing_machine', 'garden',
            'dvd', 'grill', 'fireplace', 'cot', 'dishwash', 'microwave', 'freezer', 'game', 'sea_view']
        const suitability=['pets', 'parking', 'children', 'smoke', 'elevator', 'wheelchair', 'cars_req']
        const { result } = this.props.data

        console.log(result)

        return (
            <div>
                <div className="row mx-auto" >
                    <div className="col-12 p-1 ">
                        <div className="row mx-auto" >
                            <input className="form-control col-4" />

                            <input type="date" className="form-control col-2 rounded-0" />

                            <input type="date" className="form-control col-2 rounded-0" />
                            {/* ***************** people ********************** */}
                            <Dropdown >
                                <DropdownToggle variant='white'className='border rounded-0'>
                                    <Button variant='white' className='p-0 m-0'>
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
                            {/* ***************** Search Button ********************** */}
                            <button className="form-control col-2 btn btn-warning text-light" onClick={this.handleClick}>Search</button>
                        </div>
                    </div>
                </div>
                <div className="row mx-2">
                    
                    {/* ******************************* per Night ************************** */}
                    <Dropdown variant='white'className='rounded-0'>
                        <DropdownToggle variant='white'className='border rounded-0'>
                            <Button variant='white' className='p-0 m-0'>
                                Per night
                            </Button>
                            <DropdownMenu>
                                <div style={{width:"250px"}} className='mx-3'>
                                    <Dropdown.Header>
                                    <p className='lead text-body m-0 p-0'>
                                        Per night
                                    </p>
                                    </Dropdown.Header>
                                    <Styles opacity={this.state.price > 10 ? (this.state.price / 255) : .1} color={this.props.color}>
                                        <label className="font-weight-bold">Price:0</label>
                                        <input type="range" min={0} max={1000} value={this.state.price} className="slider ml-1" onChange={this.handleOnChange} />
                                        <p className="value">{this.state.price}</p>
                                    </Styles>
                                    <div className='text-right mx-5'>
                                        <Button className='rounded-0'> Apply</Button>
                                    </div>
                                </div>
                            </DropdownMenu>
                        </DropdownToggle>
                    </Dropdown>
                    
                    {/* ******************************* BedRooms *************************** */}
                    <Dropdown variant='white'className='rounded-0'>
                        <DropdownToggle variant='white'className='border rounded-0'>
                            <Button variant='white' className='p-0 m-0'>
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
                                    <Button className='rounded-0 p-2'> Apply</Button>
                                </div>
                            </div>
                        </DropdownMenu>
                    </Dropdown>
                    
                    {/* ******************************* Rental type ************************ */}
                    <Dropdown>
                        <Dropdown.Toggle variant='white' className='border rounded-0'>
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
                    
                    {/* ******************************* More Filters *********************** */}
                    <Dropdown>
                        <DropdownToggle variant='white' className='border rounded-0'>
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
                <div>
                    <div className="card">
                        <div className="row mb-3">
                            <div className="col-12">
                                <div className="float-left">Cabins</div>
                                <div className="float-right">
                                    <div class="dropdown show">Sortby : Relevance
                                                <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <div class="dropdown-item" href="#">Action</div>
                                            <div class="dropdown-item" href="#">Another action</div>
                                            <div class="dropdown-item" href="#">Something else here</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {
                                result ? result.map(item => (
                                    <div key={item.property_id} class="card mb-3 card-fluid overflow-auto">
                                        <div class="row">
                                            {typeof item.image == "string" ?
                                                <div class="col-md-5 fill">
                                                    <img className="img-card img-fluid" src={item.image} />
                                                </div>
                                                :

                                                <div class="col-md-5 fill">
                                                    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                                                        <div class="carousel-inner">
                                                            <div class="carousel-item active">
                                                                <img class="d-block w-100" src={item.image_a} alt="First slide" />
                                                            </div>
                                                            {
                                                                <div key = "myin">
                                                                    <div class="carousel-item">
                                                                        <img class="d-block w-100" src={item.image_b} alt="Third slide" />
                                                                    </div>
                                                                    <div class="carousel-item">
                                                                        <img class="d-block w-100" src={item.image_c} alt="Forth slide" />
                                                                    </div>
                                                                    <div class="carousel-item">
                                                                        <img class="d-block w-100" src={item.image_d} alt="Fifth slide" />
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


                                            }

                                            <div class="col-md-7">
                                                <div class="container container-fluid">
                                                    <div class="row">
                                                        <div class="col-8">
                                                            <h5 class="col-12  mt-2"><strong>{item.name}</strong></h5>
                                                            <p class=" col-12  mt-2">People: {item.no_people}</p>
                                                            <p class=" col-12  mt-2">No. of Bedrooms:{item.bed}</p>
                                                            <p class=" col-12  mt-2">Property Type:{item.type}</p>
                                                            <button className="btn btn-light" onClick={this.shortList}>
                                                                <FontAwesomeIcon
                                                                    icon={["fas", 'heart']}
                                                                    style={{ color: '#f7acbc' }}
                                                                /></button>
                                                        </div>

                                                        <div className="col-4">
                                                            <p className="mb-0 " ><small>Price per ight</small></p>
                                                            <p class="mt-0 mb-5"><strong>${item.price}</strong></p>
                                                            <button className="btn btn-primary btn-fluid mt-5 mr-1" onClick={this.booking}>Book</button>
                                                        </div>
                                                    </div>
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
        )

    }
}

const mapStateToProps = (state) => {
    return {
        data: state.reducerCommon.primaryData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPropertyData: payload => dispatch(getPropertyData(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultCard)