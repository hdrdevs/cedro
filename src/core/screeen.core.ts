import { IScreen } from "../interfaces/screen.interface";
import { Vector2D } from "../types/vector2d.type";

export class Screen implements IScreen {
    dimensions: Vector2D;
    onResizeCB: () => void;
    constructor() {
        this.dimensions = {
            x: 0,
            y: 0,
        };

        this.onResizeCB = () => {};

        window.addEventListener("resize", () => {

            this.updateSize();
            this.onResizeCB();
            
        })

        this.updateSize();
        
    }

    onResize(cb: () => void): void {
        this.onResizeCB = cb;
    }

    /**
     * Populates the size of the object.
     *
     * @return {void} This function does not return anything.
     */
    populateSize(): void {
        console.log("populateSize", this.dimensions);
    }

    updateSize(): void {
        this.setWidth(window.innerWidth);
        this.setHeight(window.innerHeight);
    }

    /**
     * Retrieves the width of the object.
     *
     * @return {number} The width of the object.
     */
    getWidth(): number {
        return this.dimensions.x;
    }

    /**
     * Get the height of the object.
     *
     * @return {number} The height of the object.
     */
    getHeight(): number {
        return this.dimensions.y;
    }

    /**
     * Sets the width of the object.
     *
     * @param {number} width - The width value to set.
     * @return {void} This function does not return anything.
     */
    setWidth(width: number): void {
        this.dimensions.x = width;
    }

    /**
     * Sets the height of the object.
     *
     * @param {number} height - The height value to set.
     * @return {void} This function does not return a value.
     */
    setHeight(height: number): void {
        this.dimensions.y = height;
    }
}