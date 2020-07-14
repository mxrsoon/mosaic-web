import { Canvas } from "mosaic/platform/drawing/index.js";
import { Static, EventHandlerList } from "mosaic/utils/index.js";

/* Create main canvas for the viewport. */
function createCanvas() {
    const canvasElement = document.createElement("canvas");
    canvasElement.style.display = "block";
    canvasElement.style.position = "fixed";
    canvasElement.style.top = "0";
    canvasElement.style.right = "0";
    canvasElement.style.bottom = "0";
    canvasElement.style.left = "0";

    canvasElement.style.width = "100%";
    canvasElement.style.height = "100%";

    canvasElement.style.background = "transparent";
    canvasElement.style.overflow = "hidden";
    canvasElement.style.overscrollBehavior = "none";
    canvasElement.style.touchAction = "none";

    document.body.append(canvasElement);

    return new Canvas({
        internalCanvas: canvasElement,
        resizable: true,
        scalable: true
    });
}

const canvas = createCanvas();

/* Private fields for Viewport class. */
const privates = {
    events: {
        onResize: new EventHandlerList()
    }
};

/**
 * A class to represent application viewports.
 */
export class Viewport extends Static {
    /**
     * Viewport resize event handlers.
     * @type {EventHandlerList}
     */
    static get onResize() {
        return privates.events.onResize;
    }

    /**
     * Width of the viewport.
     * @type {number}
     */
    static get width() {
        return window.innerWidth;
    }

    /**
     * Height of the viewport.
     * @type {number}
     */
    static get height() {
        return window.innerHeight;
    }

    /**
     * Current viewport scale factor.
     * @type {number}
     */
    static get scaleFactor() {
        return window.devicePixelRatio;
    }

    /**
     * A canvas for drawing on the current viewport.
     * @type {Canvas}
     */
    static get canvas() {
        return canvas;
    }
}

Viewport.onResize.add((width, height) => {
    Viewport.canvas.scaleFactor = Viewport.scaleFactor;
    Viewport.canvas.width = width;
    Viewport.canvas.height = height;
});

window.addEventListener("resize", () => Viewport.onResize.invoke(window.innerWidth, window.innerHeight));