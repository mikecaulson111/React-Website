import { useEffect, useRef } from "react";
import * as MandelbrotUtils from "./MandelbrotUtils";

// We will use a canvas 500w x 300 h -> -2.5x to 1x and -1y to 1y

const viewer = {
    minReal: -2.5,
    maxReal: 1,
    minImaginary: -1,
    maxImaginary: 1
};

export default function Mandelbrot() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const imageData = ctx.createImageData(500, 300);
        // const pixels = imageData.data;
        const newImageData = MandelbrotUtils.totalPlace(500, 300, viewer.minReal,      viewer.maxReal,
                                                                  viewer.minImaginary, viewer.maxImaginary,
                                                                  imageData);

        // Draw the mandebrot set here
        ctx.putImageData(newImageData, 0, 0);
    }, []);

    return (
        <>
            <h2>Mandelbrot Set</h2>
            <canvas ref={canvasRef} width={500} height={300} style={{border: '1px solid #ccc'}} />
        </>
    )
}