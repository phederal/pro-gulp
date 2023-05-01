import fs from "fs";
import path from "./path.js";
import flags from "./flags.js";

if (!fs.existsSync("./project.js") === true) {
    const { initJS, fileProject } = require("./unpack.config.js");
    initJS("./project.js", fileProject);
};

if (!fs.existsSync("./projectFTP.js") === true) {
    const { initJS, fileProjectFTP } = require("./unpack.config.js");
    initJS("./projectFTP.js", fileProjectFTP);
};

if (fs.existsSync("./projectSmartGrid.js") === true) {
    const { project } = require("../../project.js");
    if (project.smartgrid === false) {
        fs.rm(`${path.src}/sass/vendors/smart-grid.scss`, { force: true }, err => { if (err) throw err; });
    } else {
        if (!fs.existsSync(`${path.src}/sass/vendors/smart-grid.scss`) === true) {
            const { smartGridBuild } = require("../tasks/smartgrid.js");
            smartGridBuild();
        };
    };
} else {
    const { project } = require("../../project.js");
    if (project.smartgrid === false) {
        fs.rm(`${path.src}/sass/vendors/smart-grid.scss`, { force: true }, err => { if (err) throw err; });
    } else {
        const { initJS, fileSmartGrid } = require("./unpack.config.js");
        initJS("./projectSmartGrid.js", fileSmartGrid);
    };
};

const { project } = require("../../project.js");
const { projectFTP } = require("../../projectFTP.js");

const isProd = flags.isProd;
const isDev = flags.isDev;
const isFavicon = flags.isFavicon;

