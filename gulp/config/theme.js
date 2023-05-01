/* @ Import Modules ——————————————————————————— */
import path from "./path.js";
import c from "./colors.js";


// @ Styles
const red = c.red;
const green = c.green;
const yellow = c.yellow;
const yellowBold = c.yellowBold;
const blue = c.blue;
const magenta = c.magenta;
const gray = c.black;
const under = c.underscore;


// @ Symbols
const pp = "┌ ";
const bb = "└ ";
const r = c.bold("↻ ");
const v = c.green("✔ ");
const x = c.red("✘ ");
const s = c.greenBold("↻");
const p = c.yellowBold("✎");
const d = c.redBold("⌦");
const n = (`\n`);

export default {
    // Clear
    clear: {
        all: v + yellow(`Директория `) + green(path.root) + yellow(` удалена!`),
        root: v + yellow(`Файлы вне директорий удалены!`),
        html: v + yellow(`Директория`) + green(` ${path.root}/html `) + yellow(`удалена!`),
        css: v + yellow(`Директория`) + green(` ${path.root}/css `) + yellow(`удалена!`),
        js: v + yellow(`Директория`) + green(` ${path.root}/js `) + yellow(`удалена!`),
        img: v + yellow(`Директория`) + green(` ${path.root}/img `) + yellow(`удалена!`),
        font: v + yellow(`Директория`) + green(` ${path.root}/font `) + yellow(`удалена!`),
        ico: v + yellow(`Директория`) + green(` ${path.root}/ico `) + yellow(`удалена!`),
        zip: v + yellow(`Все архивы из главной директории удалены!`)
    },

    // Server
    server: {
        start: yellow("Запуск сервера..."),
        press: "Press " + yellow("CTRL+C") + " to disable server running...",

        // Errors
        error: {
            server: red(`Ошибка запуска сервера` + n),
            server_proxy: x + red(`Ошибка запуска сервера [proxy]` + n)
        }
    },

    root: {
        finish: v + yellow(`Компиляция файлов вне директорий выполнена!`),
        event: {
            changed: `${p}  ${c.black("Изменение:")} `,
            synced: `${s}  ${c.black("Синхронизация:")} `,
            deleted: `${d}  ${c.black("Удаление:")} `
        },
        error: x + red(`Ошибка Root Files` + n)
    },

    // HTML
    html: {
        // dev: bold("✔ " + red("Dev") + " HTML"),
        dev: v + yellow(`Компиляция ${red("HTML")} —`),
        prod: v + yellow(`Компиляция ${green("HTML")} —`),

        // Errors
        error: {
            include: x + red(`Ошибка HTML Include` + n),
            webp: x + red(`Ошибка HTML WEBP` + n),
            typograf: x + red(`Ошибка HTML Typograf` + n)
        }
    },

    // PHP
    php: {
        // dev: bold("✔ " + red("Dev") + " HTML"),
        dev: v + yellow(`Компиляция ${red("PHP")} —`),
        prod: v + yellow(`Компиляция ${green("PHP")} —`),

        // Errors
        error: {
            include: x + red(`Ошибка PHP Include` + n),
            webp: x + red(`Ошибка PHP WEBP` + n),
            typograf: x + red(`Ошибка PHP Typograf` + n)
        }
    },

    // SCSS
    scss: {
        unminify: yellowBold(pp) + yellow(`Компиляция ${red("UnMin")} `) + yellow(`SCSS —`),
        minify: yellowBold(bb) + yellow(`Компиляция ${green("Min  ")} `) + yellow(`SCSS —`),

        smartgrid: {
            end: v + yellow(`Сетка `) + under(yellow(`SmartGrid`)) + yellow(` готова к работе`),
            fallback: x + under(gray(`SmartGrid`)) + gray(` отключен в настройках проекта!`)
        }
    },

    // JS
    js: {
        dev: v + yellow(`Компиляция JS ${red("[" + "DEV" + "]")} —`),
        prod: v + yellow(`Компиляция JS  ${green("[" + "PROD" + "]")} —`),
        webpack: {
            compile_dev: magenta(r) + yellow(`Сборка Webpack ${(red("[" + "DEV" + "]"))}`),
            compile_prod: magenta(r) + yellow(`Сборка Webpack ${(green("[" + "PROD" + "]"))}`)
        },

        // Errors
        error: {
            webpack: x + red(`Ошибка JS Webpack` + n),
            minify: x + red(`Ошибка сжатия JS` + n)
        }
    },

    // IMG
    img: {
        // Style
        webp: r + yellow(`Конвертация в ${green("WEBP")} —`),
        svg: r + yellow(`Обработка ${green("SVG")} —`),
        svg_dev: blue(r) + yellow(`Не сжатые SVG —`),
        svg_prod: blue(r) + yellow(`Сжатые SVG —`),
        dev: blue(r) + yellow(`Не сжатые картинки —`),
        prod: blue(r) + yellow(`Сжатые картинки —`),

        // Text
        start_dev: red(r) + yellow(`Обработка картинок... ${(red("[" + "DEV" + "]"))}`),
        start_prod: red(r) + yellow(`Обработка картинок... ${(green("[" + "PROD" + "]"))}`),
        finish: v + yellow(`Обработка картинок завершена!`),

        // Errors
        error: {
            minify: x + red(`Ошибка в сжатии картинок` + n),
            webp: x + red(`Ошибка в конвертации картинок` + n)
        }
    },

    // SPRITE
    sprite: {
        // Text
        finish: {
            mono: v + yellow(`Компиляция спрайта ${green("[" + "Mono" + "]")}`),
            multi: v + yellow(`Компиляция спрайта ${green("[" + "Multi" + "]")}`)
        },

        // Errors
        error: {
            mono: x + red(`Ошибка SVG Sprite Mono` + n),
            multi: x + red(`Ошибка SVG Sprite Multi` + n)
        }
    },

    // Font
    font: {
        otf2ttf: magenta(r) + yellow(`Конвертация ${green("OTF")} ${yellow(`в`)} ${green("TTF")}...`),
        ttf2woff: blue(r) + yellow(`Конвертация ${green("TTF")} ${yellow(`в`)} ${green("WOFF")}...`),
        ttf2woff2: red(r) + yellow(`Конвертация ${green("TTF")} ${yellow(`в`)} ${green("WOFF2")}...`),
        styleError: x + gray(`Файл`) + yellow(" /scss/_fonts.scss ") + gray(`уже существует.`) + gray(`\n\rДля обновления файла стилей, необходимо его удалить!\n\rОбновить только файл стилей: ${yellow("gulp font:style")} ${gray(`или`)} ${yellow("gulp fs")}`),
        start: r + yellow(`Обработка шрифтов...`),
        finish: v + yellow(`Обработка шрифтов выполнена!`),

        // Errors
        error: {
            otf: x + red(`Ошибка Font OTF` + n),
            ttf2woff: x + red(`Ошибка Font TTF2WOFF` + n),
            ttf2woff2: x + red(`Ошибка Font TTF2WOFF2` + n),
            default: x + red(`Ошибка` + n),
            notFound: x + gray(`Шрифты не найдены` + n)
        }
    },

    // Favicon
    ico: {
        start: magenta(r) + yellow(`Создаем Favicon...`),
        finish: v + green(`Favicon создан успешно!`),
        error: x + red(`Ошибка Favicon` + n)
    },

    // ZIP
    zip: {
        finish_dev: v + green(`Сборка ZIP архива выполнена! ${(red("[" + "DEV" + "]"))}`),
        finish_prod: v + green(`Сборка ZIP архива выполнена! ${(green("[" + "PROD" + "]"))}`),
        error: x + red(`Ошибка сборки ZIP архива` + n)
    },

    // FTP
    ftp: {
        start: magenta(r) + yellow(`Загружаем файлы по FTP...`),
        finish: [ v + green(`Загрузка`), green(`по FTP -`) ],
        error: x + red(`Ошибка FTP загрузки` + n)
    },

    // End
    build: {
        dev: v + green(`Сборка в режиме ${under("Development")} выполнена!`),
        prod: v + green(`Сборка в режиме ${under("Production")} выполнена!`)
    },

    unpackConfig: {
        project: {
            fileExist: x + yellow(`${under("project.js")} уже сущствует!`),
            fileCreated: v + green(`${under("project.js")} успешно создан!`)
        },
        projectFTP: {
            fileExist: x + yellow(`${under("projectFTP.js")} уже сущствует!`),
            fileCreated: v + green(`${under("projectFTP.js")} успешно создан!`)
        },
        projectSmartGrid: {
            fileExist: x + yellow(`${under("projectSmartGrid.js")} уже сущствует!`),
            fileCreated: v + green(`${under("projectSmartGrid.js")} успешно создан!`)
        }
    }

};
