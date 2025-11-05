import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the plugin globally (do this once in your app)
gsap.registerPlugin(ScrollTrigger);

export default function ScrollingTestingPage() {
  // 1. Create refs for the section and the element to animate
  const sectionRef = useRef(null);
  const animatedBoxRef = useRef(null);

  useLayoutEffect(() => {
    // 2. Setup the GSAP context to handle cleanup
    const ctx = gsap.context(() => {
      
      // 3. Define the animation logic here
      gsap.to(animatedBoxRef.current, {
        // Properties to animate: move left, scale down, change opacity
        x: -500,
        scale: 0.5,
        opacity: 0,

        
        // This is the magic ScrollTrigger object
        scrollTrigger: {
          trigger: sectionRef.current, // The element that starts/stops the trigger
          start: "top top",           // When the top of the trigger hits the top of the viewport
          end: "bottom top",          // When the bottom of the trigger hits the top of the viewport
          scrub: 1,                   // Links the scrollbar to the animation progress (1 = slight delay/smoothness)
          pin: true,                  // Pins the trigger element in place while the animation plays
          markers: false,             // Set to true for debugging (shows start/end lines)
        },
      });

    }, sectionRef); // Scoping the context to the sectionRef

    // 4. Cleanup function
    return () => ctx.revert();
    
  }, []); // Empty dependency array ensures it runs only once

  // 5. Render the elements
    return (
    <div>
      {/* Spacer to push content down and show the starting state */}
      <div style={{ height: '100vh', background: '#e0e0e0', display: 'grid', placeContent: 'center' }}>
        <h2>Start Scrolling Down!</h2>
      </div>

      {/* The Section that is Pinned and Contains the Animation */}
      <section 
        ref={sectionRef} 
        className="pinned-section"
        style={{ height: '100vh', background: '#f5f5f7', position: 'relative' }} // Height must be sufficient for pin
        // style={{ height: '1500px', background: '#2727acff', position: 'relative' }} // Height must be sufficient for pin
      >
        <div 
          ref={animatedBoxRef} 
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            width: '200px', 
            height: '200px', 
            background: 'linear-gradient(135deg, #007aff, #5ac8fa)', // Apple-esque gradient
            borderRadius: '25px', 
            display: 'grid', 
            placeContent: 'center', 
            color: 'white',
            fontSize: '1.5rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
          }}
        >
          {/* Invite to Mike and Mia */}
          Animated Box
        </div>
      </section>
      
      {/* Content after the pinned section */}
      <div style={{ height: '100vh', background: '#cccccc', display: 'grid', placeContent: 'center' }}>
        <h2>Animation Complete!</h2>
      </div>
    </div>
  );
}