/* @ Import Configs ——————————————————————————— */
import path from "../config/path.js";
import log from "fancy-log";

process.argv.includes("watch") | process.argv.includes("watcher") | process.argv.includes("w") ? log("\x1b[35m" + "↻" + " \x1b[33mНаблюдатель запущен... \x1b[0m") : null;

// Watcher
export function watcher() {
    require("events").EventEmitter.defaultMaxListeners = 0;
    const { watch } = require("gulp");
    const { reload: browserSyncReload } = require("browser-sync");

    function html() { return import("./html.js").then(({ html }) => html()) };
    function php() { return import("./php.js").then(({ php }) => php()) };
    function scss() { return import("./scss.js").then(({ scss }) => scss()) };
    function smartGridBuild() { return import("./smartgrid.js").then(({ smartGridBuild }) => smartGridBuild()) };
    function js() { return import("./js.js").then(({ js }) => js()) };
    function img() { return import("./img.js").then(({ img }) => img()) };
    function spriteMulti() { return import("./sprite.js").then(({ spriteMulti }) => spriteMulti()) };
    function spriteMono() { return import("./sprite.js").then(({ spriteMono }) => spriteMono()) };
    function font() { return import("./font.js").then(({ font }) => font()) };
    function rootFiles() { return import("./root.js").then(({ rootFiles }) => rootFiles()) };

    watch(path.html.watch, { ignorePermissionErrors: true }, html).on("all", browserSyncReload);
    watch(path.html.data, { ignorePermissionErrors: true }, html).on("all", browserSyncReload);
    watch(path.php.watch, { ignorePermissionErrors: true }, php).on("all", browserSyncReload);
    watch(path.scss.watch, { ignorePermissionErrors: true }, scss).on("all", browserSyncReload);
    watch(path.smartgrid, { ignorePermissionErrors: true }, smartGridBuild);
    watch(path.js.watch, { ignorePermissionErrors: true }, js).on("all", browserSyncReload);
    watch(path.img.watch, { ignorePermissionErrors: true }, img).on("all", browserSyncReload);
    watch(path.font.watch, { ignorePermissionErrors: true }, font).on("all", browserSyncReload);
    watch(path.sprite.watch.mono, { ignorePermissionErrors: true }, spriteMono).on("all", browserSyncReload);
    watch(path.sprite.watch.multi, { ignorePermissionErrors: true }, spriteMulti).on("all", browserSyncReload);
    watch(path.rootFiles.watch, { ignorePermissionErrors: true }, rootFiles).on("all", browserSyncReload);
};
