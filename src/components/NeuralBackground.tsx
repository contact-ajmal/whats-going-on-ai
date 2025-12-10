import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
  pulsePhase: number;
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    const initNodes = () => {
      const nodeCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 20000));
      nodesRef.current = [];
      
      for (let i = 0; i < nodeCount; i++) {
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          connections: [],
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
      
      // Create connections
      for (let i = 0; i < nodesRef.current.length; i++) {
        const node = nodesRef.current[i];
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const other = nodesRef.current[j];
          const distance = Math.sqrt((node.x - other.x) ** 2 + (node.y - other.y) ** 2);
          if (distance < 200 && node.connections.length < 4) {
            node.connections.push(j);
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.001;
      const nodes = nodesRef.current;
      
      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Mouse influence
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const mouseDistance = Math.sqrt(dx * dx + dy * dy);
        
        if (mouseDistance < 200) {
          const force = (200 - mouseDistance) / 200 * 0.02;
          node.vx += dx * force * 0.01;
          node.vy += dy * force * 0.01;
        }
        
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        
        // Damping
        node.vx *= 0.99;
        node.vy *= 0.99;
        
        // Boundaries
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));
        
        // Pulse effect
        const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.5 + 0.5;
        
        // Draw connections
        for (const j of node.connections) {
          const other = nodes[j];
          const distance = Math.sqrt((node.x - other.x) ** 2 + (node.y - other.y) ** 2);
          
          if (distance < 250) {
            const opacity = (1 - distance / 250) * 0.4 * pulse;
            
            // Create gradient for connection
            const gradient = ctx.createLinearGradient(node.x, node.y, other.x, other.y);
            gradient.addColorStop(0, `rgba(0, 180, 200, ${opacity})`);
            gradient.addColorStop(0.5, `rgba(150, 80, 200, ${opacity * 0.5})`);
            gradient.addColorStop(1, `rgba(0, 180, 200, ${opacity})`);
            
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
            
            // Traveling pulse on connection
            const pulsePos = (time * 0.5 + i * 0.1) % 1;
            const pulseX = node.x + (other.x - node.x) * pulsePos;
            const pulseY = node.y + (other.y - node.y) * pulsePos;
            
            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 180, 200, ${opacity * 2})`;
            ctx.fill();
          }
        }
        
        // Draw node
        const nodeOpacity = 0.4 + pulse * 0.3;
        const nodeSize = 2 + pulse * 2;
        
        // Glow effect
        const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, nodeSize * 4);
        glowGradient.addColorStop(0, `rgba(0, 180, 200, ${nodeOpacity * 0.4})`);
        glowGradient.addColorStop(1, 'rgba(0, 180, 200, 0)');
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize * 4, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();
        
        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 180, 200, ${nodeOpacity})`;
        ctx.fill();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}
