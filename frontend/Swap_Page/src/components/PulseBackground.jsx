import React, { useEffect, useRef, useCallback } from 'react';

// Create a new background component
const PulseBackground = () => {
    useEffect(() => {
      const canvas = document.getElementById('futuristic-bg');
      const ctx = canvas.getContext('2d');
      
      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      window.addEventListener('resize', resize);
      resize();
      
      const hexagons = [];
      const hexagonSize = 50;
      const spacing = hexagonSize * 2;
      
      // Create hexagon grid
      for(let x = 0; x < canvas.width + spacing; x += spacing * 1.5) {
        for(let y = 0; y < canvas.height + spacing; y += spacing * 0.866) {
          hexagons.push({
            x,
            y: y + (Math.floor(x / (spacing * 1.5)) % 2) * spacing * 0.433,
            opacity: Math.random() * 0.2,
            pulse: 0,
            pulseSpeed: 0.02 + Math.random() * 0.02
          });
        }
      }
      
      const drawHexagon = (x, y, size, opacity) => {
        ctx.beginPath();
        for(let i = 0; i < 6; i++) {
          const angle = i * Math.PI / 3;
          const xPos = x + size * Math.cos(angle);
          const yPos = y + size * Math.sin(angle);
          if(i === 0) ctx.moveTo(xPos, yPos);
          else ctx.lineTo(xPos, yPos);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(255, 0, 255, ${opacity})`;
        ctx.stroke();
      };
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        hexagons.forEach(hex => {
          hex.pulse = (hex.pulse + hex.pulseSpeed) % (Math.PI * 2);
          const pulseOpacity = hex.opacity + Math.sin(hex.pulse) * 0.1;
          drawHexagon(hex.x, hex.y, hexagonSize, pulseOpacity);
        });
        
        requestAnimationFrame(animate);
      };
      
      animate();
      
      return () => window.removeEventListener('resize', resize);
    }, []);
    
    return (
      <canvas 
        id="futuristic-bg"
        className="fixed inset-0 w-full h-full bg-gradient-to-br from-[#0A0612] to-[#170B3B]"
        style={{ zIndex: -1 }}
      />
    );
  };

export default PulseBackground;
