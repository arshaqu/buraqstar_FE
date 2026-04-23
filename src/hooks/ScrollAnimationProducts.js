import { useEffect, useRef, useState } from "react";

const useScrollAnimationProducts = (productsLength, initialClass, animateClass) => {
  const refs = useRef([]);
  const [visible, setVisible] = useState(new Array(productsLength).fill(false));

  useEffect(() => {
    // Ensure visibility state matches product length
    if (visible.length !== productsLength) {
      setVisible(new Array(productsLength).fill(false));
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = refs.current.indexOf(entry.target);
            if (index !== -1) {
              setVisible((prevVisible) => {
                const updatedVisible = [...prevVisible];
                updatedVisible[index] = true;
                return updatedVisible;
              });
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.7 }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [productsLength]);

  const getClass = (index) => (visible[index] ? animateClass : initialClass);

  return [refs, getClass];
};

export default useScrollAnimationProducts;
