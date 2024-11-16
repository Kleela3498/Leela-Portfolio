import { useEffect, useRef } from 'react';

import Typed from 'typed.js';

import { FaGithub, FaLinkedin } from 'react-icons/fa';

import './Hero.css';

import InteractiveBackground from './InteractiveBackground';

import northernLights from '../assets/northern-ligths.jpg';



const Hero = () => {

  const typedRef = useRef(null);



  useEffect(() => {

    const typed = new Typed(typedRef.current, {

      strings: [

        'Innovative Developer',

        'Passionate Creator',

        'Tech Enthusiast'

      ],

      typeSpeed: 50,

      backSpeed: 30,

      backDelay: 1500,

      loop: true

    });



    return () => {

      typed.destroy();

    };

  }, []);



  return (

    <div className="hero" style={{ '--bg-image': `url(${northernLights})` }}>

      <InteractiveBackground />

      <div className="hero-content">

        <div className="content-wrapper">

          <div className="text-content">

            <h1 className="aurora-text">Hi, I'm Sai Leela!</h1>

            <h2 className="aurora-text">

              <span ref={typedRef}></span>

            </h2>

            <p>Turning ideas into elegant, functional solutions</p>

            <div className="social-links">

              <a 

                href="https://github.com/yourusername" 

                target="_blank" 

                rel="noopener noreferrer"

                className="social-link"

              >

                <FaGithub /> GitHub

              </a>

              <a 

                href="https://linkedin.com/in/yourusername" 

                target="_blank" 

                rel="noopener noreferrer"

                className="social-link"

              >

                <FaLinkedin /> LinkedIn

              </a>

            </div>

            <button className="cta-button glow-effect">

              Download Resume

            </button>

          </div>

          <div className="hero-image">

            <img 

              src="/Gif.gif"

              alt="Animated developer avatar"

              className="profile-gif"

            />

          </div>

        </div>

      </div>

      <div className="instruction-text">

        Shoot the stars to discover more about my universe!

      </div>

    </div>

  );

};



export default Hero; 
