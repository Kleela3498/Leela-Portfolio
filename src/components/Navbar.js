import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes, FaStar } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ starCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="home" smooth={true} duration={500} onClick={closeMenu}>
            Sai Leela Kuragayala
          </Link>
        </div>

        <div className="navbar-right">
          <div className="star-counter">
            <FaStar className="star-icon" />
            <span className="star-count">{starCount}</span>
          </div>

          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation menu">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
            <Link to="home" smooth={true} duration={500} onClick={closeMenu}>
              Home
            </Link>
            <Link to="featured" smooth={true} duration={500} onClick={closeMenu}>
              Featured
            </Link>
            <Link to="skills" smooth={true} duration={500} onClick={closeMenu}>
              Skills
            </Link>
            <Link to="certifications-blogs" smooth={true} duration={500} onClick={closeMenu}>
              Certifications/Blogs
            </Link>
            <Link to="contact" smooth={true} duration={500} onClick={closeMenu}>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 