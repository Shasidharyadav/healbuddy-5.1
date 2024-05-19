import React, { useRef, useState } from 'react';
import './Footer.css';
import emailjs from '@emailjs/browser';
import Modal from './Modal';

const Footer = () => {
    const form = useRef();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            "service_rlcrysy",
            "template_2ruh2ed",
            form.current,
            "DV37GRLngGSjwholG"
        ).then(
            (result) => {
                setModalMessage("Message sent successfully!");
                setIsModalOpen(true);
                form.current.reset(); 
            },
            (error) => {
                setModalMessage(`Failed to send message: ${error.text}`);
                setIsModalOpen(true);
            }
        );
    };

    const closeModal = () => setIsModalOpen(false);

    return (
        <section className="f-wrapper">
            <Modal isOpen={isModalOpen} close={closeModal}>
                <p>{modalMessage}</p>
            </Modal>
            <div className="paddings innerWidth flexCenter f-container">
                <div className='qr'>
                    <img src="./qr1.png" alt="" width={320} height={250} />
                </div>
                
                <form className='form' ref={form} onSubmit={sendEmail}>
                    <label><strong>Name</strong></label>
                    <input type="text" name="user_name" />
                    <label><b>Email</b></label>
                    <input type="email" name="user_email" />
                    <label><b>Message</b></label>
                    <textarea name="message" />
                    <input type="submit" value="Send" />
                </form>
                <div className="flexColStart f-left">
                    <img src="./logo.png" alt="" width={150} height={100} />
                    <span className="secondaryText">HealBuddy envisions a world where pain is met
                        <br /> with support, understanding, and effective solutions for all.</span>
                </div>
                <div className="flexColStart f-right">
                    <span className='primaryText'>Location</span>
                    <span className='secondaryText'>Mumbai, Maharashtra, India.</span>
                    <div className="flexCenter f-menu">
                        <span>Our Approach</span>
                        <span>Exercises</span>
                        <span>Learning Centre</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;