import { Canvas } from "@mosaic/platform/drawing/index.js";
import { Static, EventHandlerList } from "@mosaic/utils/index.js";

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
        onClick: new EventHandlerList(),
        onPointerDown: new EventHandlerList(),
        onPointerMove: new EventHandlerList(),
        onPointerUp: new EventHandlerList(),
        onResize: new EventHandlerList()
    }
};

/**
 * A class to represent application viewports.
 */
export class Viewport extends Static {
    /**
     * Viewport click event handlers.
     * @type {EventHandlerList}
     */
    static get onClick() {
        return privates.events.onClick;
    }

    /**
     * Viewport pointer down event handlers.
     * @type {EventHandlerList}
     */
    static get onPointerDown() {
        return privates.events.onPointerDown;
    }

    /**
     * Viewport pointer move event handlers.
     * @type {EventHandlerList}
     */
    static get onPointerMove() {
        return privates.events.onPointerMove;
    }

    /**
     * Viewport pointer up event handlers.
     * @type {EventHandlerList}
     */
    static get onPointerUp() {
        return privates.events.onPointerUp;
    }

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

window.addEventListener("click", (e) => Viewport.onClick.invoke({x: e.clientX, y: e.clientY}));
window.addEventListener("pointerdown", (e) => Viewport.onPointerDown.invoke({x: e.clientX, y: e.clientY}));
window.addEventListener("pointermove", (e) => Viewport.onPointerMove.invoke({x: e.clientX, y: e.clientY}));
window.addEventListener("pointerup", (e) => Viewport.onPointerUp.invoke({x: e.clientX, y: e.clientY}));
window.addEventListener("resize", () => Viewport.onResize.invoke(window.innerWidth, window.innerHeight));