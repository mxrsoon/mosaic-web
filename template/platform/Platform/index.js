import { Viewport } from "mosaic/platform/core/index.js";
import { Color } from "mosaic/drawing/index.js";

/**
 * Contains information about the current web platform and associated managers.
 */
export class Platform {
    /**
     * Web platform user-agent string.
     * @type {string}
     */
    static get userAgent() {
        return navigator.userAgent;
    }

    /**
     * Theme-color of the application's web page.
     * @type {?Color}
     */
    static get themeColor() {
        const themeMeta = document.querySelector("meta[name='theme-color']");
        
        if (themeMeta) {
            try {
                return parseCSSColor(themeMeta.content);
            } catch { }
        }
    }

    static set themeColor(value) {
        let themeMeta = document.querySelector("meta[name='theme-color']");
        
        if (!themeMeta) {
            themeMeta = document.createElement("meta");
            themeMeta.name = "theme-color";
            document.head.appendChild(themeMeta);
        }

        themeMeta.content = value.toHex();
    }

    static get name() {
        return "web";
    }

    static get viewport() {
        return Viewport;
    }
}

/* CSS color helper functions */

const cssColorParserElement = document.createElement("div");
cssColorParserElement.style.display = "none";

function parseCSSColor(cssColor) {
    cssColorParserElement.style.color = cssColor;
    document.body.appendChild(cssColorParserElement);

    const computedColor = getComputedStyle(cssColorParserElement).color;
    let parts;

    if (computedColor.startsWith("rgb(")) {
        parts = computedColor.substr(4, computedColor.length - 5).split(",");
        parts = parts.map(value => parseInt(value));
    } else if (computedColor.startsWith("rgba(")) {
        parts = computedColor.substr(4, computedColor.length - 5).split(",");
        parts = parts.map(value => parseInt(value));
    } else {
        throw new Error("Invalid color");
    }

    return Color.fromRgb(...parts);
}