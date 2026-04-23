import { useEffect, useRef, useState } from "react";

const useScrollAnimation = (initialClass, animateClass, shouldAnimate = true, threshold=0.5) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!shouldAnimate) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: threshold}   // make dynamic threshold value
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [shouldAnimate]); // Re-run effect if shouldAnimate changes

  return [elementRef, isVisible ? animateClass : initialClass];
};

export default useScrollAnimation;