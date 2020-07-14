const runnerSrc = document.currentScript.src;

const importMap = {
	"mosaic/platform/": new URL("./platform/", runnerSrc),
	"mosaic/": new URL("./mosaic/", runnerSrc)
};

const importMapTag = document.createElement("script");
importMapTag.type = "importmap";
importMapTag.innerHTML = JSON.stringify({ imports: importMap }, null, "\t");

document.head.appendChild(importMapTag);