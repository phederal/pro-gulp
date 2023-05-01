/* @ Import Modules ——————————————————————————— */
import gulp from "gulp";
import log from "fancy-log";
import c from "../config/colors.js";

// @ Task Tester
export function test(cb) {
    (
        console.log("—————————————————————————————————\n"),
        gulp.on("error", function (err) {
            log.error("TestTask Error", err);
            this.emit("end");
        }), // ----------------------

        console.log(`${c.red("I")} love ${c.green("Italy")}`),
        console.log(`${c.blue("I")} love ${c.white("Italy")}`),
        console.log(`${c.cyan("I")} love ${c.yellow("Italy")}`),
        console.log(`${c.magenta("I")} love ${c.black("Italy")}`),

        // ----------------------
        console.log("\n—————————————————————————————————")
    );
    return Promise.resolve(cb);
};
