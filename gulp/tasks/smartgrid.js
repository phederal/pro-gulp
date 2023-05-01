/* @ Import Tasks ————————————————————————————— */
import path from "../config/path.js";
import theme from "../config/theme.js";
import log from "fancy-log";
import fs from "fs";
import importFresh from "import-fresh";
import smartGrid from "smart-grid-sass-use";


// @ Task - Smart Grid Build
export function smartGridBuild(cb) {
    if (fs.existsSync("./projectSmartGrid.js") === true) {
        const { projectSmartGrid } = importFresh(`../.` + path.smartgrid);
        smartGrid(path.scss.vendors, projectSmartGrid),
        log(theme.scss.smartgrid.end);
    } else {
        log(theme.scss.smartgrid.fallback);
    };
    return Promise.resolve(cb);
};
