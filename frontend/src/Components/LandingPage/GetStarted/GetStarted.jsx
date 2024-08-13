import React from 'react'
import './GetStarted.css'

const GetStarted = () => {
    return (
        <section className="g-wrapper">
            <div className="paddings innerWidth g-container">
                <div className="flexColCenter inner-container">
                    <span className='primaryText'>Get Started with Heal Buddy</span>
                    <span className='secondaryText'>Discover Your Pain Score Instantly with Our GPT-Powered Assessment Test.</span>
                    <button className="button">
                        <a href="mailto:heal@healbuddy.care">Take Assessment</a>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default GetStarted