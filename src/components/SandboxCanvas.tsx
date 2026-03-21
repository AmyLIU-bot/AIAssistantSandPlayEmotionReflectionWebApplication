import React, { useState, useRef, useCallback } from "react";
import { ZoomIn, ZoomOut, RotateCw, RotateCcw, Trash2 } from "lucide-react";

export interface PlacedObject {
  id: string;
  type: string;
  image: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

interface SandboxCanvasProps {
  objects: PlacedObject[];
  onUpdateObject: (id: string, updates: Partial<PlacedObject>) => void;
  onRemoveObject: (id: string) => void;
  onDropNew: (type: string, image: string, x: number, y: number) => void;
}

export function SandboxCanvas({ objects, onUpdateObject, onRemoveObject, onDropNew }: SandboxCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const data = e.dataTransfer.getData("application/json");
    if (!data) return;

    const parsed = JSON.parse(data);
    const x = e.clientX - rect.left - 32;
    const y = e.clientY - rect.top - 32;

    if (parsed.isNew) {
      onDropNew(parsed.type, parsed.image, x, y);
    } else {
      onUpdateObject(parsed.id, { x, y });
    }
  }, [onDropNew, onUpdateObject]);

  const handlePointerDown = (e: React.PointerEvent, obj: PlacedObject) => {
    e.stopPropagation();
    setDragging(obj.id);
    setSelected(obj.id);
    const rect = (e.target as HTMLElement).closest('[data-object]')?.getBoundingClientRect();
    if (!rect) return;
    setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - offset.x;
    const y = e.clientY - rect.top - offset.y;
    onUpdateObject(dragging, { x, y });
  };

  const handlePointerUp = () => setDragging(null);
  const handleCanvasClick = () => setSelected(null);

  const handleZoom = (id: string, delta: number) => {
    const obj = objects.find((o) => o.id === id);
    if (!obj) return;
    const newScale = Math.max(0.5, Math.min(3, obj.scale + delta));
    onUpdateObject(id, { scale: newScale });
  };

  const handleRotate = (id: string, delta: number) => {
    const obj = objects.find((o) => o.id === id);
    if (!obj) return;
    onUpdateObject(id, { rotation: obj.rotation + delta });
  };

  return (
    <div
      ref={canvasRef}
      className="relative flex-1 rounded-xl overflow-hidden"
      style={{
        background: `
          linear-gradient(160deg, hsl(38 45% 88%) 0%, hsl(36 40% 82%) 50%, hsl(34 38% 80%) 100%)
        `,
        backgroundImage: `
          linear-gradient(160deg, hsl(38 45% 88%) 0%, hsl(36 40% 82%) 50%, hsl(34 38% 80%) 100%),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")
        `,
        backgroundSize: "cover, 200px 200px",
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={handleCanvasClick}
    >
      {objects.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-muted-foreground/50 text-sm select-none">
            Drag objects here to begin your reflection…
          </p>
        </div>
      )}

      {objects.map((obj) => (
        <div
          key={obj.id}
          data-object
          className={`absolute select-none cursor-grab active:cursor-grabbing group ${
            dragging === obj.id ? "z-20" : selected === obj.id ? "z-20" : "z-10"
          }`}
          style={{ left: obj.x, top: obj.y }}
          onClick={(e) => { e.stopPropagation(); setSelected(obj.id); }}
        >
          <div
            className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)] transition-transform duration-150 active:scale-90 origin-center"
            style={{
              transform: `scale(${obj.scale}) rotate(${obj.rotation}deg)`,
            }}
            onPointerDown={(e) => handlePointerDown(e, obj)}
          >
            <img
              src={obj.image}
              alt={obj.type}
              className="w-16 h-16 object-contain pointer-events-none"
              draggable={false}
            />
          </div>

          {/* Controls toolbar */}
          {selected === obj.id && !dragging && (
            <div
              className="absolute left-1/2 -translate-x-1/2 -bottom-10 flex items-center gap-0.5 bg-card/95 backdrop-blur-sm rounded-lg border border-border/50 shadow-md px-1 py-0.5"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => handleZoom(obj.id, -0.2)}
                className="p-1 rounded hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors active:scale-95"
                title="Zoom out"
              >
                <ZoomOut size={14} />
              </button>
              <button
                onClick={() => handleZoom(obj.id, 0.2)}
                className="p-1 rounded hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors active:scale-95"
                title="Zoom in"
              >
                <ZoomIn size={14} />
              </button>
              <div className="w-px h-4 bg-border/50 mx-0.5" />
              <button
                onClick={() => handleRotate(obj.id, -15)}
                className="p-1 rounded hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors active:scale-95"
                title="Rotate left"
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={() => handleRotate(obj.id, 15)}
                className="p-1 rounded hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors active:scale-95"
                title="Rotate right"
              >
                <RotateCw size={14} />
              </button>
              <div className="w-px h-4 bg-border/50 mx-0.5" />
              <button
                onClick={() => { onRemoveObject(obj.id); setSelected(null); }}
                className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors active:scale-95"
                title="Remove"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}

          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {selected !== obj.id && obj.type}
          </span>
        </div>
      ))}
    </div>
  );
}