export default {
    isProd,
    isDev,
    isFavicon,

    // Server
    server: {
        ui: project.ui !== undefined ? project.ui : false,
        open: project.openBrowser !== undefined ? project.openBrowser : false,
        logConnections: project.logConnections !== undefined ? project.logConnections : false,
        tunnel: project.tunnel !== undefined ? project.tunnel : false,
        online: project.online !== undefined ? project.online : false,
        onlineHost: project.onlineHost !== undefined ? project.onlineHost : false,
        proxy: project.proxy !== undefined ? project.proxy : false,
        proxyHost: project.proxyDomain !== undefined ? project.proxyDomain : "http://localhost",
        proxyDomain: project.proxyHost !== undefined ? project.proxyHost : "localhost",
        port: project.port !== undefined ? project.port : 3000,
        portUI: project.portUI !== undefined ? project.portUI : 3001,
        ghostMode: project.scrollSync !== undefined ?
            {
                clicks: project.scrollSync, forms: false, scroll: project.scrollSync, location: false
            } :
            false,
        serverExtensions: [ "html", "htm" ] // Files ext for using with BrowserSync
    },

    // HTML
    htmlmin: {
        html5: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        collapseBooleanAttributes: true,
        conservativeCollapse: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeEmptyScriptTags: true,
        sortAttributes: true,
        sortClassName: true,
        removeComments: true,
        quoteCharacter: "\"",
        // eslint-disable-next-line no-useless-escape
        ignoreCustomFragments: [ /(<[%|\?])([\s\S]*?)(([%|\?]>)|$(?![\r\n]))/ ]
    },

    // HTML WEBP
    htmlwebp: {
        // imgFolder: './dist', // required for sorting by size
        extensions: [ ".jpg", ".jpeg", ".png" ],
        ignoreClassname: "pignore",
        ignoreAttribute: "pignore",
        pictureClassAttribute: "pclass",
        logger: false,
        sortBySize: false,
        ignoreScripts: true,
        ignoreComments: true,
        filterUnexistedImages: false,
        sourceExtensions: [
            // {
            //     extension: 'avif',
            //     mimetype: 'image/avif',
            // },
            {
                extension: "webp",
                mimetype: "image/webp"
            }
        ]
    },

    // htmlwebp: {
    //     extensions: [ "jpg", "jpeg", "png", "gif" ],
    //     retina: {
    //         1: "",
    //         2: "@2x",
    //         3: "@3x",
    //         4: "@4x"
    //     },
    //     checkExists: true,
    //     publicPath: path.root
    // },

    // Typograf
    typograf: {
        locale: [ "ru", "en-US" ],

        // Type of HTML entities: 'digit' - &#160;, 'name' - &nbsp;, 'default' - UTF-8
        htmlEntity: { type: "name" },

        // rules: https://github.com/typograf/typograf/blob/dev/docs/RULES.ru.md
        disableRule: [ "ru/optalign/*" ],
        enableRule: [ "ru/money/ruble", "common/other/repeatWord", "common/nbsp/afterNumber", "common/html/e-mail" ],
        safeTags: [
            // Теги которые не затрагивает типограф
            [ "<\\?php", "\\?>" ],
            [ "<\\? php", "\\?>" ],
            [ "<\\?", "\\?>" ],
            [ "<pre>", "</pre>" ],
            [ "<code>", "</code>" ],
            [ "<template>", "</template>" ],
            [ "\\{\\{", "\\}\\}" ],
            [ "\\[\\[", "\\]\\]" ]
        ],

        // Own rules
        rules: [
            {
                name: "common/other/typographicalEmoticon",
                handler(text, settings) {
                    return text.replace(/:-\)/, ":—)");
                }
            },
            {
                name: "common/other/trimLeft",
                handler(text, settings) {
                    return text.trimLeft();
                }
            },
            {
                name: "common/other/typographicalCustom",
                handler(text, settings) {
                    return text.replace("???", "?");
                }
            },
            {
                name: "common/other/typographicalCustom2",
                handler(text, settings) {
                    return text.replace("!!!", "!");
                }
            }
        ]
    },

    // Webpack
    // webpack,

    // ImageMin
    imagemin: {
        silent: true,
        verbose: true,
        progressive: project.jpgProgressive !== undefined ? project.jpgProgressive : true,
        pngQuality: project.pngQuality !== undefined ? project.pngQuality : [ 0.8, 0.9 ],
        imgQuality: project.imgQuality !== undefined ? project.imgQuality : 90,
        svgRemoveViewBox: project.svgRemoveViewBox !== undefined ? project.svgRemoveViewBox : true,
        svgCleanupIDs: project.svgCleanupIDs !== undefined ? project.svgCleanupIDs : false
    },

    // Sprite SVG
    sprite: {
        // For M
        mono: {
            mode: {
                symbol: {
                    sprite: "../mono.svg"
                }
            },

            // Logs
            log: "debug" // 'info', 'verbose' or 'debug'
        },

        // For Multi
        multi: {
            mode: {
                symbol: {
                    sprite: "../multi.svg"
                }
            },

            // Logs
            log: "debug" // 'info', 'verbose' or 'debug'
        }
    },

    // Шрифты из папки Font
    fonter: {
        formats: [ "ttf" ]
    },

    // Шрифты из папки Font ['.*']
    ttf2woff2: {
        // Копируем ttf тоже
        clone: true
    },

    // Фавиконы
    favicon: {
        appName: project.title !== undefined ? project.title : null,
        appShortName: project.titleShort !== undefined ? project.titleShort : null,
        appDescription: project.description !== undefined ? project.description : null,
        developerName: null,
        developerURL: null,
        background: "#fff",
        path: "/ico/",
        display: "standalone",
        orientation: "any",
        scope: "/",
        start_url: "/?homescreen=1",
        version: 1.0,
        logging: false,
        html: "index.html",
        pipeHTML: true,
        replace: true,
        icons: {
            android: true, // Create Android homescreen icon. `boolean` or `{ offset, background }` or an array of sources
            appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background }` or an array of sources
            appleStartup: false, // Create Apple startup images. `boolean` or `{ offset, background }` or an array of sources
            favicons: true, // Create regular favicons. `boolean` or `{ offset, background }` or an array of sources
            windows: true, // Create Windows 8 tile icons. `boolean` or `{ offset, background }` or an array of sources
            yandex: true, // Create Yandex browser icon. `boolean` or `{ offset, background }` or an array of sources
            firefox: true,
            online: true,
            coast: true
        }
    },

    // FTP
    ftp: {
        path: projectFTP.path !== undefined ? projectFTP.path : "www/domain"
    },

    ftpSettings: {
        host: projectFTP.host !== undefined ? projectFTP.host : "localhost",
        user: projectFTP.user !== undefined ? projectFTP.user : "user",
        pass: projectFTP.pass !== undefined ? projectFTP.pass : "pass",
        parallel: projectFTP.parallel !== undefined ? projectFTP.parallel : 10
    },

    scss: {
        cssimport: {
            includePaths: [ "./node_modules" ],
            matchPattern: "*.{css,scss,sass}"
        },
        webpcss: {
            webpClass: "webp",
            noWebpClass: "no-webp",
            addNoJs: false
        },
        autoprefixer: {
            add: true,
            cascade: false,
            supports: true,
            flexbox: "no-2009",
            grid: "autoplace",
            remove: true,
            ignoreUnknownVersions: false
        }
    }
};
