/* @ Import Modules ——————————————————————————— */
import log from "fancy-log";
import path from "../config/path.js";
import theme from "../config/theme.js";
import { del } from "../config/functions.js";


// @ Task - Clear / Clean
// Удаление директории ./public
export function clear() { return del(path.root, log(theme.clear.all)) };

// Удаление директории ./public
export function clearRoot() { return del(path.rootFiles.clear1, log(theme.clear.root)) };

// Удаление директории ./public/html
export function clearHtml() { return del(path.html.clear, log(theme.clear.html)) };

// Удаление директории ./public/css
export function clearCss() { return del(path.root + "/css", log(theme.clear.css)) };

// Удаление директории ./public/js
export function clearJs() { return del(path.root + "/js", log(theme.clear.js)) };

// Удаление директории ./public/img
export function clearImg() { return del(path.root + "/img", log(theme.clear.img)) };

// Удаление директории ./public/font
export function clearFont() { return del(path.root + "/font", log(theme.clear.font)) };

// Удаление директории ./public/favicon
export function clearIco() { return del(path.root + "/ico", log(theme.clear.ico)) };

// Удаление zip архивов
export function clearZip() { return del(path.zip.del, log(theme.clear.zip)) };
