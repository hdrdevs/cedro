import { Vector2D } from "../types/vector2d.type";

export interface IScreen {
    dimensions: Vector2D;

    onResizeCB: () => void;

    getWidth(): number;
    getHeight(): number;

    setWidth(width: number): void;
    setHeight(height: number): void;
    updateSize(): void;
    populateSize(): void;

    onResize(cb: () => void): void;
}
