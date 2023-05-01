/* @ Import Modules ——————————————————————————— */
import app from "../config/app.js";
import path from "../config/path.js";
import theme from "../config/theme.js";
import gulp from "gulp";
import log from "fancy-log";
import plumber from "gulp-plumber";
import notify from "gulp-notify-candy";
import fs from "fs";
import changed from "gulp-changed";
import fonter from "gulp-fonter";
import ttf2woff from "gulp-ttf2woff-candy";
import ttf2woff2 from "gulp-ttf2woff2";
import pump from "pump";

// @ Task - Font
export function fontOTF2TTF() {
    return pump([ gulp.src(path.font.src.otf, { allowEmpty: true }),
        plumber({
            errorHandler: notify.onError(error => ({
                title: "OTF -> TTF Error",
                message: error.message,
                onLast: true
            }))
        }), // ---
        changed(path.font.src.dev),
        fonter(app.fonter)
            .on("error", function (err) {
                log.error(theme.font.error.otf, err);
                this.emit("end");
            })
            .on("pipe", () => { log(theme.font.otf2ttf) }),
        gulp.dest(path.font.src.dev)
    ]);
};
export function fontTTF2WOFF() {
    return pump([ gulp.src(path.font.src.ttf, { allowEmpty: true }),
        plumber({
            errorHandler: notify.onError(error => ({
                title: "TTF -> WOFF Error",
                message: error.message
            }))
        }), // ---
        changed(path.font.dest),
        ttf2woff()
            .on("pipe", () => { log(theme.font.ttf2woff) })
            .on("error", function (err) {
                log.error(theme.font.error.ttf2woff, err);
                this.emit("end");
            }),
        gulp.dest(path.font.dest)
    ]);
};

export function fontTTF2WOFF2() {
    return pump([ gulp.src(path.font.src.ttf, { allowEmpty: true }),
        plumber({
            errorHandler: notify.onError(error => ({
                title: "TTF -> WOFF2 Error",
                message: error.message
            }))
        }), // ---
        changed(path.font.dest),
        ttf2woff2(app.ttf2woff2)
            .on("pipe", () => { log(theme.font.ttf2woff2) })
            .on("error", function (err) {
                log.error(theme.font.error.ttf2woff2, err);
                this.emit("end");
            }),
        gulp.dest(path.font.dest)
    ]);
};

export function fontStyle(cb) {
    const fontsFile = path.font.src.scss;
    fs.stat(path.font.dest, function (err, stat) {
        if (err == null) {
            fs.readdir(path.font.dest, function (err, fontsFiles) {
                if (err) throw err;
                if (fontsFiles) {
                    if (!fs.existsSync(fontsFile)) {
                        fs.writeFile(fontsFile, "", cb);
                        let newFileOnly;
                        for (let i = 0; i < fontsFiles.length; i++) {
                            const fontFileName = fontsFiles[i].split(".")[0];
                            if (newFileOnly !== fontFileName) {
                                const fontName = fontFileName.split("-")[0] ? fontFileName.split("-")[0] : fontFileName;
                                let fontWeight = fontFileName.split("-")[1] ? fontFileName.split("-")[1] : fontFileName;
                                let fontStyle = fontFileName.split("-")[1] ? fontFileName.split("-")[1] : fontFileName;
                                if (fontWeight.toLowerCase() === "thin") {
                                    fontWeight = 100;
                                    fontStyle = "normal";
                                } else if (fontWeight.toLowerCase() === "thinitalic") {
                                    fontWeight = 100;
                                    fontStyle = "italic";
                                } else if (fontWeight.toLowerCase() === "extralight") {
                                    fontWeight = 200;
                                    fontStyle = "normal";
                                } else if (fontWeight.toLowerCase() === "extralightitalic") {
                                    fontWeight = 200;
                                    fontStyle = "italic";
                                } else if (fontWeight.toLowerCase() === "light") {
                                    fontWeight = 300;
                                    fontStyle = "normal";
                                } else if (fontWeight.toLowerCase() === "lightitalic") {
                                    fontWeight = 300;
                                    fontStyle = "italic";
                                } else if (fontWeight.toLowerCase() === "medium") {
                                    fontWeight = 500;
                                    fontStyle = "normal";
                                } else if (fontWeight.toLowerCase() === "mediumitalic") {
                                    fontWeight = 500;
                                    fontStyle = "italic";
                                } else if (fontWeight.toLowerCase() === "semibold") {
                                    fontWeight = 600;
                                    fontStyle = "normal";
                                } else if (fontWeight.toLowerCase() === "semibolditalic") {
                                    fontWeight = 600;
                                    fontStyle = "italic";
                                } else if (fontWeight.toLowerCase() === "bold") {
                                    fontWeight = 700;
                                    fontStyle = "normal";
                                } else if (fontWeight.toLowerCase() === "bolditalic") {
                                    fontWeight = 700;
                                    fontStyle = "italic";
                                } else if (fontWeight.toLowerCase() === "extrabold" || fontWeight.toLowerCase() === "heavy") {
                                    fontWeight = 800;
                                    fontStyle = "normal";
                                } else if (fontWeight.toLowerCase() === "extrabolditalic" || fontWeight.toLowerCase() === "heavyitalic") {
                                    fontWeight = 800;
                                    fontStyle = "italic";
                                } else if (fontWeight.toLowerCase() === "black") {
                                    fontWeight = 900;
                                    fontStyle = "normal";
                                } else if (fontWeight.toLowerCase() === "blackitalic") {
                                    fontWeight = 900;
                                    fontStyle = "italic";
                                } else if (fontWeight.toLowerCase() === "italic") {
                                    fontWeight = 400;
                                    fontStyle = "italic";
                                } else {
                                    fontWeight = 400;
                                    fontStyle = "normal";
                                }
                                // eslint-disable-next-line max-len
                                fs.appendFile(fontsFile, `\n@font-face {\n    font-weight: ${fontWeight};\n    font-family: ${fontName};\n    font-style: ${fontStyle};\n    src:\n        url("../font/${fontFileName}.ttf") format("truetype"),\n        url("../font/${fontFileName}.woff2") format("woff2"),\n        url("../font/${fontFileName}.woff") format("woff");\n    font-display: swap;\n}\r\n`, cb);
                                newFileOnly = fontFileName;
                            }
                        }
                        log(theme.font.finish);
                    } else {
                        log(theme.font.styleError);
                    }
                }
            });
        } else if (err.code === "ENOENT") {
            log(theme.font.error.notFound);
        } else {
            log(theme.font.error.default, err.code);
        }
    });
    return cb();
};

export const font = gulp.series(
    fontOTF2TTF,
    fontTTF2WOFF,
    fontTTF2WOFF2,
    fontStyle
);
