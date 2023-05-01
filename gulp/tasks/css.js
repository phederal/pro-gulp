/* @ Import Modules ——————————————————————————— */
import app from "../config/app.js";
import path from "../config/path.js";
import theme from "../config/theme.js";
import gulp from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify-candy";
import concat from "gulp-concat";
import size from "gulp-size";
import csso from "gulp-csso";
import rename from "gulp-rename";
import pump from "pump";

// import webpcss from "gulp-webp-css";


// @ Task - CSS
export function css(cb) {
    pump([ gulp.src(path.css.src, { sourcemaps: app.isDev }),
        plumber({
            errorHandler: notify.onError(error => ({
                title: "CSS Error",
                message: error.message,
                onLast: true
            }))
        }), // ---
        concat("style.css"),
        gulp.dest(path.css.dest, { sourcemaps: app.isDev }),
        size({
            title: theme.css.unminify
        }),
        rename({ suffix: ".min" }),
        csso(),
        size({
            title: theme.css.minify
        }), // ---
        gulp.dest(path.css.dest, { sourcemaps: app.isDev })
    ]);
    return Promise.resolve(cb);
};
