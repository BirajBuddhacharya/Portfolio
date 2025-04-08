"use client";

import React, { useEffect, useState } from "react";
import "/src/styles/FadeIn.css";

interface FadeInSection {
  idTrack: string; // To specify the unique id of the element
  children: React.ReactNode; // The children to be wrapped inside the fade-in effect
}

const FadeInOnScroll: React.FC<FadeInSection> = ({ idTrack, children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined" && typeof document !== "undefined") {
        const scrollPosition = window.scrollY;
        const elementPosition = document.getElementById(idTrack)?.offsetTop || 0;

        if (scrollPosition + window.innerHeight >= elementPosition) {
          setIsVisible(true);
        }
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [idTrack]);

  return (
    <div className={`fade-in ${isVisible ? "visible" : ""}`} id={idTrack}>
      {children}
    </div>
  );
};

export default FadeInOnScroll;
