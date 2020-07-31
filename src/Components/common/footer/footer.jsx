import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../fontAwesome/fontAwesome';
import './footer.css';
const Footer=()=>{
    return(
        <div className='bg-white '>
            <hr/>
            <div className='container py-3 '>
                <div className='row text-left'>
                    {/* About Us */}
                    <div className="col-xl-2 col-md-2">
                        <p className="lead">About Us</p>
                        <div className='hover muted text-muted'>
                            <p>About FlipKey</p>
                            <p>Blog</p>
                            <p>Trip Ideas</p>
                            <p>Galleries</p>
                            <p>Terms & conditions</p>
                            <p>List your property</p>
                        </div>
                    </div>
                    {/* Love for FlipKey  */}
                    <div className="col-xl-4 col-md-4 ">
                        <p className="lead">Love for FlipKey</p>
                        <div className='hover text-muted text-uppercase'>
                            <p>As featured in USA TODAY and recommended by Travel + Leisure in its annual Villa Guide:</p>
                        </div>
                        <p className="lead">
                            FlipKey Elsewhere
                        </p>
                        <div className='d-flex justify-content-start icon_hover'>
                            <FontAwesomeIcon icon={["fab",'facebook-square']} size="2x"/>
                            <FontAwesomeIcon icon={['fab', 'twitter-square']} size="2x"/>
                            <FontAwesomeIcon icon={['fab', 'instagram-square']}size="2x"/>
                        </div>
                    </div>
                    {/*New to FlipKey*/}
                    <div className="col-xl-6 col-md-6">
                        <p className='lead'>New to FlipKey?</p>
                        <div className='hover text-muted text-uppercase'>
                            <p>FlipKey is a vacation rental marketplace with more than 300,000 rentals around the world. Find the perfect place to stay for your trip, and get great value along with the space, privacy and amenities of home. </p>
                        </div>
                        <p className='hover m-0 text-muted text-uppercase'>Find the vacation rental perfect for you.</p>
                        <small className='m-0 p-0 text-muted text-uppercase'>Copyright © 2020, FlipKey Inc. All rights reserved.</small>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer