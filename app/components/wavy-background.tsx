"use client";
import { motion } from "motion/react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";
import { useGpuTier } from "@/hooks/use-gpu-tier";
import { transition } from "@/lib/constants";
import { cn } from "@/lib/utils";

const getSpeed = (speed: "slow" | "fast") => {
  switch (speed) {
    case "slow":
      return 0.001;
    case "fast":
      return 0.002;
    default:
      return 0.001;
  }
};

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
  const gpuTier = useGpuTier();
  const noise = createNoise3D();
  let w: number = -1,
    h: number = -1,
    nt: number = -1,
    i: number = -1,
    x: number = -1,
    ctx: CanvasRenderingContext2D = null as unknown as CanvasRenderingContext2D,
    canvas: HTMLCanvasElement | null = null;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];

  const drawWave = useCallback(
    (n: number) => {
      nt += getSpeed(speed);
      for (i = 0; i < n; i++) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (x = 0; x < w; x += 5) {
          const y = noise(x / 1200, 0.3 * i, nt) * 100 * 2;
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
    },
    [ctx, h, i, noise, nt, w, waveColors, x, speed],
  );

  let animationId: number = -1;
  const render = useCallback(() => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = backgroundFill || "transparent";
    ctx.globalAlpha = waveOpacity || 0.5;
    ctx.fillRect(0, 0, w, h);
    drawWave(5);
    if (gpuTier.tier > 1) {
      animationId = requestAnimationFrame(render);
    }
  }, [backgroundFill, ctx, drawWave, gpuTier.tier, h, w, waveOpacity]);

  const init = useCallback(() => {
    canvas = canvasRef.current;
    ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;
    ctx.filter = `blur(${blur}px)`;
    nt = 0;
    window.onresize = () => {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };
    render();
  }, [blur, canvas, ctx, render]);

  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(animationId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init, animationId]);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    // I'm sorry but I have got to support it on Safari.
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome"),
    );
  }, []);

  return (
    <div
      className={cn(
        "-z-50 flex h-screen flex-col items-center justify-center",
        containerClassName,
      )}
    >
      <div className="fixed inset-0 h-full w-full bg-radial-[at_90%] from-primary to-background" />
      <motion.canvas
        animate={{ scale: 1.02, opacity: 1 }}
        className="fixed -bottom-48 z-0"
        id="canvas"
        initial={{ scale: 2, opacity: 0 }}
        ref={canvasRef}
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      />
      <motion.div
        animate={{ overflow: "inherit" }}
        className={cn("relative z-10", className)}
        initial={{ overflow: "hidden" }}
        transition={{ delay: transition.delay + transition.duration }}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
};
