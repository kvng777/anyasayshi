"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import gsap from "gsap";
import styles from "./page.module.css";
import Image from "next/image";

import MyModal from "@/components/modal";

export default function Home() {

  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typingDots, setTypingDots] = useState("");
  const [showImages, setShowImages] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [imageIdx, setImageIdx] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const typingInterval = useRef<NodeJS.Timeout | null>(null);

  const anyasDOB = '2025-05-04';

  const getDaysOld = (dob: string | number | Date) => {
    const today = new Date();
    const birth = new Date(dob);
    const diffTime = today.getTime() - birth.getTime();;
    // console.log('diffTime', diffTime)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  const messages = useMemo(() => [
    "Hii! 👋 It's me Anya!",
    `As of today I am ${getDaysOld(anyasDOB)} days old lol`,
    "Just wanted to give my big love and thanks to you folks for such a lovely gift!",
    // "...but most importantly, thank you!",
    "It's nice and cozy, and keeps me suuuper safe!",
    "Here are some photos of me :)",
  ], []);

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
  }, [isTyping, currentIndex, messages]);

  // Start typing effect when ready for next message
  useEffect(() => {
    if (currentIndex < messages.length && !isTyping) {
      setIsTyping(true);
    }
  }, [displayedMessages, currentIndex, isTyping, messages]);

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
  }, [displayedMessages, messages]);

  const handleImgClick = (idx: number) => {
    setOpenModal(!openModal);
    setImageIdx(idx);
  }

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
        {
          showImages && 
          images.map((img, idx) => {
            return (
              <a key={idx} className={styles.imageWrapper} onClick={()=>handleImgClick(idx)}>
                <Image  src={`/images/${img}`} width={120} height={180} alt='Photos of Anya'  blurDataURL={`/images/${img}`} placeholder="blur"/>    
              </a>
            )
          })
          
        }
      </div>

      <MyModal 
        isOpen={openModal}
        setOpenModal={setOpenModal}
        imageIdx={imageIdx}
        images={images}
      />
    </div>
  );
}
