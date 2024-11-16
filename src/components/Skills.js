import React from 'react';
import './Skills.css';
import { 
  FaCode, FaTools, FaUserTie, FaJava, FaHtml5, FaCss3Alt, 
  FaJs, FaDatabase, FaReact, FaAngular, FaBootstrap, FaGitAlt,
  FaLightbulb, FaHandshake, FaBrain, FaUsers, FaRocket
} from 'react-icons/fa';
import { SiSpring, SiMariadb } from 'react-icons/si';
import { BsStars } from 'react-icons/bs';

const Skills = () => {
  const skillCategories = {
    programming: {
      icon: <FaCode />,
      title: "Programming",
      skills: [
        { name: "Java", icon: <FaJava />, description: "Object-oriented programming & enterprise applications" },
        { name: "HTML", icon: <FaHtml5 />, description: "Semantic markup & web structure" },
        { name: "CSS", icon: <FaCss3Alt />, description: "Styling & responsive design" },
        { name: "JavaScript", icon: <FaJs />, description: "Dynamic web applications & interactivity" },
        { name: "SQL", icon: <FaDatabase />, description: "Database management & queries" }
      ]
    },
    frameworks: {
      icon: <FaTools />,
      title: "Frameworks & Tools",
      skills: [
        { name: "React", icon: <FaReact />, description: "Modern UI development" },
        { name: "Angular", icon: <FaAngular />, description: "Enterprise-scale applications" },
        { name: "Bootstrap", icon: <FaBootstrap />, description: "Responsive frameworks" },
        { name: "SpringBoot", icon: <SiSpring />, description: "Java-based backend development" },
        { name: "GIT", icon: <FaGitAlt />, description: "Version control & collaboration" },
        { name: "MariaDB", icon: <SiMariadb />, description: "Relational database management" }
      ]
    },
    softSkills: {
      icon: <FaUserTie />,
      title: "Soft Skills",
      skills: [
        { name: "Problem-Solving", icon: <FaLightbulb />, description: "Analytical thinking & creative solutions" },
        { name: "Inter-Team Communication", icon: <FaHandshake />, description: "Effective collaboration & coordination" },
        { name: "Quick Learning", icon: <FaBrain />, description: "Adaptability & knowledge acquisition" },
        { name: "Interpersonal Skills", icon: <FaUsers />, description: "Building strong professional relationships" },
        { name: "Adaptability", icon: <FaRocket />, description: "Flexibility in dynamic environments" }
      ]
    }
  };

  return (
    <div className="skills-container">
      <div className="skills-header">
        <BsStars className="skills-star" />
        <h2>Skills & Expertise</h2>
        <BsStars className="skills-star" />
      </div>
      
      <div className="skills-grid">
        {Object.entries(skillCategories).map(([key, category]) => (
          <div key={key} className="skill-category">
            <div className="category-header">
              {category.icon}
              <h3>{category.title}</h3>
            </div>
            <div className="skills-list">
              {category.skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="skill-item"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="skill-content">
                    <div className="skill-icon" title={skill.description}>
                      {skill.icon}
                    </div>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills; 