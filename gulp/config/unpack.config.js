import fs from "fs";
import log from "fancy-log";
import theme from "./theme.js";


// Data for project.js
export const fileProject =
`export const project = {
    // Project Info
    title: "ProjectName",
    titleShort: "ProjectName",
    description: "Desc",

    // Settings
    online: false, // false | online mode for BrowserSync
    onlineHost: "192.168.1.178", // false | use local ip or real ip
    tunnel: true, // true | Local Tunnel domain or true (required online: true)
    proxy: false, // false | loading server in proxy mode
    proxyHost: "192.168.1.178", // false | use local ip or real ip
    proxyDomain: "example.com", // domain.com | url for proxy
    openBrowser: false, // local / external | open browser after start server
    logConnections: false, // false | enable log connections
    scrollSync: true, // false | sync scroll for BrowserSync
    ui: false, // false | Enable UI for BrowserSync
    port: 3000, // 3000 | Port for BrowserSync
    portUI: 3001, // 3001 | Port for UI BrowserSync

    // SmartGrid
    smartgrid: true, // true | Enable SmartGrid generation

    // Images Compress
    jpgProgressive: true, // true | Progressive Imagemin
    imgQuality: 20, // 90 | from 0 to 100
    pngQuality: [ 0.8, 0.9 ], // [0.8, 0.9] | from 80% to 90%
    svgRemoveViewBox: true, // false | Remove ViewBox in SVG
    svgCleanupIDs: true // false | Remove ID in SVG
};
`;

// Data for projectFTP.js
export const fileProjectFTP =
`export const projectFTP = {
    path: "www/1",
    host: "0.0.0.0",
    user: "user",
    pass: "pass",
    parallel: 5
};
`;

// Data for projectSmartGrid.js
export const fileSmartGrid =
`export const projectSmartGrid = {
    outputStyle: "scss", /* scss || sass */
    columns: 12, /* number of grid columns */
    offset: "30px", /* gutter width px || % || rem */
    mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: "1200px", /* max-width оn very large screen */
        fields: "15px" /* side fields */
    },
    breakPoints: {
        xl: {
            width: "1100px", /* -> @media (max-width: 1100px) */
            offset: "30px",
            fields: "15px"
        },
        lg: {
            width: "992px",
            offset: "30px",
            fields: "15px"
        },
        md: {
            width: "767px",
            offset: "30px",
            fields: "15px"
        },
        sm: {
            width: "576px",
            offset: "30px",
            fields: "15px"
        },
        xs: {
            width: "480px",
            offset: "30px",
            fields: "15px"
        }

        // some_name: {
        //    width: 'Npx',
        //    fields: 'N(px|%|rem)',
        //    offset: 'N(px|%|rem)'
        // }
    },
    mixinNames: {
        container: "wrapper",
        row: "row",
        rowFloat: "row-float",
        rowInlineBlock: "row-ib",
        rowOffsets: "row-offsets",
        size: "size",
        column: "col",
        columnFloat: "col-float",
        columnInlineBlock: "col-ib",
        columnPadding: "col-padding",
        columnOffsets: "col-offsets",
        shift: "shift",
        from: "from",
        to: "to",
        fromTo: "from-to",
        reset: "reset",
        clearfix: "clearfix",
        debug: "debug",
        uRowFlex: "u-row",
        uColumn: "u-col",
        uSize: "u-size"
    }
};
`;

// Функция создание файлов конфига
export function initJS(PATH, TEXT) {
    fs.writeFileSync(`${PATH}`, `${TEXT}`, function (err, stat) {
        if (err == null) {
        // Выводим только если задача запустилась через "npm run config" иначе ничего не выводим
            return process.argv.includes("only") ? log(theme.unpackConfig.project.fileExist) : null;
        } else if (err.code === "ENOENT") {
        // file does not exist
            fs.writeFileSync(`${PATH}`, `${TEXT}`, {
                encoding: "utf8", flag: "w", mode: 0o666
            }, (err) => {
                if (err) { console.log(err) } else {
                // Выводим только если задача запустилась через "npm run config" иначе ничего не выводим
                    return process.argv.includes("only") ? log(theme.unpackConfig.project.fileCreated) : null;

                    // console.log(fs.readFileSync(`${PATH}`, "utf8")); // Читаем файл и выводим содержимое в консоль
                }
            });
        } else {
            log("Ошибка: ", err.code);
        }
    });
};


// Create project.js [only for nodeJS]
export function initProject() {
    fs.stat("./project.js", function (err, stat) {
        if (err == null) {
        // Выводим только если задача запустилась через "npm run config" иначе ничего не выводим
            return process.argv.includes("only") ? log(theme.unpackConfig.project.fileExist) : null;
        } else if (err.code === "ENOENT") {
        // file does not exist
            fs.writeFileSync("project.js", fileProject, {
                encoding: "utf8", flag: "w", mode: 0o666
            }, (err) => {
                if (err) { console.log(err) } else {
                // Выводим только если задача запустилась через "npm run config" иначе ничего не выводим
                    // return process.argv.includes("only") ? log(theme.unpackConfig.project.fileCreated) : null;
                    return log(theme.unpackConfig.project.fileCreated);

                // log(fs.readFileSync("tester.js", "utf8")); // Читаем файл и выводим содержимое в консоль
                }
            });
        } else {
            log("Ошибка: ", err.code);
        }
    });
}; process.argv.includes("only") ? initProject() : null;

// Create projectFTP.js [only for nodeJS]
export function initProjectFTP() {
    fs.stat("./projectFTP.js", function (err, stat) {
        if (err == null) {
        // Выводим только если задача запустилась через "npm run config" иначе ничего не выводим
            return process.argv.includes("only") ? log(theme.unpackConfig.projectFTP.fileExist) : null;
        } else if (err.code === "ENOENT") {
        // file does not exist
            fs.writeFileSync("projectFTP.js", fileProjectFTP, {
                encoding: "utf8", flag: "w", mode: 0o666
            }, (err) => {
                if (err) { console.log(err) } else {
                // Выводим только если задача запустилась через "npm run config" иначе ничего не выводим
                    return process.argv.includes("only") ? log(theme.unpackConfig.projectFTP.fileCreated) : null;

                // log(fs.readFileSync("tester.js", "utf8")); // Читаем файл и выводим содержимое в консоль
                }
            });
        } else {
            log("Ошибка: ", err.code);
        }
    });
}; process.argv.includes("only") ? initProjectFTP() : null;

// Create projectFTP.js [only for nodeJS]
export function initProjectSmartGrid() {
    fs.stat("./projectSmartGrid.js", function (err, stat) {
        if (err == null) {
        // Выводим только если задача запустилась через "npm run config" иначе ничего не выводим
            return process.argv.includes("only") ? log(theme.unpackConfig.projectSmartGrid.fileExist) : null;
        } else if (err.code === "ENOENT") {
        // file does not exist
            fs.writeFileSync("projectSmartGrid.js", fileSmartGrid, {
                encoding: "utf8", flag: "w", mode: 0o666
            }, (err) => {
                if (err) { console.log(err) } else {
                // Выводим только если задача запустилась через "npm run config" иначе ничего не выводим
                    return process.argv.includes("only") ? log(theme.unpackConfig.projectSmartGrid.fileCreated) : null;

                // log(fs.readFileSync("tester.js", "utf8")); // Читаем файл и выводим содержимое в консоль
                }
            });
        } else {
            log("Ошибка: ", err.code);
        }
    });
}; process.argv.includes("only") ? initProjectSmartGrid() : null;
