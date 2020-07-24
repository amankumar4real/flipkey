import React from "react";
import {connect} from "react-redux";


class Search extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        const {type_search} = this.props
        
        if(type_search === "nHome"){
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

                                    <div class="dropdown col-2">
                                        <button class="btn dropdown-toggle btn-info col-12" type="button" data-toggle="dropdown">
                                            2 People
                                        </button>
                                        <div class="dropdown-menu col-11">
                                            <div className="col-12">
                                                <div className="row mx-auto">
                                                    {/* <div > */}
                                                        Adults
                                                    {/* </div> */}
                                                    {/* <div > */}
                                                        <button className="btn btn-light">-</button>
                                                    {/* </div> */}
                                                    {/* <div > */}
                                                        2
                                                    {/* </div> */}
                                                    {/* <div > */}
                                                        <button className="btn btn-light">+</button>
                                                    {/* </div> */}
                                                </div>
                                                <div className="row mx-auto mt-2">
                                                    {/* <div> */}
                                                        Child
                                                    {/* </div> */}
                                                    {/* <div > */}
                                                        <button className="btn btn-light">-</button>
                                                    {/* </div> */}
                                                    {/* <div > */}
                                                        2
                                                    {/* </div> */}
                                                    {/* <div > */}
                                                        <button className="btn btn-light">+</button>
                                                    {/* </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="form-control col-2 btn btn-warning text-light">Search</button>
                                </div>
                            </div>
                        </div>
                    
                        <div className="row">
                            <div class="dropdown col-3">
                                <button class="btn dropdown-toggle btn-outline col-12" type="button" data-toggle="dropdown">
                                    Per night
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
                                    Bedrooms
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
        type_search: state.reducerCommon.type_search,
        url: state.reducerCommon.url

    }
}

const mapDispatchToProps = dispatch => {
    return{
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)