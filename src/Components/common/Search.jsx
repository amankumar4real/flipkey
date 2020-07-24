import React from "react";
import {connect} from "react-redux";
import styled from 'styled-components';
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

class Search extends React.Component{
    constructor(props){
        super(props)
        this.state={
            people:1,
            adult:1,
            bedrooms:1,
            child:0,
            value:50
        }
    }
    handleOnChange = (e) => 
        this.setState(
            { value: e.target.value },
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
    render(){
        const {type_search} = this.props
        
        if(type_search == "Homes"){
            return(
                    <div className="col-12 p-1">
                        <div className="row mx-auto" >
                            <input placeholder="Where do you want to go?" className="form-control col-6"/>
                            <input type="date" className="form-control col-2"/>
                            <input type="date" className="form-control col-2"/>
                            <button className="form-control col-2 btn btn-warning text-light">Search</button>
                            
                        </div>
                    </div>
            )
        }
        else{
            return(
                <div>
                        <div className="row mx-auto" >
                            <div className="col-12 p-1 ">
                                <div className="row mx-auto" >
                                    <input className="form-control col-4"/>

                                    <input type="date" className="form-control col-2"/>

                                    <input type="date" className="form-control col-2"/>
{/* people inc dec */}
                                    <div class="dropdown col-2">
                                        <button class="btn dropdown-toggle btn-info col-12" type="button" data-toggle="dropdown">
                                            ({this.state.people}) People
                                        </button>
                                        <div class="dropdown-menu col-11">
                                            <div className="col-12">
                                                <div className="row mx-auto">
                                                        Adults
                                                    <button className="btn btn-light" onClick={this.adultDec}>-</button>
                                                    <div>
                                                        {this.state.adult}
                                                    </div>
                                                    <button className="btn btn-light" onClick={this.adultInc}>+</button>
                                                </div>
                                                <div className="row mx-auto mt-2">
                                                    Child
                                                    <button className="btn btn-light" onClick={this.childDec}>-</button>
                                                    <div>
                                                    {this.state.child}
                                                    </div>
                                                    <button className="btn btn-light" onClick={this.childInc}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="form-control col-2 btn btn-warning text-light">Search</button>
                                </div>
                            </div>
                        </div>
                        {/* per Night */}
                        <div className="row">
                            <div class="dropdown col-3">
                                <button class="btn dropdown-toggle btn-outline col-12" type="button" data-toggle="dropdown">
                                    Per night
                                </button>
                                <div class="dropdown-menu col-11">
                                <Styles opacity={this.state.value > 10 ? (this.state.value / 255) : .1} color={this.props.color}>
                                    <label className="font-weight-bold">Price:0</label>
                                    <input type="range" min={0} max={1000} value={this.state.value} className="slider ml-1" onChange={this.handleOnChange} />
                                    <p className="value">{this.state.value}</p>
                                </Styles>
                                </div>
                            </div>
{/* BedRooms */}
                            <div class="dropdown col-3">
                                <button class="btn dropdown-toggle btn-outline col-12" type="button" data-toggle="dropdown">
                                    Bedrooms
                                </button>
                                <div class="dropdown-menu col-11">
                                    <div className="col-12">
                                        <div className="row mx-auto">
                                            <button className="btn btn-light" onClick={this.bedroomsDec}>-</button>
                                            <div>{this.state.bedrooms}</div>
                                            <button className="btn btn-light" onClick={this.bedroomsInc}>+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="dropdown col-3">
                                <button class="btn dropdown-toggle btn-outline col-12" type="button" data-toggle="dropdown">
                                    Rental types
                                </button>
                                <div class="dropdown-menu col-11">
                                    <div className="col-12">
                                        <div className="row mx-auto">
                                            Adults
                                            <button className="btn btn-light">-</button>
                                            2
                                            <button className="btn btn-light">+</button>
                                        </div>
                                        <div className="row mx-auto mt-2">
                                            Child
                                            <button className="btn btn-light">-</button>
                                            2
                                            <button className="btn btn-light">+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="dropdown col-3">
                                <button class="btn dropdown-toggle btn-outline col-12" type="button" data-toggle="dropdown">
                                    More filters
                                </button>
                                <div class="dropdown-menu col-11">
                                    <div className="col-12">
                                        <div className="row mx-auto">
                                            Adults
                                            <button className="btn btn-light">-</button>
                                            2
                                            <button className="btn btn-light">+</button>
                                        </div>
                                        <div className="row mx-auto mt-2">
                                            Child
                                            <button className="btn btn-light">-</button>
                                            2
                                            <button className="btn btn-light">+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            )
        }
        
    }
}

const mapStateToProps = state => {
    return{
        type_search: state.reducerCommon.type_search
    }
}

const mapDispatchToProps = dispatch => {
    return{
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)