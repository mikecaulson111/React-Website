
import React, { useRef, useState, useEffect } from "react";

export default function CanvasGame() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let x = 100;
        let y = 100;
        let dx = 0;
        let dy = 0;
        const radius = 20;
        const speed = 5;

        const accy = 2;
        const accx = 0.3;
        var vely = 0;
        var velx = 0;
        const jumpVel = -20;

        var jumped = false;

        const keysPressed = {};

        const handleKeyDown = (e) => {
            keysPressed[e.key.toLowerCase()] = true;
        }

        const handleKeyUp = (e) => {
            keysPressed[e.key.toLowerCase()] = false;
        }

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        let animationFrameId;

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // if (keysPressed["arrowup"] || keysPressed["w"]) y -= speed;
            // if (keysPressed["arrowdown"] || keysPressed["s"]) y += speed;
            // if (keysPressed["arrowleft"] || keysPressed["a"]) x -= speed;
            // if (keysPressed["arrowright"] || keysPressed["d"]) x += speed;
            if (keysPressed["arrowup"] || keysPressed["w"]) {
                y -= speed;
            }
            if (keysPressed["arrowdown"] || keysPressed["s"]) {
                y += speed;
            }
            if (keysPressed["arrowleft"] || keysPressed["a"]) {
                // x -= speed;
                if (velx >= -8) {
                    velx -= accx;
                }
            } else if (velx < 0 && (!keysPressed["arrowleft"] && !keysPressed["a"])) {
                if (velx < 0 && Math.abs(velx) < 0.05) {
                    velx = 0;
                } else {
                    velx += accx;
                }
            }
            if (keysPressed["arrowright"] || keysPressed["d"]) {
                // x += speed;
                if (velx <= 8) {
                    velx += accx;
                }
            } else if (velx > 0 && !keysPressed["arrowright"] && !keysPressed["d"]) {
                if (velx > 0 && Math.abs(velx) < 0.05) {
                    velx = 0;
                } else {
                    velx -= accx;
                }
            }
            if (keysPressed[" "] && !jumped) {
                vely = jumpVel;
                jumped = true;
            }
            vely += accy;
            y += vely;

            x += velx;

            x = Math.max(radius, Math.min(canvas.width - radius, x));
            y = Math.max(radius, Math.min(canvas.height - radius, y));

            if (y == canvas.height - radius && jumped) jumped = false;

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = "goldenrod";
            ctx.fill();

            animationFrameId = requestAnimationFrame(render);
        }

        render();

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            cancelAnimationFrame(animationFrameId);
        }
    }, []);

    return <canvas ref={canvasRef} width={500} height={300} style={{ border: "1px solid #ccc"}} />
}
