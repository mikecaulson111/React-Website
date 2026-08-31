import { useEffect, useRef, useState } from "react";
import * as MandelbrotUtils from "./MandelbrotUtils";
import Links from "../../components/Links/Links";

// We will use a canvas 500w x 300 h -> -2.5x to 1x and -1y to 1y

const width = 500;
const height = 300;

const VIEWER_INTITAL = {
    minReal: -2.5,
    maxReal: 1,
    minImaginary: -1,
    maxImaginary: 1
};

export default function Mandelbrot() {
    const canvasRef = useRef(null);
    const [viewer, setViewer] = useState(VIEWER_INTITAL);
    const [maxIterations, setMaxIterations] = useState(50);

    const handleCanvasClick = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const canvasX = mouseX * (canvas.width /rect.width);
        const canvasY = mouseY * (canvas.height / rect.height);

        const clickedReal = viewer.minReal + (canvasX / canvas.width) * (viewer.maxReal - viewer.minReal);
        const clickedImag = viewer.minImaginary + (canvasY / canvas.height) * (viewer.maxImaginary - viewer.minImaginary);
    
        const newWidth = (viewer.maxReal - viewer.minReal) / 2;
        const newHeight = (viewer.maxImaginary - viewer.minImaginary) / 2;

        setMaxIterations(prev => prev + 25);

        setViewer({
            minReal: clickedReal - newWidth / 2,
            maxReal: clickedReal + newWidth / 2,
            minImaginary: clickedImag - newHeight / 2,
            maxImaginary: clickedImag + newHeight / 2
        });
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const imageData = ctx.createImageData(width, height);
        // const pixels = imageData.data;
        const newImageData = MandelbrotUtils.totalPlace(width, height, viewer.minReal,      viewer.maxReal,
                                                                       viewer.minImaginary, viewer.maxImaginary,
                                                                       imageData, maxIterations);

        // Draw the mandebrot set here
        ctx.putImageData(newImageData, 0, 0);
    }, [viewer]);

    return (
        <>
            <h2>Mandelbrot Set</h2>
            <canvas ref={canvasRef} width={500} height={300} style={{border: '1px solid #ccc'}} onClick={handleCanvasClick} />
            <Links />
        </>
    )
}