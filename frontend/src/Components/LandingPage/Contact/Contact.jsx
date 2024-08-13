import React from 'react'
import './Contact.css'
import { MdCall } from 'react-icons/md'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { FaApple } from "react-icons/fa";
import { RiGooglePlayFill } from "react-icons/ri"



const Contact = () => {
    return (
        <section className='c-wrapper' id='contact-us'>
            <div className="paddings innerWidth flexCenter c-container">
                {/* Left side */}
                <div className="flexColStart c-left">
                    <span className='orangeText hi'>Our Contacts</span>
                    <span className='primaryText hii'>Easy to Contact Us</span>
                    <span className='secondaryText'>We are ready to help by providing the best solutions for our clients</span>


                    <div className="flexColStart contactModes">
                        {/* first row */}
                        <div className="flexStart row">
                            <div className="flexColCenter mode">
                                <div className="flexStart">
                                    <div className="flexCenter icon">
                                        <MdCall size={25} />
                                    </div>
                                    <div className="flexColStart detail">
                                        <span className='primaryText'>Call</span>
                                        <span className='secondaryText'>+91 91512 17408</span>
                                    </div>
                                </div>
                                <div className="flexCenter button">Call Now</div>
                            </div>

                            {/* second mode */}
                            <div className="flexColCenter mode">
                                <div className="flexStart">
                                    <div className="flexCenter icon">
                                        <BsFillChatDotsFill size={25} />
                                    </div>
                                    <div className="flexColStart detail">
                                        <span className='primaryText'>Email</span>
                                        <span className='secondaryText'>heal@healbuddy.care</span>
                                    </div>
                                </div>
                                <div className="flexCenter button">Mail Now</div>
                            </div>
                        </div>

                        {/* second row */}
                        <div className="flexStart row">
                            <div className="flexColCenter mode">
                                <div className="flexStart">
                                    <div className="flexCenter icon">
                                        <FaApple size={25} />
                                    </div>
                                    <div className="flexColStart detail">
                                        <span className='primaryText'>Heal App</span>
                                        <span className='secondaryText'>IOS</span>
                                    </div>
                                </div>
                                <div className="flexCenter button">Install Now</div>
                            </div>

                            {/* fourth mode */}
                            <div className="flexColCenter mode">
                                <div className="flexStart">
                                    <div className="flexCenter icon">
                                        <RiGooglePlayFill size={25} />
                                    </div>
                                    <div className="flexColStart detail">
                                        <span className='primaryText'>Heal App</span>
                                        <span className='secondaryText'>Andriod</span>
                                    </div>
                                </div>
                                <div className="flexCenter button">Install Now</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right side */}
                <div className="c-right">
                    <div className="image-container">
                        <img src="./contact.png" alt="" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact