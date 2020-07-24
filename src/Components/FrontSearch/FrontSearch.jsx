import React from "react";
import Search from '../common/Search'

export class FrontSearch extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
                <div key="search">
                        <div  className="container-fluid" style={{backgroundImage :"url('https://image.shutterstock.com/image-photo/world-environment-day-concept-sun-260nw-264026870.jpg')", backgroundRepeat: "no-repeat",
                                backgroundSize:"cover", height:"600px"}}>
                            <Search />
                        </div>
                    
                </div>
            
        )
    }
}