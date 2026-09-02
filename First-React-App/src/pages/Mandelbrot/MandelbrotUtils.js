
// So the equation is z(n+1) = z(n)^2 + c
// ex if z = 0 and c = -0.5 + 0.0i
//       z(1) = 0^2 + (-0.5) = -0.5
//       z(2) = (-0.5)^2 + (-0.5) = 0.25 - 0.5 = -0.25
//       z(3) = (-0.25)^2 + (-0.5) = 0.0625 - 0.5 = -0.4375
//       ...

// A value is in the mandelbrot set if |z| <= 2 after certain number of iterations

export function mandelbrotCalc(cReal, cImaginary, maxIterations) {
    var zReal = 0;
    var zImaginary = 0;

    for (var i = 0; i < maxIterations; i++) {
        var realSquare = (zReal * zReal) - (zImaginary * zImaginary);
        var imaginarySquare = 2 * zReal * zImaginary;
        zReal =  realSquare + cReal;
        zImaginary = imaginarySquare + cImaginary;
        if (Math.sqrt(zReal*zReal + zImaginary*zImaginary) > 2) {
            return i;
        }
    }

    if (Math.sqrt((zReal*zReal) + (zImaginary * zImaginary)) <= 2) {
        // return true;
        return 0;
    }
    return maxIterations;
}

function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;

    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(1,1-l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9-k(n), 1)));
    return [
        Math.round(255 * f(0)),
        Math.round(255 * f(8)),
        Math.round(255 * f(4))
    ];
}

// mappint between x-> -2.5, 1 and y-> -1,1
export function totalPlace(pixelsX, pixelsY, minReal, maxReal, minImag, maxImag, imageData, maxIterations) {
    for(let i = 0; i < imageData.data.length; i += 4) {
        var placeX = ((i/4) % pixelsX);
        var placeY = Math.floor(i / (pixelsX * 4));
        const cReal = minReal + (placeX /pixelsX) * (maxReal - minReal);
        const cImag = minImag + (placeY / pixelsY) * (maxImag - minImag);
        // var isIn = mandelbrotCalc(cReal, cImag, maxIterations);
        var colorValue = mandelbrotCalc(cReal, cImag, maxIterations);
        if (colorValue == 0) {
            imageData.data[i+0] = 0;
            imageData.data[i+1] = 0;
            imageData.data[i+2] = 0;
            imageData.data[i+3] = 0;
        } else {
            // const brightness = colorValue / maxIterations;
            // imageData.data[i+0] = 255 * brightness;
            // imageData.data[i+1] = 255 * brightness;
            // imageData.data[i+2] = 255 * brightness;
            // imageData.data[i+3] = 255 * brightness;
            const hue = (colorValue / maxIterations) * 360;
            const [r, g, b] = hslToRgb(hue, 100, 50);
            imageData.data[i+0] = r;
            imageData.data[i+1] = g;
            imageData.data[i+2] = b;
            imageData.data[i+3] = 255;
        }
        // if (isIn) {
        //     imageData.data[i+0] = 255;
        //     imageData.data[i+1] = 255;
        //     imageData.data[i+2] = 255;
        //     imageData.data[i+3] = 255;
        // } else {
        //     imageData.data[i+0] = 0;
        //     imageData.data[i+1] = 0;
        //     imageData.data[i+2] = 0;
        //     imageData.data[i+3] = 255;
        // }
    }

    return imageData;
}
