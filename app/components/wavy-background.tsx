"use client";
import { transition } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";
export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: unknown;
}) => {
  const noise = createNoise3D();
  let w: number,
    h: number,
    nt: number,
    i: number,
    x: number,
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement | null;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };

  const init = () => {
    canvas = canvasRef.current;
    ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;
    ctx.filter = `blur(${blur}px)`;
    nt = 0;
    window.onresize = function () {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };
    render();
  };

  const waveColors = colors ?? ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"];

  const drawWave = (n: number) => {
    nt += getSpeed();
    for (i = 0; i < n; i++) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (x = 0; x < w; x += 5) {
        const y = noise(x / 800, 0.3 * i, nt) * 100 * 2;
        ctx.lineTo(x, y + h * 0.5);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = waveColors[i % waveColors.length];
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#ad6024";
      ctx.shadowColor = "#ad6024";
      ctx.shadowBlur = 36;
      ctx.stroke();
      ctx.restore();
    }
  };

  let animationId: number;
  const render = () => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = backgroundFill || "transparent";
    ctx.globalAlpha = waveOpacity || 0.5;
    ctx.fillRect(0, 0, w, h);
    drawWave(5);
    animationId = requestAnimationFrame(render);
  };

  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    // I'm sorry but I have got to support it on Safari.
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn("flex h-screen flex-col items-center justify-center -z-50", containerClassName)}
    >
      <div className="w-full h-full fixed inset-0 bg-radial-[at_90%] from-primary to-background" />
      <motion.canvas
        className="fixed -bottom-48 z-0"
        initial={{ scale: 2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></motion.canvas>
      <motion.div
        initial={{ overflow: "hidden" }}
        animate={{ overflow: "inherit" }}
        transition={{ delay: transition.delay + transition.duration }}
        className={cn("relative z-10", className)}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
};
