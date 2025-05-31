"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import styles from "./page.module.css";
import Image from "next/image";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Home() {

  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typingDots, setTypingDots] = useState("");
  const [showImages, setShowImages] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const typingInterval = useRef<NodeJS.Timeout | null>(null);

  const anyasDOB = '2025-05-04';

  const getDaysOld = (dob: any) => {
    const today = new Date();
    const birth = new Date(dob);
    const diffTime = today.getTime() - birth.getTime();;
    // console.log('diffTime', diffTime)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  console.log('getDaysOld', getDaysOld(anyasDOB));
  // const anyasBday = dateToday

  // Animate typing dots

  const messages = [
    'Hii! 👋',
    `My name is Anya! As of today I am ${getDaysOld(anyasDOB)} days old lol`,
    'Just wanted to say hi...',
    '...but most importantly, thank you!',
    'I really love the gift that you folks got me!',
    'Its sweet and cozy!',
    'Here are some photos of me :)',
  ];

  const images = [
    '1.jpeg',
    '2.jpg',
    '3.JPG',
    '4.jpg',
    '5.jpg'
  ]

  useEffect(() => {
    if (!isTyping) return;

    let dotCount = 0;
    typingInterval.current = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      setTypingDots(".".repeat(dotCount));
    }, 300);

    const showMessageTimeout = setTimeout(() => {
      if (typingInterval.current) clearInterval(typingInterval.current);
      setTypingDots("");
      setDisplayedMessages(prev => [...prev, messages[currentIndex]]);
      setCurrentIndex(prev => prev + 1);
      setIsTyping(false);
    }, 1000); // 1 second of "Typing..."

    return () => {
      clearTimeout(showMessageTimeout);
      if (typingInterval.current) clearInterval(typingInterval.current);
    };
  }, [isTyping, currentIndex]);

  // Start typing effect when ready for next message
  useEffect(() => {
    if (currentIndex < messages.length && !isTyping) {
      setIsTyping(true);
    }
  }, [displayedMessages, currentIndex, isTyping]);

  // Animate new message with GSAP
  useEffect(() => {
    if (!containerRef.current) return;

    const bubbles = containerRef.current.querySelectorAll(`.${styles.bubble}`);
    const lastBubble = bubbles[bubbles.length - 1];

    if (lastBubble) {
      gsap.fromTo(
        lastBubble,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
      if( displayedMessages.length === messages.length) {
        setShowImages(true);
      }
    }
  }, [displayedMessages]);

  return (
    <div className={styles.el}>
      <div className={styles.bubbleWrapper} ref={containerRef}>
        {displayedMessages.map((msg, idx) => (
          <div className={styles.bubble} key={idx}>
            {msg}
          </div>
        ))}
        {isTyping && (
          <div className={styles.bubble}>
            <p className={styles.typing}>Typing{typingDots}</p>
          </div>
        )}
        {/* < */}
        {
          showImages && 
          images.map((img, idx) => {
            return (
              <Image key={idx} src={`/images/${img}`} width={100} height={100} alt='Photos of Anya'/>    
            )
          })
          
        }
      </div>
    </div>
  );
}
