import React, { useRef, useEffect, useState } from 'react';

import { tracks } from './AudioTracks';

// const playables = [GravyRainbow, Lotus];
// const names = ["Gravy Rainbow", "Lotus"];
// const artists = ["Disasteradio", "Dhalius"];

const AudioVisualizer = () => {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  // Keep track of Web Audio nodes across renders
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);

  const [isInitialized, setIsInitialized] = useState(false);
  const [songToPlay, setSongToPlay] = useState(0);
  const [graphStyle, setGraphStyle] = useState("circle"); // can be "circle" or "wave"

  const graphStyleRef = useRef(graphStyle);

  const currentTrack = tracks[songToPlay];

  const handleChange = (event) => {
    setSongToPlay(Number(event.target.value));
  }

  // 1. Initialize the Audio Context on first user interaction
  const initAudio = () => {
    if (audioContextRef.current) return; // Already initialized

    // Create the context
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    audioContextRef.current = ctx;

    // Create the Analyser Node
    const analyser = ctx.createAnalyser();
    // fftSize must be a power of 2. 256 gives us 128 frequency bins to play with.
    analyser.fftSize = 256; 
    analyserRef.current = analyser;


    // Connect the HTML5 <audio> element to the Web Audio graph
    const source = ctx.createMediaElementSource(audioRef.current);
    source.connect(analyser);
    analyser.connect(ctx.destination); // Connect to speakers
    sourceRef.current = source;

    setIsInitialized(true);
  };
  
  useEffect(() => {
    graphStyleRef.current = graphStyle;
  }, [graphStyle]);

  // 2. Start the Canvas Animation Loop once initialized
  useEffect(() => {
    if (!isInitialized) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    
    // bufferLength is always exactly half of the fftSize
    const bufferLength = analyser.frequencyBinCount;
    // This unsigned 8-bit integer array will hold our frequency data (values 0-255)
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      // Schedule the next frame
      animationRef.current = requestAnimationFrame(draw);

      // Populate dataArray with current frequency snapshots
      analyser.getByteFrequencyData(dataArray);

      // Clear the canvas for the new frame
      ctx.fillStyle = 'rgba(10, 10, 15, 0.3)'; // Slightly transparent for a motion-blur glow effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // --- OUTSIDE THE BOX DRAWING LOGIC ---
      // Instead of a boring bar chart, let's draw a futuristic frequency ring
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = 80;

      if ("circle" === graphStyleRef.current) {
        for (let i = 0; i < bufferLength; i++) {
          const amplitude = dataArray[i]; // Value between 0 and 255
      
          // Map frequency index to a full circle (360 degrees in radians)
          const angle = (i / bufferLength) * Math.PI * 2;
      
          // Dynamic push distance based on sound intensity
          const push = (amplitude / 255) * 70; 
          const r = baseRadius + push;

          // Calculate coordinates
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;

          // Procedural styling: Lower frequencies (bass) get deeper colors, highs get bright neon
          const hue = (i / bufferLength) * 120 + 260; // Shifts from Deep Purple to Neon Cyan
          ctx.fillStyle = `hsla(${hue}, 100%, 60%, ${amplitude / 255})`;

          // Draw a particle at that node
          ctx.beginPath();
          // Particle size scales with volume amplitude
          const size = Math.max(2, (amplitude / 255) * 6);
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        const barWidth = canvas.width / bufferLength;

        for (let i = 0; i < bufferLength; i++) {
          const amplitude = dataArray[i];
          // Scale the height to fit nicely on screen
          const barHeight = (amplitude / 255) * (canvas.height / 3); 
        
          const x = i * barWidth;
          // Center of the canvas vertically
          const centerY = canvas.height / 2; 
        
          const hue = (i / bufferLength) * 120 + 200; // Electric blue to magenta tint
          ctx.fillStyle = `hsla(${hue}, 100%, 60%, 0.8)`;
        
          // Draw upper half
          ctx.fillRect(x, centerY - barHeight, barWidth - 1, barHeight);
          // Draw mirrored lower half
          ctx.fillRect(x, centerY, barWidth - 1, barHeight);
        }
      }
    };

    draw();

    // Cleanup loop on unmount
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isInitialized]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '40px' }}>
      <h1 style={{color:"red"}}>NOTE: this will play music out loud if your volume is up</h1>
      <h3>Song title: {currentTrack.name}</h3>
      <p>Credit: {currentTrack.artist}</p>
      <canvas 
        ref={canvasRef} 
        width={500} 
        height={500} 
        style={{ borderRadius: '12px', background: '#0a0a0f', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
      />
      
      <audio 
        ref={audioRef} 
        controls 
        onPlay={initAudio} // Context must unlock on a user gesture
        // src="YOUR_AUDIO_FILE_URL.mp3" // Toss an MP3 file in your public folder or a Supabase storage bucket
        // src={GravyRainbow}
        src={currentTrack.source}
      />
      
      {!isInitialized && <p style={{ color: '#888' }}>Click Play to initialize the visualizer core.</p>}
      {/* <button onClick={() => {
        console.log(tracks[3]);
        if (songToPlay != 0) {
            setSongToPlay(0);
        } else {
            setSongToPlay(1);
        }
      }}>
        Change Song
      </button> */}
      <label>
        Select a track
      </label>
      <select
        id="track-select"
        value={songToPlay}
        onChange={handleChange}
      >
        {tracks.map((track, index) => (
          <option key={track.name} value={index}>
            {track.name} — {track.artist}
          </option>
        ))}
      </select>
      <button onClick={() => {
        if ("circle" === graphStyle) {
            setGraphStyle("wave");
        } else {
            setGraphStyle("circle");
        }
      }}>
        Change display type
      </button>
    </div>
  );
};

export default AudioVisualizer;