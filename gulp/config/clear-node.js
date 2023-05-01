const { del } = require("./functions.js");

async function clear() {
    return del([
        "./public",
        "./project.js",
        "./projectFTP.js",
        "./projectSmartGrid.js",
        "./src/font/*.*",
        "./src/html/pages/*.*",
        "./src/html/partials/*favicon.*",
        "./src/sass/base/_fonts.scss",
        "./src/sass/vendors/*.*",
        "./src/img/*.*", "!./src/img/sprite-{mono,multi}.svg"
    ],
    await console.log("Project full clean completed!"));
}; clear();
