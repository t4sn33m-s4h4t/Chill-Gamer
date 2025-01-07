import { useState, useEffect } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import Banner from './Banner.jsx';

import banner1 from '../../assets/banners/banner 1.png';
import banner2 from '../../assets/banners/banner 2.png';
import banner3 from '../../assets/banners/banner 3.png';
import banner4 from '../../assets/banners/banner 4.png';
import banner5 from '../../assets/banners/banner 5.png';
import banner6 from '../../assets/banners/banner 6.png';

const slides = [
  {
    banner: banner1,
    title: "Welcome to our website",
    description: "Explore a vast world of games, reviews, and more tailored to gamers like you.",
  },
  {
    banner: banner2,
    title: "Play Games",
    description: "Engage in thrilling adventures and enjoy a wide variety of games.",
  },
  {
    banner: banner3,
    title: "Enjoy Games",
    description: "Lose yourself in immersive gameplay with exciting features and challenges.",
  },
  {
    banner: banner4,
    title: "Find Interesting Games",
    description: "Discover unique and exciting games to match your style and interests.",
  },
  {
    banner: banner5,
    title: "Share Game Reviews",
    description: "Be part of our community by sharing reviews and helping others choose their next favorite game.",
  },
  {
    banner: banner6,
    title: "Explore Our Site",
    description: "Dive deep into our site to uncover everything it has to offer for gamers.",
  },
];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-10">
      <AwesomeSlider className="h-[70vh]" selected={currentIndex}>
        {slides.map((slide, index) => (
          <div key={index} className="w-full">
            <Banner ban={slide.banner} title={slide.title} description={slide.description} />
          </div>
        ))}
      </AwesomeSlider>
    </div>
  );
}
