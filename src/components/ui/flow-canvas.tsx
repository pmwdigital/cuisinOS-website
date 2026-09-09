"use client";

import { useEffect, useRef } from "react";

interface FlowCanvasProps {
    className?: string;
    pathCount?: number;
    speed?: number;
    lineColor?: string;
    particleColor?: string;
}

type Point = { x: number; y: number };

const bezierAt = (t: number, p0: Point, p1: Point, p2: Point, p3: Point): Point => {
    const u = 1 - t;
    return {
        x: u ** 3 * p0.x + 3 * u ** 2 * t * p1.x + 3 * u * t ** 2 * p2.x + t ** 3 * p3.x,
        y: u ** 3 * p0.y + 3 * u ** 2 * t * p1.y + 3 * u * t ** 2 * p2.y + t ** 3 * p3.y,
    };
};

const FlowCanvas = ({
    className = "",
    pathCount = 44,
    speed = 1,
    lineColor = "rgba(66, 43, 33, 0.16)",
    particleColor = "rgba(228, 125, 85, 0.8)",
}: FlowCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        if (!context) return;

        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;
        let frame = 0;
        let ripples: { x: number; y: number; radius: number; life: number }[] = [];

        const resize = () => {
            const ratio = Math.min(window.devicePixelRatio || 1, 2);
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = width * ratio;
            canvas.height = height * ratio;
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
        };

        const paths = Array.from({ length: pathCount }, (_, index) => ({
            fromLeft: index % 2 === 0,
            startY: (index / pathCount) * 1.4 - 0.2,
            t: Math.random(),
            step: 0.0016 + Math.random() * 0.0022,
        }));

        const handleClick = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            ripples.push({
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
                radius: 0,
                life: 1,
            });
        };

        const render = () => {
            context.clearRect(0, 0, width, height);
            const centerX = width / 2;
            const centerY = height / 2;

            ripples.forEach((ripple) => {
                ripple.radius += 13;
                ripple.life -= 0.016;
            });
            ripples = ripples.filter((ripple) => ripple.life > 0);

            paths.forEach((path) => {
                const startY = path.startY * height;
                const p0 = { x: path.fromLeft ? 0 : width, y: startY };
                const p1 = { x: path.fromLeft ? centerX * 0.5 : width - centerX * 0.5, y: startY };
                const p2 = { x: path.fromLeft ? centerX * 0.8 : width - centerX * 0.8, y: centerY };
                const p3 = { x: centerX, y: centerY };

                context.beginPath();
                context.moveTo(p0.x, p0.y);
                context.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
                context.strokeStyle = lineColor;
                context.lineWidth = 1;
                context.setLineDash([1, 5]);
                context.stroke();
                context.setLineDash([]);

                path.t += path.step * speed;
                if (path.t > 1) {
                    path.t = 0;
                    path.startY += (Math.random() - 0.5) * 0.02;
                }

                const position = bezierAt(path.t, p0, p1, p2, p3);
                let pushX = 0;
                let pushY = 0;
                ripples.forEach((ripple) => {
                    const dx = position.x - ripple.x;
                    const dy = position.y - ripple.y;
                    const distance = Math.hypot(dx, dy) || 1;
                    if (distance < ripple.radius + 110 && distance > ripple.radius - 110) {
                        const force = (1 - Math.abs(distance - ripple.radius) / 110) * ripple.life;
                        pushX += (dx / distance) * force * 70;
                        pushY += (dy / distance) * force * 70;
                    }
                });

                context.fillStyle = particleColor;
                context.fillRect(position.x + pushX - 1.4, position.y + pushY - 1.4, 2.8, 2.8);
            });

            frame = requestAnimationFrame(render);
        };

        resize();
        render();

        const observer = new ResizeObserver(resize);
        observer.observe(canvas);
        canvas.addEventListener("click", handleClick);

        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
            canvas.removeEventListener("click", handleClick);
        };
    }, [lineColor, particleColor, pathCount, speed]);

    return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};

export default FlowCanvas;
