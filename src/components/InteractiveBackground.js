import { useCallback, useEffect, useRef, useState } from 'react';
import './InteractiveBackground.css';

const STAR_MESSAGES = [
  'Innovative', 'Creative', 'Strategic', 'Analytical', 
  'Problem Solver', 'Team Player', 'Quick Learner', 'Detail-Oriented'
];

const STAR_MILESTONES = {
  0: '✨ Gathering stardust...',
  1: '🌟 First star caught!',
  3: '⭐ A tiny constellation forms!',
  5: '🌠 Shooting through space!',
  7: '🌌 Mini galaxy master!',
  10: '🚀 Cosmic collector extraordinaire!',
  15: '👨‍🚀 Space explorer level: PRO!',
  20: '🎯 Star whisperer supreme!'
};

const ACHIEVEMENT_MESSAGES = {
  5: "You're a natural star catcher! 🌟",
  10: "Is this your day job? Stellar performance! 🚀",
  15: "You're making the Milky Way jealous! 🌌",
  20: "NASA wants to know your location! 👨‍🚀"
};

const InteractiveBackground = () => {
  const [stars, setStars] = useState([]);
  const [score, setScore] = useState(0);
  const [popTexts, setPopTexts] = useState([]);
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementMessage, setAchievementMessage] = useState('');
  const nextIdRef = useRef(0);
  const animationFrameRef = useRef();

  const createStar = useCallback(() => {
    const x = Math.random() * (window.innerWidth - 40);
    const y = Math.random() * (window.innerHeight - 40);
    const size = Math.random() * 20 + 10;
    const speedX = (Math.random() - 0.5) * 1;
    const speedY = (Math.random() - 0.5) * 1;
    const message = STAR_MESSAGES[Math.floor(Math.random() * STAR_MESSAGES.length)];

    return {
      id: `star-${nextIdRef.current++}`,
      x,
      y,
      size,
      speedX,
      speedY,
      message,
      opacity: Math.random() * 0.5 + 0.5,
      bursting: false
    };
  }, []);

  useEffect(() => {
    const initialStars = Array.from({ length: 15 }, createStar);
    setStars(initialStars);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [createStar]);

  useEffect(() => {
    let lastTime = performance.now();

    const animate = (currentTime) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setStars(prevStars => 
        prevStars.map(star => {
          if (star.bursting) return star;

          let newX = star.x + star.speedX;
          let newY = star.y + star.speedY;

          if (newX <= 0 || newX >= window.innerWidth - star.size) {
            star.speedX *= -1;
            newX = star.x + star.speedX;
          }
          if (newY <= 0 || newY >= window.innerHeight - star.size) {
            star.speedY *= -1;
            newY = star.y + star.speedY;
          }

          return {
            ...star,
            x: newX,
            y: newY,
            opacity: 0.5 + Math.sin(currentTime * 0.001) * 0.2
          };
        })
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, []);

  const getStarCountText = (count) => {
    const milestoneKeys = Object.keys(STAR_MILESTONES)
      .map(Number)
      .sort((a, b) => b - a);
    
    for (const milestone of milestoneKeys) {
      if (count >= milestone) {
        return STAR_MILESTONES[milestone];
      }
    }
    return STAR_MILESTONES[0];
  };

  const handleStarClick = (id, x, y, message) => {
    setStars(prevStars =>
      prevStars.map(star =>
        star.id === id ? { ...star, bursting: true } : star
      )
    );

    setScore(prev => {
      const newScore = prev + 1;
      
      // Check for achievements
      if (ACHIEVEMENT_MESSAGES[newScore]) {
        setAchievementMessage(ACHIEVEMENT_MESSAGES[newScore]);
        setShowAchievement(true);
        setTimeout(() => {
          setShowAchievement(false);
          setAchievementMessage('');
        }, 3000);
      }
      
      return newScore;
    });

    // Create pop text with star message
    const popId = Date.now();
    setPopTexts(prev => [...prev, { id: popId, x, y, message }]);
    setTimeout(() => {
      setPopTexts(prev => prev.filter(text => text.id !== popId));
    }, 1000);

    // Replace burst star with new one
    setTimeout(() => {
      setStars(prevStars => [
        ...prevStars.filter(s => s.id !== id),
        createStar()
      ]);
    }, 500);
  };

  return (
    <div className="interactive-background">
      <div className="score-counter">
        <span className="score-text">{getStarCountText(score)}</span>
        {showAchievement && (
          <div className="achievement-message">
            {achievementMessage}
          </div>
        )}
      </div>
      {stars.map(star => (
        <div
          key={star.id}
          className={`floating-star ${star.bursting ? 'burst' : ''}`}
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity
          }}
          onClick={() => handleStarClick(star.id, star.x, star.y, star.message)}
        />
      ))}
      {popTexts.map(text => (
        <div
          key={text.id}
          className="pop-text"
          style={{
            left: `${text.x}px`,
            top: `${text.y}px`
          }}
        >
          {text.message}
        </div>
      ))}
    </div>
  );
};

export default InteractiveBackground; 


