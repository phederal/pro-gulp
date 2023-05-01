/* @ Import Modules ——————————————————————————— */
import app from "../config/app.js";
import path from "../config/path.js";
import theme from "../config/theme.js";
import gulp from "gulp";
import log from "fancy-log";
import plumber from "gulp-plumber";
import notify from "gulp-notify-candy";
import fileInclude from "gulp-file-include";
import htmlmin from "gulp-html-minifier-terser";
import size from "gulp-size";
import webphtml from "gulp-html-php-picture";
import replace from "gulp-replace";
import gulpif from "gulp-if";
import pump from "pump";


// @ Task - HTML
export function html(cb) {
    pump([ gulp.src(path.html.src),
        plumber({
            errorHandler: notify.onError(error => ({
                title: "HTML Error",
                message: error.message,
                onLast: true
            }))
        }), // ---
        fileInclude({
            prefix: "@",
            basepath: "./src/html/"
        })
            .on("error", function (err) {
                log.error(theme.html.error.include, err);
                this.emit("end"); //
            }),
        webphtml(app.htmlwebp)
            .on("error", function (err) {
                log.error(theme.html.error.webp, err);
                this.emit("end");
            }),
        replace("<? php", "<?php"),
        gulpif(app.isDev, size({
            title: theme.html.dev
        })),
        gulpif(app.isDev, htmlmin(app.htmlmin)),
        gulpif(app.isProd, size({
            title: theme.html.prod
        })),
        gulp.dest(path.html.dest)
    ]);
    return Promise.resolve(cb);
};

// @ Task - HTML for Backend
export function htmlBackend(cb) {
    pump([ gulp.src(path.html.src),
        plumber({
            errorHandler: notify.onError(error => ({
                title: "HTML",
                message: error.message
            }))
        }),
        fileInclude({
            prefix: "@",
            basepath: "./src/html/"
        })
            .on("error", function (err) {
                log.error(theme.html.error.include, err);
                this.emit("end");
            }),
        webphtml(app.htmlwebp)
            .on("error", function (err) {
                log.error(theme.html.error.webp, err);
                this.emit("end");
            }),
        replace("<? php", "<?php"),
        gulpif(app.isProd, size({
            title: theme.html.prod
        })),
        gulp.dest(path.html.dest)
    ]);
    return Promise.resolve(cb);
};
