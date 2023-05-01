/* @ Import Modules ——————————————————————————— */
import app from "../config/app.js";
import path from "../config/path.js";
import theme from "../config/theme.js";
import ftpVinyl from "vinyl-ftp";
import plumber from "gulp-plumber";
import notify from "gulp-notify-candy";
import gulp from "gulp";
import log from "fancy-log";
import c from "../config/colors.js";
import pump from "pump";
const connect = ftpVinyl.create(app.ftpSettings);

// @ Task - FTP
export function ftp(cb) {
    pump([ gulp.src(path.ftp.src),
        plumber({
            errorHandler: notify.onError((error) => ({
                title: "FTP Error",
                message: error.message,
                onLast: true
            }))
        }), // ---
        connect.newer(app.ftp.path),
        connect.dest(app.ftp.path)
            .on("pipe", () => { log(theme.ftp.start) })
            .on("error", function (err) { log.error(theme.ftp.error, err); this.emit("end") })
            .on("finish", () => log(`${theme.ftp.finish[0]} ${c.underscore(c.yellow(path.root))} ${theme.ftp.finish[1]} ${c.green(app.ftpSettings.host)}`))
    ]);
    return Promise.resolve(cb);
};
