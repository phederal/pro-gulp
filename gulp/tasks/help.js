/* eslint object-property-newline: ["off", { "allowAllPropertiesOnSameLine": true }] */
/* @ Import Modules ——————————————————————————— */
import Tables from "cli-table3";
import path from "../config/path.js";
import c from "../config/colors";


/* @ Styles ——————————————————————————————————— */
const title = c.magenta;
const cmd = c.red;
const alias = c.underscore;
const under = c.underscore;
const lang = c.yellow;
const black = c.black;
const green = c.green;


/* @ Vars ————————————————————————————————————— */
const vv = " ";


/* @ Tables ——————————————————————————————————— */
const table = new Tables({
    head: [],
    chars: {
        "top": "─", "top-mid": "─", "top-left": "┌", "top-right": "┐",
        "bottom": "─", "bottom-mid": "─", "bottom-left": "└", "bottom-right": "┘",
        "left": "│", "left-mid": "", "mid": "", "mid-mid": "",
        "right": "│", "right-mid": "", "middle": " "
    },
    style: {
        "padding-left": 1,
        "padding-right": 1,
        "compact": false,
        "head": [],
        "border": [ "red" ]
    },
    colWidths: [ 17, 13, 30 ],
    wordWrap: false,
    wrapOnWordBoundary: true
});


const titleTop = {
    "top": "─", "top-mid": "┬", "top-left": "┌", "top-right": "┐",
    "bottom": "5", "bottom-mid": "6", "bottom-left": "7", "bottom-right": "8",
    "left": "│", "left-mid": "├", "mid": "─", "mid-mid": "┴",
    "right": "│", "right-mid": "┤", "middle": "│"
};


const titleTopBottom = {
    "top": "─", "top-mid": "┬", "top-left": "┌", "top-right": "┐",
    "bottom": "5", "bottom-mid": "6", "bottom-left": "7", "bottom-right": "8",
    "left": "│", "left-mid": "├", "mid": "─", "mid-mid": "┴",
    "right": "│", "right-mid": "┤", "middle": " "
};


const titleMiddle = {
    "top": "─", "top-mid": "┬", "top-left": "┌", "top-right": "┐",
    "bottom": "5", "bottom-mid": "─", "bottom-left": "7", "bottom-right": "8",
    "left": "│", "left-mid": "├", "mid": "─", "mid-mid": "┬",
    "right": "│", "right-mid": "┤", "middle": "│"
};


const titleMidBottom = {
    "top": "─", "top-mid": "┬", "top-left": "┌", "top-right": "┐",
    "bottom": "5", "bottom-mid": "─", "bottom-left": "7", "bottom-right": "8",
    "left": "│", "left-mid": "├", "mid": "─", "mid-mid": "┴",
    "right": "│", "right-mid": "┤", "middle": " "
};


table.push(
    [ { content: title("Команда"), chars: titleTop }, { content: title("Алиас"), chars: titleTop }, { content: title("Описание"), chars: titleTop } ],
    [ { content: cmd("gulp"), chars: titleTopBottom }, { content: alias("d") + vv + alias("dev"), chars: titleTopBottom }, { content: "Запустить сборку", chars: titleTopBottom } ],
    [ { content: cmd("gulp help") }, { content: alias("?") + vv + alias("info") }, { content: "Помощь по сборке" } ],
    [ { content: cmd("gulp server") }, { content: alias("$") + vv + alias("S") }, { content: "Запустить только сервер" } ],
    [ { content: cmd("gulp proxy") }, { content: alias("P") }, { content: "Запустить сервер с прокси" } ],
    [ { content: cmd("gulp watcher") }, { content: alias("w") + vv + alias("watch") }, { content: "Запустить только наблюдатель" } ],
    [ { content: cmd("gulp build") }, { content: alias("b") }, { content: "Запустить билд проекта" } ],
    [ { content: cmd("gulp backend") }, { content: alias("back") }, { content: "Запустить билд под Backend" } ],
    [ { content: cmd("gulp clear") }, { content: alias("clean") }, { content: "Очистить папку " + under(green(`${path.root}`)) } ],
    [ { content: cmd("gulp clear:css") }, { content: alias("clean:css") }, { content: "Очистить папку " + under(green(`${path.root}/css`)) } ],
    [ { content: cmd("gulp root") }, { content: alias("r") }, { content: "Файлы вне директорий " + under(green("./src/*")) } ],
    [ { content: cmd("gulp html") }, { content: alias("h") }, { content: "Компиляция " + lang("HTML") + "/" + lang("PHP") } ],
    [ { content: cmd("gulp php") }, { content: alias("p") }, { content: "Компиляция " + lang("PHP") + " " + under(green("./src/php")) } ],
    [ { content: cmd("gulp scss") }, { content: alias("s") + vv + alias("c") + vv + alias("sass") }, { content: "Компиляция " + lang("SASS/SCSS") } ],
    [ { content: cmd("gulp smartgrid") }, { content: alias("sg") + vv + alias("grid") }, { content: "Компиляция " + lang("SmartGrid") + " сетки" } ],
    [ { content: cmd("gulp js") }, { content: alias("j") }, { content: "Компиляция " + lang("JS") } ],
    [ { content: cmd("gulp img") }, { content: alias("i") }, { content: "Компиляция картинок" } ],
    [ { content: cmd("gulp sprite") }, { content: alias("sp") }, { content: "Компиляция " + lang("SVG") + " спрайта" } ],
    [ { content: cmd("gulp font") }, { content: alias("f") + vv + alias("fonts") }, { content: "Компиляция шрифтов" } ],
    [ { content: cmd("gulp font:style") }, { content: alias("fs") + vv + alias("f:s") }, { content: "Интеграция шрифтов в " + lang("SCSS") } ],
    [ { content: cmd("gulp favicon") }, { content: alias("fav") + vv + alias("ico") }, { content: "Компиляция " + lang("Favicon") } ],
    [ { content: cmd("gulp ftp") }, { content: alias("F") + vv + alias("deploy") }, { content: "Выгрузить билд по " + lang("FTP") } ],
    [ { content: cmd("gulp zip") }, { content: alias("z") }, { content: "Упаковать билд в " + lang("ZIP") } ],

    // [{}, {}, {}],
    [ { content: title("Флаг"), chars: titleMiddle }, {
        content: title("Описание"), colSpan: 2, chars: titleMiddle
    } ],
    [ { content: cmd("--dev"), chars: titleMidBottom }, {
        content: "запуск в режиме разработки " + alias(black("[по ум.]")), colSpan: 2, chars: titleMidBottom
    } ],
    [ { content: cmd("--prod") }, { content: "запуск в режиме продакшена", colSpan: 2 } ],
    [ { content: cmd("--fav") + vv + cmd("favicon") }, { content: "компиляцая с фавиконом", colSpan: 2 } ]
);

// @ Task - Help
export function help(cb) {
    process.stdout.write("\u001b[2J\u001b[0;0H");
    console.log(table.toString());
    return Promise.resolve(cb);
};
