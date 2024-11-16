import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Featured from './components/Featured';
import Skills from './components/Skills';
import CertificationsBlog from './components/CertificationsBlog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import './App.css';

function App() {
  const [starCount, setStarCount] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <CustomCursor />
        <Navbar starCount={starCount} />
        <main>
          <section id="home">
            <Hero />
          </section>
          <section id="featured" data-aos="fade-up">
            <Featured />
          </section>
          <section id="skills" data-aos="fade-up">
            <Skills />
          </section>
          <section id="certifications-blogs" data-aos="fade-up">
            <CertificationsBlog />
          </section>
          <section id="contact" data-aos="fade-up">
            <Contact />
          </section>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
