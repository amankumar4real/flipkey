import React from 'react';
import { FaBeer } from 'react-icons/fa';

class Vacation extends React.Component{
    render(){
        return(
            <div className='text-center mx-0'>
               {/* 
                 1. circle at center
                 2. h3 text
                 3. sub text
                 4. input with joinus Button
                 5. hr 
                */}
                <hr/>
                <div className='col-12'>
                     <FaBeer  size='40px' className='bg-info'style={{borderRadius:"50%"}}/>                
                </div>

                <div className='col-12'>
                    <h2>Looking for vacation inspiration?</h2>
                    <p className='text-black-50'>Get the best deals and personalised recommendations, straight to your inbox (you can unsubscribe at any time).</p>
                </div>

                <div className='col-12'>
                    <div className="input-group mb-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Just enter your email address" 
                            aria-label="Recipient's username" 
                            aria-describedby="button-addon2" 
                        />
                        <div className="input-group-append">
                            <button 
                                className="btn btn-info px-5" 
                                type="button" 
                                id="button-addon2"
                            >
                                Join us
                            </button>
                        </div>
                    </div>
                {/* terms of use Privacy policy */}
                <small>Terms of use | Privacy policy</small>
                </div>
            </div>        
        )
    }
}

export default Vacation