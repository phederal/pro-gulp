/* @ Import Modules ——————————————————————————— */
import app from "../config/app.js";
import path from "../config/path.js";
import theme from "../config/theme.js";
import gulp from "gulp";
import log from "fancy-log";
import plumber from "gulp-plumber";
import notify from "gulp-notify-candy";
import fileInclude from "gulp-file-include";
import size from "gulp-size";
import gulpif from "gulp-if";
import strip from "gulp-strip-comments";
import pump from "pump";


// @ Task - PHP
export function php(cb) {
    pump([ gulp.src(path.php.src),
        plumber({
            errorHandler: notify.onError(error => ({
                title: "PHP Error",
                message: error.message,
                onLast: true
            }))
        }), // ---
        fileInclude({
            prefix: "@"
        })
            .on("error", function (err) {
                log.error(theme.php.error.include, err);
                this.emit("end"); //
            }),
        gulpif(app.isDev, size({
            title: theme.php.dev
        }), strip({
            space: false, trim: true, ignore: /url\([\w\s:\\/=\-\\+;,]*\)/g
        })),
        gulpif(app.isProd, size({
            title: theme.php.prod
        })),
        gulp.dest(path.php.dest)
    ]);
    return Promise.resolve(cb);
};
