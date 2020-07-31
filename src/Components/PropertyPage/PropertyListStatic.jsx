import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../fontAwesome/fontAwesome';
const PropertyListStatic=()=>{
    return(
        <div>
            <div className='bg-white pt-4 text-center'>
            <div className='col-12'>
                    <FontAwesomeIcon 
                        icon={["fas", 'home']} 
                        className='p-3 text-white'
                        size='4x'
                        style={{borderRadius:"50%", background:"#ca6c1a"}}
                    />
            </div>
            <div className='col-12 py-2'>
                    <h3>List your property with the world's largest travel community.</h3>
                    <p className=''>Earn money by renting out your vacation rental, home, or room on TripAdvisor.</p>
                </div>
            </div>
        </div>
    )
}
export default PropertyListStatic