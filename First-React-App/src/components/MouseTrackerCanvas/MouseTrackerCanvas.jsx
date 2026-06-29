import React, { useRef, useEffect } from 'react';

const MouseTrackerCanvas = () => {
  const canvasRef = useRef(null);
  
  // Use a ref to hold mouse coordinates and physics data secretly
  const mouseRef = useRef({
    x: 0,
    y: 0,
    targetX: 0, // Where the mouse actually is
    targetY: 0, // Where the mouse actually is
    isMoving: false
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // 1. Handle Responsive Sizing
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight || 400;
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 2. Track Mouse Position relative to the Canvas bounds
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = event.clientX - rect.left;
      mouseRef.current.targetY = event.clientY - rect.top;
      mouseRef.current.isMoving = true;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // 3. The Animation & Drawing Loop
    const renderLoop = () => {
      // Create a smooth trailing fade effect instead of completely clearing the canvas
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // --- MATHEMATICAL EASING (The smooth catch-up effect) ---
      // Instead of instantly jumping to the target, the current position 
      // moves 10% of the distance closer to the target every single frame.
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Only draw if the mouse has moved or is interacting
      if (mouse.isMoving) {
        // Draw a glowing focal point
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#a855f7'; // Bright purple accent
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#a855f7';
        ctx.fill();

        // Draw geometric crosshairs or accent lines pointing to the cursor
        ctx.shadowBlur = 0; // Reset shadow for crisp lines
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)';
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        ctx.moveTo(mouse.x, 0); // Vertical pointer
        ctx.lineTo(mouse.x, canvas.height);
        ctx.moveTo(0, mouse.y); // Horizontal pointer
        ctx.lineTo(canvas.width, mouse.y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    // 4. Cleanup Memory and Event Listeners
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '400px', position: 'relative', overflow: 'hidden' }}>
      <canvas 
        ref={canvasRef} 
        style={{ display: 'block', cursor: 'crosshair', borderRadius: '12px' }}
      />
    </div>
  );
};

export default MouseTrackerCanvas;
