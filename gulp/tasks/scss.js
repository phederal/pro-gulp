/* @ Import Modules ——————————————————————————— */
import app from "../config/app.js";
import path from "../config/path.js";
import theme from "../config/theme.js";
import gulp from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify-candy";
import size from "gulp-size";
import csso from "gulp-csso";
import rename from "gulp-rename";
import gulpSass from "gulp-sass";
import dartSass from "sass";
import sassglob from "gulp-sass-glob";
import postcss from "gulp-postcss";
import cssimport from "postcss-import";
import groupcssmedia from "postcss-combine-media-query";
import uncomment from "postcss-discard-comments";
import cssvars from "postcss-variable-compress";
import webpcss from "webp-in-css/plugin";
import autoprefixer from "autoprefixer";
import sortgroupmedia from "postcss-sort-media-queries";
import fileSync from "gulp-file-sync";
import pump from "pump";

// import { stream as critical } from "critical"; // disable this
// const critical = require("fix-esm-candy").require("critical");


/* @ Vars ————————————————————————————————————— */
// SCSS
const sass = gulpSass(dartSass);

// PostCSS Plugins
const processor = [
    cssimport(app.scss.cssimport),
    groupcssmedia(),
    sortgroupmedia({
        sort: "desktop-first" // 'mobile-first' or 'desktop-first'
    }),
    app.isProd ? (uncomment(), cssvars()) : uncomment(),
    app.isProd ? (webpcss(app.scss.webpcss), autoprefixer(app.scss.autoprefixer)) : webpcss(app.scss.webpcss)
];


// @ Task - SCSS
export function scss(cb) {
    pump([ gulp.src(path.scss.src, { sourcemaps: app.isDev }),
        plumber({
            errorHandler: notify.onError(error => ({
                title: "SCSS Error",
                message: error.message,
                onLast: true
            }))
        }), // ---
        sassglob()
            .on("error", function () {
                this.emit("end");
            }),
        sass({
            includePaths: [ "./node_modules/" ],
            outputStyle: "expanded"
        })
            .on("error", function () {
                this.emit("end");
            }),
        postcss(processor)
            .on("error", function () {
                this.emit("end");
            }),
        gulp.dest(path.scss.dest, { sourcemaps: app.isDev }),
        size({
            title: theme.scss.unminify
        }),
        rename({ suffix: ".min" }),
        csso()
            .on("error", function () {
                this.emit("end");
            }),
        size({
            title: theme.scss.minify
        }), // ---
        gulp.dest(path.scss.dest, { sourcemaps: app.isDev })
    ]),
    fileSync(`${path.scss.rootFiles}`, `${path.scss.dest}`, {
        recursive: false,
        ignore: [
            /^.*\.(?:scss|sass)$/i,
            /^_.*\.(?:scss|sass)$/i,
            /^app\.(?:scss|sass)$/i,
            /^.*\.md$/i
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
