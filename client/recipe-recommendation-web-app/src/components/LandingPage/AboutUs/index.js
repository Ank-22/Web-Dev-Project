import React from 'react';
import Food from '../../../img/food.png'

const AboutUs = () => {
    return(
        <div style={{ display: 'flex' }}>

            <div className="col-md-6">
                <h3 className="fw-bold">ABOUT US</h3>
                <div>
                    <p>
                        We are an open source community, where we share the wonderful joys of the worlds.
                    </p>
                </div>
                <div style={{ display: 'flex' }}>
                    <div className="col-md-3">
                        <p>Insert Here</p>
                    </div>
                    <div className="col-md-3">
                        <p>Insert Here</p>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <img src={Food} alt="Food" style={{ width: '500px', height: '500px' }}/>
            </div>
        </div>
    );
}

export default AboutUs;