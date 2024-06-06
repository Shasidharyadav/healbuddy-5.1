import React from 'react';
import "./Pain.css"; // Ensure this path is correct based on your project structure
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Pain = () => {
    let navigate = useNavigate(); // Initialize useNavigate hook for navigation

    const handleAssessmentClick = () => {
        navigate('/assessment-home'); // Navigate to the Assessment Home page when the button is clicked
    };

    return (
        <section className="v-wrapper" id='learn'>
            <div className="app">
                <div className="main-content">
                    <div className="left-side flexColStart v-right r-head">
                        <span className='orangeText'>Pain Quotient Index (PQI)</span>
                        <span className='primaryText'>Are you having Pain?<br/></span>
                        <span className='secondaryText hel'>Our muscular system is designed to carry more than 70% of our body's load. When our muscles are not healthy, this load gets transferred to our bones that have not been used to carrying the sudden load. This leads to a degenerative process in the system. This causes the first symptoms of pain. The pain may initially be acute or chronic but if not timely cared for, may aggravate further.
                        <br/><br/>A Care Continuum is essential to not only prevent the pain from aggravating but also strengthening the weakened muscles so that the root cause of the problem is addressed.</span>                          
                        <div className="paddings innerWidth g-container">
                            <div className="flexColCenter inner-container">
                                <span className='primaryText'>Get Started with Heal Buddy</span>
                                <span className='secondaryText'>Discover Your Pain Score Instantly with Our GPT-Powered Assessment Test.</span>
                                <button className="button" onClick={handleAssessmentClick}>
                                    Take Assessment
                                </button>
                            </div>
                        </div>
                        </div>

                    {/* Right Side */}
                    <div className="right-side">
                        {/* Images Above */}
                        <div className="images-above">
                            <div className="video-containe">
                                <video src="./image11.mp4" autoPlay muted loop></video>
                                <div className="image-overlay">
                                    <p>Assess your Pain</p>
                                </div>
                            </div>
                        </div>
                        

                        {/* Images Below */}
                        <div className="images-below">
                            <div className='extra'>
                                <div className="video-containerr">
                                    <video src="./image11.mp4" autoPlay muted loop></video>
                                    <div className="image-overlay">
                                        <p>Assess your Pain</p>
                                    </div>
                                </div>
                            </div>
                            <div className="video-containerr">
                                <video src="./image12.mp4" autoPlay muted loop></video>
                                <div className="image-overlay">
                                    <p>Consult a Specialist</p>
                                </div>
                            </div>
                            <div className="video-containerr">
                                <video src="./image14.mp4" autoPlay muted loop></video>
                                <div className="image-overlay">
                                    <p>Start your Care</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Pain;
