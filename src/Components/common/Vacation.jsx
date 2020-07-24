import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../fontAwesome/fontAwesome'
class Vacation extends React.Component{
    render(){
        const vacationBg={background:'#ececec'}
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
                {/* envelop-open text LOGO */}
                <div className='col-12'>
                    <FontAwesomeIcon 
                        icon={["fas", 'envelope-open-text']} 
                        className='p-3 text-warning'
                        size='4x'
                        style={{borderRadius:"50%", background:"#0075dd"}}
                    />
                </div>

                <div className='col-12'>
                    <h4>Looking for vacation inspiration?</h4>
                    <p className='text-black-50'>Get the best deals and personalised recommendations, straight to your inbox (you can unsubscribe at any time).</p>
                </div>

                <div className='col-lg-6 col-md-8 offset-md-2 offset-lg-3'>
                    <div className="input-group mb-3 ">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Just enter your email address" 
                            aria-label="Recipient's username" 
                            aria-describedby="button-addon2" 
                        />
                        <div className="input-group-append ">
                            <button 
                                className="btn btn-info bnt-block px-5" 
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