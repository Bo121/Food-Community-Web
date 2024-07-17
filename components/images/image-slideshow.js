'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import burgerImg from '@/assets/burger.jpg';
import curryImg from '@/assets/curry.jpg';
import dumplingsImg from '@/assets/dumplings.jpg';
import macncheeseImg from '@/assets/macncheese.jpg';
import pizzaImg from '@/assets/pizza.jpg';
import schnitzelImg from '@/assets/schnitzel.jpg';
import tomatoSaladImg from '@/assets/tomato-salad.jpg';
import classes from './image-slideshow.module.css';

const images = [
  { image: burgerImg, alt: 'A delicious, juicy burger' },
  { image: curryImg, alt: 'A delicious, spicy curry' },
  { image: dumplingsImg, alt: 'Steamed dumplings' },
  { image: macncheeseImg, alt: 'Mac and cheese' },
  { image: pizzaImg, alt: 'A delicious pizza' },
  { image: schnitzelImg, alt: 'A delicious schnitzel' },
  { image: tomatoSaladImg, alt: 'A delicious tomato salad' },
];

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /**
   * Breakdown
      useEffect Hook:
        useEffect is a React hook that allows you to perform side effects in functional components. It's similar to lifecycle methods in class components like componentDidMount, componentDidUpdate, and componentWillUnmount.
        The effect in this case is setting up an interval to update the current image index.
      
      Setting Up the Interval:
        setInterval is a JavaScript function that repeatedly calls a function with a fixed time delay between each call. In this case, it's called every 5000 milliseconds (or 5 seconds).
        Inside setInterval, the setCurrentImageIndex function updates the state by incrementing the current image index.
        prevIndex is the previous state value of the current image index. The function checks if prevIndex is less than the last index of the images array. If it is, it increments the index by 1. If it’s not (meaning it's the last image), it resets the index to 0.
      
      Cleanup Function:
        The return () => clearInterval(interval); statement defines a cleanup function that React calls when the component unmounts or before running the effect again.
        clearInterval(interval) clears the interval set by setInterval, preventing memory leaks and unwanted behavior.
      
      Dependency Array:
        The empty array [] as the second argument to useEffect means that the effect runs only once when the component mounts and never again.
        This is equivalent to the behavior of componentDidMount in class components.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.slideshow}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.image}
          className={index === currentImageIndex ? classes.active : ''}
          alt={image.alt}
        />
      ))}
    </div>
  );
}