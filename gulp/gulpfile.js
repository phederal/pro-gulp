/* @ Import Modules ——————————————————————————— */
import { task, parallel, series } from "gulp";
import flags from "./config/flags.js";

/* @ Import Tasks ————————————————————————————— */
async function test() { return await import("./tasks/test.js").then(({ test }) => test()) };
async function clear() { return await import("./tasks/clear.js").then(({ clear }) => clear()) };
async function clearRoot() { return await import("./tasks/clear.js").then(({ clearRoot }) => clearRoot()) };
async function clearHtml() { return await import("./tasks/clear.js").then(({ clearHtml }) => clearHtml()) };
async function clearCss() { return await import("./tasks/clear.js").then(({ clearCss }) => clearCss()) };
async function clearJs() { return await import("./tasks/clear.js").then(({ clearJs }) => clearJs()) };
async function clearImg() { return await import("./tasks/clear.js").then(({ clearImg }) => clearImg()) };
async function clearFont() { return await import("./tasks/clear.js").then(({ clearFont }) => clearFont()) };
async function clearIco() { return await import("./tasks/clear.js").then(({ clearIco }) => clearIco()) };
async function clearZip() { return await import("./tasks/clear.js").then(({ clearZip }) => clearZip()) };
async function html() { return await import("./tasks/html.js").then(({ html }) => html()) };
async function htmlBackend() { return await import("./tasks/html.js").then(({ htmlBackend }) => htmlBackend()) };
async function php() { return await import("./tasks/php.js").then(({ php }) => php()) };
async function scss() { return await import("./tasks/scss.js").then(({ scss }) => scss()) };
async function smartGridBuild() { return await import("./tasks/smartgrid.js").then(({ smartGridBuild }) => smartGridBuild()) };
async function js() { return await import("./tasks/js.js").then(({ js }) => js()) };
async function help() { return await import("./tasks/help.js").then(({ help }) => help()) };
async function img() { return await import("./tasks/img.js").then(({ img }) => img()) };
async function server() { return await import("./tasks/server.js").then(({ server }) => server()) };
async function serverProxy() { return await import("./tasks/server.js").then(({ serverProxy }) => serverProxy()) };
async function sprite() { return await import("./tasks/sprite.js").then(({ sprite }) => sprite()) };
async function font() { return await import("./tasks/font.js").then(({ font }) => font()) };
async function fontStyle() { return await import("./tasks/font.js").then(({ fontStyle }) => fontStyle()) };
async function zip() { return await import("./tasks/zip.js").then(({ zip }) => zip()) };
async function end() { return await import("./tasks/zip.js").then(({ end }) => end()) };
async function ftp() { return await import("./tasks/ftp.js").then(({ ftp }) => ftp()) };
async function favicon() { return await import("./tasks/favicon.js").then(({ favicon }) => favicon()) };
async function rootFiles() { return await import("./tasks/root.js").then(({ rootFiles }) => rootFiles()) };
async function watcher() { return await import("./tasks/watcher.js").then(({ watcher }) => watcher()) };

// Build
export const build = series(
    clear, rootFiles,
    parallel(smartGridBuild, flags.isFavicon ? [ font, favicon ] : font),
    parallel(img, sprite, html, php),
    parallel(scss, js),
    flags.isProd ? [ zip, end ] : end
);

// Build Backend
export const backend = series(
    clear, rootFiles,
    parallel(smartGridBuild, flags.isFavicon ? [ font, favicon ] : font),
    parallel(img, sprite, htmlBackend, php),
    parallel(scss, js),
    zip, end
);

// Build Dev
export const dev = series(
    build,
    parallel(watcher, flags.isProxy ? serverProxy : server)
);

// /* @ Export Tasks ————————————————————————————— */
task("test", test);
task("help", help), task("info", help), task("tasks", help), task("?", help);
task("clear", clear), task("clear:root", clearRoot), task("clear:html", clearHtml), task("clear:css", clearCss), task("clear:js", clearJs), task("clear:img", clearImg), task("clear:font", clearFont), task("clear:ico", clearIco), task("clear:zip", clearZip);
task("clean", clear), task("clean:root", clearRoot), task("clean:html", clearHtml), task("clean:css", clearCss), task("clean:js", clearJs), task("clean:img", clearImg), task("clean:font", clearFont), task("clean:ico", clearIco), task("clean:zip", clearZip);
task("del", clear), task("del:html", clearHtml), task("del:css", clearCss), task("del:js", clearJs), task("del:img", clearImg), task("del:font", clearFont), task("del:ico", clearIco), task("del:zip", clearZip);
task("root", rootFiles), task("r", rootFiles);
task("html", html), task("h", html);
task("php", php), task("p", php);
task("grid", smartGridBuild), task("smartgrid", smartGridBuild), task("sg", smartGridBuild);
task("scss", scss), task("sass", scss), task("css", scss), task("s", scss), task("c", scss);
task("js", js), task("j", js);
task("img", img), task("i", img);
task("sprite", sprite), task("sprites", sprite), task("sp", sprite);
task("favicon", favicon), task("favicons", favicon), task("fav", favicon), task("ico", favicon);
task("font", font), task("fonts", font), task("f", font);
task("fontstyle", fontStyle), task("font:style", fontStyle), task("fs", fontStyle), task("f:s", fontStyle);
task("watch", watcher), task("watcher", watcher), task("w", watcher);
task("server", parallel(watcher, flags.isProxy ? serverProxy : server)), task("$", parallel(watcher, flags.isProxy ? serverProxy : server)), task("S", parallel(watcher, flags.isProxy ? serverProxy : server));
task("proxy", parallel(watcher, flags.isProxy ? serverProxy : server)), task("P", parallel(watcher, flags.isProxy ? serverProxy : server));
task("zip", zip), task("z", zip);
task("ftp", ftp), task("F", ftp), task("deploy", ftp);
task("build", build), task("b", build);
task("backend", backend), task("back", backend);
task("default", flags.isProd ? build : dev);
