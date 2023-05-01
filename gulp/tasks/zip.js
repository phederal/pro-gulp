/* @ Import Modules ——————————————————————————— */
import flags from "../config/flags.js";
import path from "../config/path.js";
import theme from "../config/theme.js";
import gulp from "gulp";
import log from "fancy-log";
import plumber from "gulp-plumber";
import notify from "gulp-notify-candy";
import zipPlugin from "gulp-zip";
import pump from "pump";

const date = new Date();
const dateExport = `${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}_${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;

// @ Task - ZIP
export function zip(cb) {
    pump([ gulp.src(path.ftp.src, { read: true }),
        plumber({
            errorHandler: notify.onError((error) => ({
                title: "ZIP Error",
                message: error.message,
                onLast: true
            }))
        }), // ---
        zipPlugin(`public_${dateExport}.zip`, { buffer: false, compress: true })
            .on("error", function (err) {
                log.error(theme.zip.error, err);
            })
            .on("end", () => {
                log(flags.isProd ? theme.zip.finish_prod : theme.zip.finish_dev);
            }),
        gulp.dest("./")
    ]);
    return Promise.resolve(cb);
};

export async function end(cb) {
    log(flags.isProd ? theme.build.prod : theme.build.dev);
    return Promise.resolve(cb);
};
