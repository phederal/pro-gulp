/* @ Import Modules ——————————————————————————— */
import path from "../config/path.js";
import theme from "../config/theme.js";
import gulp from "gulp";
import log from "fancy-log";
import plumber from "gulp-plumber";
import notify from "gulp-notify-candy";
import svgSprite from "gulp-svg-sprite";
import { del } from "../config/functions.js";
import pump from "pump";


// @ Task - Clear / Clean
export function spriteMono(cb) {
    pump([ gulp.src(path.sprite.src.mono, { allowEmpty: true }),
        plumber({
            errorHandler: notify.onError(error => ({
                title: "Sprite SVG Error",
                message: error.message,
                onLast: true
            }))
        }), // ---
        svgSprite({
            mode: {
                stack: {
                    sprite: "../mono.svg",
                    example: { dest: "../mono.html" }
                }
            },
            shape: {
                transform: [
                    {
                        svgo: {
                            plugins: [
                                {
                                    // Plugins with config
                                    removeAttrs: {
                                        attrs: [ "class", "data-name", "fill", "stroke", "stroke.*" ]
                                    },

                                    // Plugins enabled/disabled
                                    removeScriptElement: true
                                }
                            ]
                        }
                    }
                ]
            },
            log: false // 'info', 'verbose' or 'debug'
        })
            .on("error", function (err) {
                log.error(theme.sprite.error.mono, err);
                this.emit("end");
            })
            .on("end", () => { log(theme.sprite.finish.mono) }),
        gulp.dest(path.sprite.dest)
    ]);
    return Promise.resolve(cb);
};

export function spriteMulti(cb) {
    pump([ gulp.src(path.sprite.src.multi, { allowEmpty: true }),
        plumber({
            errorHandler: notify.onError(error => ({
                title: "Sprite SVG Error",
                message: error.message,
                onLast: true
            }))
        }), // ---
        svgSprite({
            mode: {
                stack: {
                    sprite: "../multi.svg",
                    example: { dest: "../multi.html" }
                }
            },
            shape: {
                transform: [
                    {
                        svgo: {
                            plugins: [
                                {
                                    // Plugins with config
                                    removeAttrs: {
                                        attrs: [ "class", "data-name" ]
                                    },

                                    // Plugins enabled/disabled
                                    removeUselessStrokeAndFill: false,
                                    inlineStyles: {
                                        onlyMatchedOnce: false
                                    }
                                },

                                // enable builtin plugin not included in default preset
                                "removeScriptElement",
                                "removeDoctype",
                                "removeXMLProcInst",
                                "removeEditorsNSData",
                                "removeMetadata",
                                "removeComments",
                                "removeDesc",
                                "removeTitle",
                                "removeUselessDefs",
                                "removeUselessStrokeAndFill",
                                "removeViewBox",
                                "removeEmptyAttrs",
                                "cleanupIDs",
                                "prefixIds"
                            ]
                        }
                    }
                ]
            },
            log: false // 'info', 'verbose' or 'debug'
        })
            .on("error", function (err) {
                log.error(theme.sprite.error.multi, err);
                this.emit("end");
            })
            .on("end", () => { log(theme.sprite.finish.multi) }),
        gulp.dest(path.sprite.dest)
    ]);
    return Promise.resolve(cb);
};

export const sprite =
    (del(path.sprite.del), gulp.parallel(spriteMono, spriteMulti));
