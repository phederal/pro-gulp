/* @ Import Modules ——————————————————————————— */
import app from "../config/app.js";
import path from "../config/path.js";
import theme from "../config/theme.js";
import gulp from "gulp";
import log from "fancy-log";
import plumber from "gulp-plumber";
import notify from "gulp-notify-candy";
import pngquant from "imagemin-pngquant";
import changed from "gulp-changed";
import webp from "gulp-webp";
import gulpif from "gulp-if";
import size from "gulp-size";
import pump from "pump";
const imagemin = require("fix-esm-candy").require("gulp-imagemin-candy").default;
const mozjpeg = require("fix-esm-candy").require("imagemin-mozjpeg").default;
const svgo = require("fix-esm-candy").require("imagemin-svgo").default;


// @ Task - Minify
export function imageMinify() {
    return pump([ gulp.src(path.img.src, { queue: true }),
        plumber({
            errorHandler: notify.onError(error => ({
                title: "IMG MIN Error",
                message: error.message,
                onLast: true
            }))
        }), // ---
        changed(path.img.dest),
        gulpif(app.isProd, imagemin([
            mozjpeg({ quality: app.imagemin.imgQuality, progressive: app.imagemin.progressive }),
            pngquant(app.imagemin.pngQuality)
        ],
        {
            verbose: true,
            silent: false
        })
            .on("error", function (err) {
                log.error(theme.img.error.minify, err);
                this.emit("end");
            })),
        gulpif(app.isDev, imagemin([
            mozjpeg({ quality: app.imagemin.imgQuality, progressive: app.imagemin.progressive }),
            pngquant(app.imagemin.pngQuality)
        ], {
            verbose: true,
            silent: false
        })
            .on("error", function (err) {
                log.error(theme.img.error.minify, err);
                this.emit("end");
            })),
        gulpif(app.isProd, size({
            title: theme.img.prod
        })),
        gulpif(app.isDev, size({
            title: theme.img.dev
        })),
        gulp.dest(path.img.dest)
    ]);
};
export function imageWebp() {
    return pump([ gulp.src(path.img.src, { queue: true }, app.isProd ? log(theme.img.start_prod) : log(theme.img.start_dev)),
        plumber({
            errorHandler: notify.onError(error => ({
                title: "IMG WEBP Error",
                message: error.message,
                onLast: true
            }))
        }), // ---
        changed(path.img.dest),
        webp()
            .on("error", function (err) {
                log.error(theme.img.error.webp, err);
                this.emit("end");
            }),
        gulp.dest(path.img.dest),
        size({
            title: theme.img.webp
        })
    ]);
};

export function svgMinify() {
    return pump([ gulp.src(path.img.svg, { queue: true }),
        plumber({
            errorHandler: notify.onError(error => ({
                title: "IMG SVG Error",
                message: error.message,
                onLast: true
            }))
        }), // ---
        changed(path.img.dest),
        imagemin([
            svgo({
                // plugins: [
                //     ...[
                //         'removeDoctype',
                //         'removeXMLProcInst',
                //         'removeXMLNS',
                //         'removeEditorsNSData',
                //         'removeMetadata',
                //         'removeComments',
                //         'removeViewBox',
                //         'removeDesc',
                //         'removeTitle',
                //         'removeUselessDefs',
                //         'removeUselessStrokeAndFill',
                //         'removeEmptyAttrs',
                //         'cleanupIDs'
                //     ].map((name) => ({
                //         active: true,
                //         name
                //     })),
                //     ...[
                //         'cleanupNumericValues',
                //         'convertPathData',
                //         'convertTransform',
                //         'cleanupListOfValues'
                //     ].map((name) => ({
                //         active: true,
                //         name,
                //         params
                //     }))
                // ]
                plugins: [
                    {
                        name: "preset-default",
                        params: {
                            overrides: {
                                // customize options for plugins included in preset
                                inlineStyles: {
                                    onlyMatchedOnce: false
                                }

                                // or disable plugins
                                // removeDoctype: false,
                            }
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
                    "prefixIds",

                    // enable and configure builtin plugin not included in preset
                    {
                        name: "sortAttrs",
                        params: {
                            xmlnsOrder: "alphabetical"
                        }
                    }
                ]
            })
        ], {
            verbose: true,
            silent: false
        })
            .on("error", function (err) {
                log.error(theme.img.error.minify, err);
                this.emit("end");
            }),
        gulp.dest(path.img.dest),
        size({
            title: theme.img.svg
        }).on("end", () => { log(theme.img.finish) })
    ]);
};

export const img = gulp.series(imageWebp, imageMinify, svgMinify);
