import React, { useState } from 'react';
import './Header.css';
import { BiMenuAltRight } from 'react-icons/bi';
import OutsideClickHandler from 'react-outside-click-handler';

const Header = () => {
    const [menuOpened, setMenuOpened] = useState(false);

    const getMenuStyles = (menuOpened) => {
        if (document.documentElement.clientWidth <= 800) {
            return { right: !menuOpened && "-100%" };
        }
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setMenuOpened(false);
        }
    };

    return (
        <section className="h-wrapper">
            <div className="flexCenter paddings innerWidth h-container">
                <img src="./logo.png" alt="logo" width={130} height={60} />

                <OutsideClickHandler onOutsideClick={() => {
                    setMenuOpened(false);
                }}>
                    <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
                        <a href="#our-cares" onClick={() => scrollToSection('our-cares')}>About Us</a>
                        <a href="#about-pain" onClick={() => scrollToSection('about-pain')}>Muscle Care</a>
                        <a href="#learn" onClick={() => scrollToSection('learn')}>Knowledge</a>
                        <button className="button">
                            <a href="#mqi" onClick={() => scrollToSection('mqi')}>Muscle Quotient Index</a>
                        </button>                        <button className="button">
                            <a href="#contact-us" onClick={() => scrollToSection('contact-us')}>Consult a Specialist</a>
                        </button>
                    </div>
                </OutsideClickHandler>
                <div className="menu-icon" onClick={() => setMenuOpened((prev) => !prev)}>
                    <BiMenuAltRight size={30} />
                </div>
            </div>
        </section>
    );
};

export default Header;
