// import React, { useRef, useEffect } from "react";

// export default function CanvasExample() {
//     const canvasRef = useRef(null);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");

//         // Clear previous frame
//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         // 1. Draw a Filled Box (Rectangle)
//         ctx.fillStyle = "royalblue";
//         // fillRect(x, y, width, height)
//         ctx.fillRect(50, 50, 100, 80);

//         // 2. Draw an Outline Box
//         ctx.strokeStyle = "crimson";
//         ctx.lineWidth = 4;
//         ctx.strokeRect(200, 50, 100, 80);

//         // 3. Draw a Circle (Custom Path)
//         ctx.beginPath();
//         // arc(x, y, radius, startAngle, endAngle)
//         ctx.arc(380, 90, 40, 0, Math.PI * 2);
//         ctx.fillStyle = "goldenrod";
//         ctx.fill();
//     }, []);

//     return <canvas ref={canvasRef} width={500} height={200} style={{ border: "1px solid #ccc" }} />;
// }

import React, { useRef, useEffect } from "react";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import Links from "../../components/Links/Links";

export default function CanvasExample() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Circle properties
        let x = 100;
        let y = 100;
        let dx = 4; // Horizontal speed
        let dy = 3; // Vertical speed
        const radius = 30;

        let animationFrameId;

        const render = () => {
            // 1. Clear previous frame
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 2. Draw circle at current position
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = "goldenrod";
            ctx.fill();

            // 3. Wall collision detection (bounce off edges)
            if (x + radius > canvas.width || x - radius < 0) dx = -dx;
            if (y + radius > canvas.height || y - radius < 0) dy = -dy;

            // 4. Update coordinates
            x += dx;
            y += dy;

            // 5. Request next frame
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        // Cleanup loop on unmount
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <>
            <canvas ref={canvasRef} width={500} height={300} style={{ border: "1px solid #ccc" }} />
            <InlineMath math="E=mc^2" />
            <h3>Quadratic equation:</h3>
            <BlockMath math="x= \frac{-b \pm \sqrt{b^2 -4ac}}{2a}" />
            <BlockMath math="a\neq b" />
            <BlockMath math="\bra{a}\ket{b} = 0 \quad \text{ if } a \neq b"  />
            <Links />
        </>
    )
}
