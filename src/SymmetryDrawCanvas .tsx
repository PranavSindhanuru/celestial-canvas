import { useRef, useEffect, useState } from "react";

interface Position {
    x: number;
    y: number;
}

interface PathSegment {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export default function SymmetryDrawCanvas({ clearDrawingToggle, color }: { clearDrawingToggle: boolean, color: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const lastPosRef = useRef<Position | null>(null);
    const centerRef = useRef({ x: 0, y: 0 });
    const pathsRef = useRef<PathSegment[]>([]);

    const rafRef = useRef<number | null>(null);
    const pendingPosRef = useRef<Position | null>(null);

    const COS_30 = 0.8660254037844387;
    const SIN_30 = 0.5;

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pathsRef.current = [];
    };

    const getLighterColor = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        // Increase brightness by ~20%
        const newR = Math.min(255, Math.round(r * 1.2));
        const newG = Math.min(255, Math.round(g * 1.2));
        const newB = Math.min(255, Math.round(b * 1.2));

        return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
    };

    useEffect(() => {
        clearCanvas();
    }, [clearDrawingToggle]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        ctx.strokeStyle = color;
        ctx.shadowColor = getLighterColor(color);
    }, [color]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", {
            alpha: true,
            desynchronized: true
        });
        if (!ctx) return;

        const resize = () => {
            const { innerWidth, innerHeight } = window;
            const dpr = window.devicePixelRatio || 1;

            canvas.width = innerWidth * dpr;
            canvas.height = innerHeight * dpr;
            canvas.style.width = `${innerWidth}px`;
            canvas.style.height = `${innerHeight}px`;

            centerRef.current = {
                x: Math.round(innerWidth * 0.5),
                y: Math.round(innerHeight * 0.5)
            };

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.lineWidth = 3;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.strokeStyle = color;
            ctx.shadowColor = getLighterColor(color);
            ctx.shadowBlur = 10;

            ctx.clearRect(0, 0, innerWidth, innerHeight);
        };

        resize();
        window.addEventListener("resize", resize);

        return () => {
            window.removeEventListener("resize", resize);
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    const getPos = (e: MouseEvent | TouchEvent): Position => {
        if ("touches" in e) {
            const touch = e.touches[0];
            return {
                x: Math.round(touch.clientX),
                y: Math.round(touch.clientY)
            };
        }
        return {
            x: Math.round(e.clientX),
            y: Math.round(e.clientY)
        };
    };

    const startDraw = (e: MouseEvent | TouchEvent) => {
        const pos = getPos(e);
        setIsDrawing(true);
        lastPosRef.current = pos;
    };

    const drawSymmetry = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
        const { x: cx, y: cy } = centerRef.current;

        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;

        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(x1, y1, mx, my);
        ctx.quadraticCurveTo(x2, y2, x2, y2);

        let dx1 = x1 - cx, dy1 = cy - y1;
        let dx2 = x2 - cx, dy2 = cy - y2;
        let dmx = mx - cx, dmy = cy - my;

        for (let i = 1; i <= 11; i++) {
            const newDx1 = dx1 * COS_30 - dy1 * SIN_30;
            const newDy1 = dx1 * SIN_30 + dy1 * COS_30;
            const newDx2 = dx2 * COS_30 - dy2 * SIN_30;
            const newDy2 = dx2 * SIN_30 + dy2 * COS_30;
            const newDmx = dmx * COS_30 - dmy * SIN_30;
            const newDmy = dmx * SIN_30 + dmy * COS_30;

            dx1 = newDx1;
            dy1 = newDy1;
            dx2 = newDx2;
            dy2 = newDy2;
            dmx = newDmx;
            dmy = newDmy;

            const rx1 = cx + dx1;
            const ry1 = i % 2 === 1 ? cy + dy1 : cy - dy1;
            const rx2 = cx + dx2;
            const ry2 = i % 2 === 1 ? cy + dy2 : cy - dy2;
            const rmx = cx + dmx;
            const rmy = i % 2 === 1 ? cy + dmy : cy - dmy;

            ctx.moveTo(rx1, ry1);
            ctx.quadraticCurveTo(rx1, ry1, rmx, rmy);
            ctx.quadraticCurveTo(rx2, ry2, rx2, ry2);
        }
    };
    const performDraw = () => {
        rafRef.current = null;

        if (!pendingPosRef.current || !lastPosRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const pos = pendingPosRef.current;
        const prevPos = lastPosRef.current;

        pathsRef.current.push({
            x1: prevPos.x,
            y1: prevPos.y,
            x2: pos.x,
            y2: pos.y
        });

        ctx.beginPath();
        drawSymmetry(ctx, prevPos.x, prevPos.y, pos.x, pos.y);
        ctx.stroke();

        lastPosRef.current = pos;
    };

    const draw = (e: MouseEvent | TouchEvent) => {
        if (!isDrawing) return;
        e.preventDefault();
        pendingPosRef.current = getPos(e);
        if (rafRef.current === null) {
            rafRef.current = requestAnimationFrame(performDraw);
        }
    };

    const endDraw = () => {
        setIsDrawing(false);
        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
    };

    return (
        <canvas
            ref={canvasRef}
            className="block w-full h-full bg-transparent fixed top-0 left-0 cursor-crosshair touch-none z-20"
            onMouseDown={startDraw as any}
            onMouseMove={draw as any}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            onTouchStart={startDraw as any}
            onTouchMove={draw as any}
            onTouchEnd={endDraw}
        />
    );
}