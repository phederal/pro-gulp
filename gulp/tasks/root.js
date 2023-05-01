/* @ Import Modules ——————————————————————————— */
import path from "../config/path.js";
import theme from "../config/theme.js";
import gulp from "gulp";
import log from "fancy-log";
import fileSync from "gulp-file-sync";
import { readdirSync } from "fs";

// Get folder names from /php
const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

// @ Task - ROOT
export function rootFiles(cb) {
    // Get folder names every time you start task
    const phpCheckFolderNames = getDirectories(path.rootFiles.src + "/php");

    gulp.on("error", function (err) {
        log.error("Root Files Error", err);
        this.emit("end");
    });

    fileSync(`${path.rootFiles.src}`, `${path.root}`, {
        recursive: true,
        ignore: [
            /^.*\.html$/i,
            /^.*\.php$/i,
            /^.*\.log$/i,
            /^.*\.sublime-.*$/i,
            /^.*\.idea$/i,
            /^.*\.scss$/i,
            /^.*\.sass$/i,
            "data",
            "font",
            "html",
            "ico",
            "js",
            "img",
            "php",
            "css",
            "sass",
            "scss",
            ".gitkeep",
            ".DS_Store",
            "__MACOSX",
            "_arc",
            ".Saved",
            "Thumbs.db",
            ...phpCheckFolderNames
        ],
        addFileCallback: function (fullPathSrc, fullPathDest) {
            log(theme.root.event.synced + fullPathDest);
        },
        deleteFileCallback: function (fullPathSrc, fullPathDest) {
            log(theme.root.event.deleted + fullPathDest);
        },
        updateFileCallback: function (fullPathSrc, fullPathDest) {
            log(theme.root.event.changed + fullPathDest);
        }
    });
    log(theme.root.finish);
    return Promise.resolve(cb);
};
