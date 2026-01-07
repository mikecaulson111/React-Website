import { useState } from "react";

export default function BlurUpImage({tinySrc, largeSrc, alt = "", myClassName = ""}) {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <>
            <div style={{position: 'relative', overflow: 'hidden', width: '100%'}}>
                <img
                    src={tinySrc}
                    alt={alt}
                    className={myClassName}
                    style={{
                        filter: 'blur(30px)',
                        opacity: isLoaded ? 0 : 1,
                        transition: 'opacity 0.3s ease-out',
                        position: 'absolute',
                    }}
                />
                <img
                    src={largeSrc}
                    alt={alt}
                    onLoad={() => setIsLoaded(true)}
                    className={myClassName}
                    style={{
                        opacity: isLoaded ? 1 : 0,
                        transition: 'opacity 0.3s ease-in',
                    }}
                />
            </div>
        </>
    );
}