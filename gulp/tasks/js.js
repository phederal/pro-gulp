/* @ Import Modules ——————————————————————————— */
import app from "../config/app.js";
import path from "../config/path.js";
import theme from "../config/theme.js";
import gulp from "gulp";
import log from "fancy-log";
import plumber from "gulp-plumber";
import notify from "gulp-notify-candy";
import terser from "gulp-terser";
import webpack from "webpack-stream";
import size from "gulp-size";
import gulpif from "gulp-if";
import fileSync from "gulp-file-sync";
import webpackConfig from "../config/webpack.config.js";
import pump from "pump";

// @ Task - JS
export function js(cb) {
    pump([ gulp.src(path.js.src, { sourcemaps: app.isDev, allowEmpty: true }),
        plumber({
            errorHandler: notify.onError(error => ({
                title: "JavaScript Error",
                message: error.message,
                onLast: true
            }))
        }), // ---
        webpack(webpackConfig)
            .on("error", function (err) {
                log.error(theme.js.error.webpack, err);
                this.emit("end");
            })
            .once("pipe", () => {
                log(app.isProd ? `${theme.js.webpack.compile_prod}` : `${theme.js.webpack.compile_dev}`);
            }),
        gulpif(app.isDev, terser()
            .on("error", function (err) {
                log.error(theme.js.error.minify, err);
                this.emit("end");
            })),
        gulpif(app.isProd, size({
            title: theme.js.prod
        }), size({
            title: theme.js.dev
        })), // ---
        gulp.dest(path.js.dest, { sourcemaps: app.isDev })
    ]);

    // Sync files that are not included in the webpack bundle
    fileSync(`${path.js.rootFiles}`, `${path.js.dest}`, {
        recursive: false,
        ignore: [
            /^\+.*\.js$/i,
            /^_.*\.js$/i,
            /^app\.js$/i,
            /^.*\.md$/i,
            /^%webp\.js$/i
        ],
        addFileCallback: function (fullPathSrc, fullPathDest) {

        },
        deleteFileCallback: function (fullPathSrc, fullPathDest) {

        },
        updateFileCallback: function (fullPathSrc, fullPathDest) {

        }
    });
    return Promise.resolve(cb);
};
