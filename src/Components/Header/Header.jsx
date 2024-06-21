import React, { useState } from 'react';
import './Header.css';
import { BiMenuAltRight } from 'react-icons/bi';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);

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
          <div className={`flexCenter h-menu ${menuOpened ? 'menu-open' : ''}`}>
            <Link to="#our-cares" onClick={() => scrollToSection('our-cares')}>About Us</Link>
            <Link to="#about-pain" onClick={() => scrollToSection('about-pain')}>Muscle Care</Link>
            <Link to="#learn" onClick={() => scrollToSection('learn')}>Knowledge</Link>
            <button className="button">
              <Link to="#mqi" onClick={() => scrollToSection('mqi')}>Muscle Quotient Index</Link>
            </button>
            <button className="button">
              <Link to="#contact-us" onClick={() => scrollToSection('contact-us')}>Consult a Specialist</Link>
            </button>
            <Link to="/auth" className="button">Login / Signup</Link>
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
