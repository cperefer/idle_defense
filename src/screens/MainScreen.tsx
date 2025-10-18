import { useEffect, useRef, useState } from "react";

export const MainScreen = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const draw = (frameCount: number) => {
    if (context) {
      context.canvas.width = 800;
      context.canvas.height = 800;
      context.fillRect(0, 0, 800, 800);
    }

    // Set center of canvas to draw player
    // const centerX = center.x;
    // const centerY = center.y;
    // const radius = 20;
  }

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      setContext(ctx);
    }
  }, []);

  useEffect(() => {
    let frameCount = 0;
    let animationFrameId: number;

    // Check if null context has been replaced on component mount
    if (context) {
      //Our draw came here
      const render = () => {
        frameCount++;
        draw(frameCount);
        animationFrameId = window.requestAnimationFrame(render);
      };
      render();
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw, context]);

  return (
    <canvas ref={canvasRef}>MainScreen</canvas>
  )
}
