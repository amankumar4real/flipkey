import React from "react";
import Search from '../common/Search'

export default class FrontSearch extends React.Component {
    
    render(){
        return(
                <div key="search">
                        <div  className="container-fluid" style={{backgroundImage :"url('https://image.shutterstock.com/image-photo/world-environment-day-concept-sun-260nw-264026870.jpg')", backgroundRepeat: "no-repeat",
                                backgroundSize:"cover", height:"400px"}}>
                            <div className='container py-5'>
                                <div className='container my-5 py-5'>
                                    <div className='h1 text-white text-center'>
                                    Find the perfect vacation rental
                                    </div>
                                    <Search />
                                </div>
                            </div>        
                        </div>
                    
                </div>
            
        )
    }
}