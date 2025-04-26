"use client"
import React, { useState, useEffect } from 'react';

const TypingEffect = () => {
  const text = "Web Developer";
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const typingSpeed = 150; 
  const deletingSpeed = 75; 
  const pauseTime = 1500; 

  useEffect(() => {
    let timer;
    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(prevText => prevText.slice(0, -1));
        if (displayText === '') {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
        if (displayText === text) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      }, typingSpeed);
    }
    return () => clearTimeout(timer);
  }, [displayText, isDeleting]);

  return <span>{displayText}</span>;
};

export default TypingEffect;
