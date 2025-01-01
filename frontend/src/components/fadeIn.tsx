import React, { useEffect, useState } from "react";
import "../assets/css/FadeIn.css";
interface FadeInSection {
  idTrack: string; // To specify the unique id of the element
  children: React.ReactNode; // The children to be wrapped inside the fade-in effect
}

const FadeInOnScroll: React.FC<FadeInSection> = ({ idTrack, children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const elementPosition = document.getElementById(idTrack)?.offsetTop || 0;

    // debugging

    if (scrollPosition + window.innerHeight > elementPosition) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`fade-in ${isVisible ? "visible" : ""}`}
      >
        {children}
      </div>
    </>
  );
};

export default FadeInOnScroll;
