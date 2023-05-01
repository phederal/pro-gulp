/* @ Import Modules ——————————————————————————— */
import app from "../config/app.js";
import path from "../config/path.js";
import theme from "../config/theme.js";
import gulp from "gulp";
import log from "fancy-log";
import plumber from "gulp-plumber";
import favicons from "gulp-favicons";
import notify from "gulp-notify-candy";
import rename from "gulp-rename";
import { del } from "../config/functions.js";
import pump from "pump";

// @ Task - Favicon
export function favicon(cb) {
    pump([ gulp.src(path.favicon.src, { allowEmpty: true }),
        plumber({
            errorHandler: notify.onError(error => ({
                title: "Favicon Error",
                message: error.message,
                onLast: true
            }))
        }), // ---
        favicons(app.favicon)
            .on("pipe", () => { log(theme.ico.start) })
            .on("error", (err) => {
                log.error(theme.ico.error, err);
            }),
        gulp.dest(path.favicon.dest),
        gulp.src(`${path.root}/ico/index.html`, { allowEmpty: true }),
        rename({
            dirname: "html/partials",
            basename: "favicon",
            prefix: "",
            extname: ".html"
        })
            .on("error", (err) => {
                log.error(theme.ico.error, err);
            }), // ---
        gulp.dest("./src").on("finish", () => { del(path.root + "/ico/index.html", { force: true }), log(theme.ico.finish) })
    ]);
    return Promise.resolve(cb);
};
