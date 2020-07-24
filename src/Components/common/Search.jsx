import React from "react";
// import { getFilteredData } from '../../redux/Common/action'
import {connect} from "react-redux";
import styled from 'styled-components';
import { getPropertyData } from '../../redux/Common/action'
import {Link} from 'react-router-dom'

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


// import {useParams} from 'react-router-dom'

class Search extends React.Component{ 
    //filter props are [people, bedroom, price]
    constructor(props){
        super(props)
        this.state={
            people:1,
            adult:1,
            beds:1,
            child:0,
            price:50
        }
    }
    handleOnChange = (e) => 
        this.setState(
            { price: e.target.value },
                console.log(e.target.value)
        ) 
    componentDidUpdate=()=>{
        console.log('slider')
        console.log(this.state.value)
    }
    
    adultInc=()=>{
        
        this.setState({
            adult:this.state.adult+1,
            people:this.state.people+1
        })
        console.log(this.state.adult)
    }
    adultDec=()=>{
        if(this.state.adult>1){

            this.setState({
                adult:this.state.adult-1,
                people:this.state.people-1
            })
            console.log(this.state.adult)
        }
    }
    childInc=()=>{
        this.setState({
            child:this.state.child+1,
            people:this.state.people+1
        })
        console.log(this.state.child)
    }
    childDec=()=>{
        if(this.state.child>0){

            this.setState({
                child:this.state.child-1,
                people:this.state.people-1
            })
            console.log(this.state.child)
        }
    }
    bedroomsDec=()=>{
        if(this.state.bedrooms>1){
            this.setState({
                bedrooms:this.state.bedrooms-1
            })
        }
    }
    bedroomsInc=()=>{
        if(this.state.bedrooms<=15){
            this.setState({
                bedrooms:this.state.bedrooms+1
            })
        }
    }

    componentDidMount() {
        this.props.getPropertyData()
    }


    handleClick = () => {

        // this.props.history.push("/results")
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.set("people",this.state.people)
        newUrl.searchParams.set("price",this.state.price)
        newUrl.searchParams.set("beds",this.state.beds)

        // const newUrl = new URLSearchParams()
        console.log(newUrl.toString())
        window.location.href = newUrl.toString()
        // this.props.getPropertyData()

        this.props.getPropertyData()
        
    }

    render(){
        const {type_search} = this.props
        
        if(type_search == "Homes"){
            return(
                    <div className="col-12 p-1">
                        <div className="row mx-auto" >
                            <input placeholder="Where do you want to go?" className="form-control col-6"/>
                            <input type="date" className="form-control col-2"/>
                            <input type="date" className="form-control col-2"/>
                            <Link to="/results"><button className="form-control col-2 btn btn-warning text-light" onClick={this.handleClick}>Search</button></Link>
                            
                        </div>
                    </div>
            )
        }
        else{
            return(
                <div>

                </div>
            )
        }
        
    }
}

const mapStateToProps = state => {
    return{
        data: state.reducerCommon.primaryData

    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         getFilteredData: payload => dispatch(getFilteredData(payload))
//     }
// }

const mapDispatchToProps = dispatch => {
    return {
        getPropertyData: payload => dispatch(getPropertyData(payload))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Search)

// export default Search