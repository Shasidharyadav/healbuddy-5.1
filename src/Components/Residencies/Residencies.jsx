import React from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import "swiper/css"
import './Residencies.css'
import data from '../../utils/slider.json'
import { sliderSettings } from '../../utils/common'

const Residencies = () => {
    return ( 
    <section className='r-wrapper' id='mqi'>
            <div className="padding innerWidth r-container">
                <div className="r-head flexColStart">
                    <span className='orangeText headings'>Muscle Quotient Index (MQI)</span>
                    <span className='primaryText heading'>Check your Muscle Wellness Score</span>
                </div>
                <br/>
                <br/>
            
                <Swiper {...sliderSettings}>
                    <SliderButtons />
                    {
                        data.map((card, i) => (
                            <SwiperSlide key={i}>
                                <div className="flexColStart r-card">
                                <img src={card.image} alt="home" id='img' />
                                <span className="secondaryText r-price">
                                        <span style={{ color: "orange" }}></span>
                                        <span>{card.price}</span>
                                </span>       
                                <span className='primaryText name' id='name'>{card.name}</span>
                                <span className='secondaryText'>{card.detail}</span>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
                <div>
                    <br/>
                    <br/>
                </div>
                <div className="buti">
                    <button className="button mqii">
                            <a href="#contact-us" onClick={() => scrollToSection('contact-us')}>Check MQI</a>
                    </button>
                    </div>
            </div>
        </section>
    )
}

export default Residencies

const SliderButtons = () => {
    const swiper = useSwiper();
    return (
          <div className="flexCenter r-buttons">
            <button id="prevButton" onClick={() => swiper.slidePrev()}>&lt;</button>    
            <button id="nextButton" onClick={() => swiper.slideNext()}>&gt;</button>       
          </div>
    )
}