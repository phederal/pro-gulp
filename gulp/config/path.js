import { buildFolder } from "../../package.json";

// @ Переменные
// import * as nodePath from "path";
// const rootFolder = nodePath.basename(nodePath.resolve()); // Название папки проекта
const pathSrc = "./src"; // Исходные файлы проект
const pathDest = buildFolder !== undefined ? buildFolder : "./public"; // Собранный проект

// @ Экспорт
export default {
    src: pathSrc,
    root: pathDest,
    project: "./project.js",
    smartgrid: "./projectSmartGrid.js",

    // Пути для ROOT
    rootFiles: {
        // Watch => root.js > rootFiles.fileSync.ignore[...]
        src: pathSrc,
        // eslint-disable-next-line max-len
        watch: [ `${pathSrc}/*`, `${pathSrc}/**/*`, `!${pathSrc}/{data,font,html,js,ico,img,php,sass}`, `!${pathSrc}/*.{html,php,log,idea,sublime-*}`, `!${pathSrc}/.{gitkeep,DS_Store,Saved}`, `!${pathSrc}/{Thumbs.db,__MACOSX,_arc}` ],
        clear: [ `${pathDest}/*`, `${pathDest}/**/*`, `!${pathDest}/{data,font,html,js,ico,img,php,css}`, `!${pathDest}/*.{html,php}` ],
        dest: pathDest
    },

    // Пути для HTML
    html: {
        // Путь ./src + Маска исходных файлов
        src: [ `${pathSrc}/html/*.{html,php}`, `!${pathSrc}/html/_*.{html,php}` ],

        // Путь ./src + Маска для отслеживания
        watch: pathSrc + "/html/**/*.{html,php}",

        // Путь ./src + Маска для отслеживания
        data: pathSrc + "/data/**/*.json",

        // Путь для удаления всех HTML
        // Пишем в формате модуля (node-glob)
        clear: pathDest + "/**/*.@(html|php)",

        // Путь для конечных файлов ./public
        dest: pathDest

    },

    // Пути для PHP
    php: {
        // Путь ./src + Маска исходных файлов
        src: [ `${pathSrc}/php/**/*.php`, `!${pathSrc}/php/**/_*.php` ],

        // Путь ./src + Маска для отслеживания
        watch: pathSrc + "/php/**/*.php",

        // Путь для конечных файлов ./public
        dest: pathDest
    },

    // Пути для SCSS
    scss: {
        // Путь ./src + Маска исходных файлов
        src: [ `${pathSrc}/sass/*.{sass,scss}`, `!${pathSrc}/sass/_*.{sass,scss}` ],

        // Путь ./src + JS
        rootFiles: pathSrc + "/sass",

        // Путь ./src + Маска для отслеживания
        watch: pathSrc + "/sass/**/*.{sass,scss,css}",

        // Путь ./src + папка вендерных файлов
        vendors: pathSrc + "/sass/vendors",

        // Путь для конечных файлов ./public
        dest: pathDest + "/css"
    },

    // Пути для JS
    js: {
        // Путь ./src + Маска исходных файлов
        src: [ `${pathSrc}/js/app.js`, `${pathSrc}/js/%webp.js`, `${pathSrc}/js/+*.js`, `!${pathSrc}/js/_*.js` ],

        // Путь ./src + JS
        rootFiles: pathSrc + "/js",

        // Путь ./src + Маска для отслеживания
        watch: pathSrc + "/js/**/*.js",

        // Путь для конечных файлов ./public
        dest: pathDest + "/js"
    },

    // Пути для IMG
    img: {
        // Путь ./src + Маска исходных файлов
        src: [ `${pathSrc}/img/**/*.{png,jpg,jpeg,gif}`, `!${pathSrc}/img/sprite-{mono,multi}.svg/**` ],
        svg: [ `${pathSrc}/img/**/*.svg`, `!${pathSrc}/img/sprite-{mono,multi}.svg/**` ],

        // Путь ./src + Маска для отслеживания
        watch: [ `${pathSrc}/img/**/*.{svg,png,jpg,jpeg,gif}`, `!${pathSrc}/img/sprite-{mono,multi}.svg/**/*` ],

        // Путь для конечных файлов ./public
        dest: pathDest + "/img"
    },

    // Пути для SPRITE
    sprite: {
        del: pathDest + "/img/sprite",
        src: {
            mono: [ `${pathSrc}/img/sprite-mono.svg/**/*.svg`, `!favicon.*` ],
            multi: [ `${pathSrc}/img/sprite-multi.svg/**/*.svg`, `!favicon.*` ]
        },
        watch: {
            mono: pathSrc + "/img/sprite-mono.svg/**/*.svg",
            multi: pathSrc + "/img/sprite-multi.svg/**/*.svg"
        },
        dest: pathDest + "/img/sprite"
    },

    // Пути для FONTER
    font: {
        // Путь ./src + Маска исходных файлов
        // src: pathSrc + "/font/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}",
        src: {
            dev: pathSrc + "/font",
            otf: pathSrc + "/font/*.otf",
            ttf: pathSrc + "/font/*.ttf",

            // FontStyle
            scss: pathSrc + `/sass/base/_fonts.scss`
        },

        // Путь ./src + Маска для отслеживания
        watch: pathSrc + "/font/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}",

        // Путь для конечных файлов ./public
        dest: pathDest + "/font"
    },

    // Пути для FAVICON
    favicon: {
        // Путь ./src + Маска исходных файлов
        src: pathSrc + "/ico/*.{svg,png,ico}",

        // Путь ./src + Маска для отслеживания
        watch: pathSrc + "/ico/**/*.{svg,png,ico}",

        // Путь для конечных файлов ./public
        dest: pathDest + "/ico"
    },

    // Пути для FTP
    ftp: {
        src: [ `${pathDest}/**/*.*`, `!${pathDest}/**/*.map` ]
    },

    // Пути для ZIP
    zip: {
        del: "./*.zip",
        src: [ `${pathDest}/**/*.*`, `!.gitkeep` ],
        dest: "./"
    }
};
