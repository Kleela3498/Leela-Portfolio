import { useEffect, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const targetPositionRef = useRef({ x: 0, y: 0 });
  const currentPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e) => {
      // Update target position directly from mouse event
      targetPositionRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const onMouseOver = (e) => {
      const target = e.target;
      const isClickable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.classList.contains('clickable') ||
        target.classList.contains('floating-star');

      if (isClickable) {
        outlineRef.current?.classList.add('pointer');
      } else {
        outlineRef.current?.classList.remove('pointer');
      }
    };

    const animate = (time) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = (time - previousTimeRef.current) / 16; // Normalize to ~60fps
        const ease = 0.2;

        // Smooth interpolation between current and target position
        currentPositionRef.current = {
          x: currentPositionRef.current.x + (targetPositionRef.current.x - currentPositionRef.current.x) * ease * deltaTime,
          y: currentPositionRef.current.y + (targetPositionRef.current.y - currentPositionRef.current.y) * ease * deltaTime
        };

        if (dotRef.current && outlineRef.current) {
          // Use transform for better performance
          dotRef.current.style.transform = `translate3d(${currentPositionRef.current.x}px, ${currentPositionRef.current.y}px, 0)`;
          outlineRef.current.style.transform = `translate3d(${currentPositionRef.current.x}px, ${currentPositionRef.current.y}px, 0)`;
        }
      }

      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    // Initial position setup
    currentPositionRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    targetPositionRef.current = { ...currentPositionRef.current };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-outline" ref={outlineRef} />
    </>
  );
};

export default CustomCursor; 