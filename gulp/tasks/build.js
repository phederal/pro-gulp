import { series, parallel, watch, task } from "gulp";
import { reload as browserSyncReload } from "browser-sync";
import path from "../config/path.js";
import flags from "../config/flags.js";
import { clear } from "./clear.js";
import { rootFiles } from "./root.js";
import { smartGridBuild } from "./smartgrid.js";
import { font } from "./font.js";
import { favicon } from "./favicon.js";
import { img } from "./img.js";
import { sprite, spriteMono, spriteMulti } from "./sprite.js";
import { html, htmlBackend } from "./html.js";
import { php } from "./php.js";
import { scss } from "./scss.js";
import { js } from "./js.js";
import { zip, end } from "./zip.js";
import { server, serverProxy } from "./server.js";

const watcher = () => {
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
