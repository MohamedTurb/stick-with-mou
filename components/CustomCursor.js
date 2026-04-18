"use client";
import { useEffect, useRef } from "react";

// Custom cursor for premium desktop feel
export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    };

    // Smooth follower animation
    const animate = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + "px";
      follower.style.top = followerY + "px";
      requestAnimationFrame(animate);
    };

    // Hover effect on interactive elements
    const addHover = () => cursor.classList.add("hovered");
    const removeHover = () => cursor.classList.remove("hovered");

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach(el => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    document.addEventListener("mousemove", onMove);
    animate();

    return () => {
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
}
