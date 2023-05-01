<h3 align="center"><span><span style="color:#ff0000;">C</span><span style="color:#ff1100;">a</span><span style="color:#ff2200;">n</span><span style="color:#ff3300;">d</span><span style="color:#ff4400;">y&nbsp;</span></span><span><span style="color:#ff5500;">G</span><span style="color:#ff6600;">u</span><span style="color:#ff7700;">l</span><span style="color:#ff8800;">p</span></span></h3>

<div align="center">
  <sup>Built with <span style="color:red">❤︎</span> by
  <a href="https://github.com/phederal">PHEDERAL</a> and
  <a href="https://github.com/phederal/docker-starter/graphs/contributors">
    contributors
  </a>
  </sup>
</div>

---
<br>

<p align="center">
  <a href="#">
    <img alt="Qork Docker Starter" title="Qork Docker Starter" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png" width="100" align=""right>
  </a>
</p>

<p align="center">
  Сборка для практичной верстки.<br>Работает с <a href="https://gulpjs.com/" target="_blank">Gulp</a>, <a href="https://code.visualstudio.com/" target="_blank">VScode</a> и <a href="https://pnpm.io/" target="_blank">PNPM</a>.
</p>

<p align="center">
  <a href="https://code.visualstudio.com/docs/containers/overview"><img src="https://img.shields.io/badge/Made%20with-VSCode-1f425f?style=flat&labelColor=black" alt="VScode"></a>
  <a href="https://pnpm.io/"><img src="https://img.shields.io/badge/pnpm-orange?style=flat" alt="pnpm"></a>
</p>

---
<br>

- [Установка](#установка)
- [Команды](#команды)
- [Структура](#структура)
- [Настройки проекта](#настройки-проекта)
  - [package.json](#packagejson)
  - [project.js](#projectjs)
  - [projectFTP.js](#projectftpjs)
  - [projectSmartGrid.js](#projectsmartgridjs)
- [Возможности](#возможности)
  - [Кратко](#кратко)
  - [Подробно](#подробно)
- [Contributing](#contributing)

<br>

# Установка
Вам нужно установить `pnpm` так как сборка лучшего все работает именно с ним.
Устанавливаем PNPM в систему
```bash
# Windows PowerShell:
iwr https://get.pnpm.io/install.ps1 -useb | iex

# Curl Installer
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Wget
wget -qO- https://get.pnpm.io/install.sh | sh -
```
Если вы используете Bash / GitBash / Zsh и т.п.<br>
Установите `pnpm` как глобальный пакет.
```bash
sudo npx pnpm add -g pnpm
```

# Команды

| Задача            | Режим                                     | Описание                                                     |
| :---------------- | :---------------------------------------- | :----------------------------------------------------------- |
| `npm run config`  |                                           | Создать конфиг файлы проекта                                 |
| `npm start`       | <span style="color:red">**DEV**</span>    | Сборка проекта + запуск сервера                              |
| `npm run build`   | <span style="color:red">**DEV**</span>    | Сборка проекта в <span style="color:red">Development</span>  |
| `npm run prod`    | <span style="color:green">**PROD**</span> | Сборка проекта в <span style="color:green">Production</span> |
| `npm run backend` | <span style="color:green">**PROD**</span> | Сборка проекта в <span style="color:orange">Backend</span>   |
| `npm run server`  |                                           | Запустить сервер (без сборки проекта)                        |
| `npm run watch`   |                                           | Запустить наблюдитель (без сборки проекта)                   |
| `npm run clear`   |                                           | Удаление папки с билдом проекта                              |
| `npm run root`    |                                           | Копирование файлов вне  `./src/*`                            |
| `npm run html`    |                                           | Компиляция HTML + PHP  `./src/html`                          |
| `npm run php`     |                                           | Компиляция PHP Functions `./src/php`                         |
| `npm run js`      |                                           | Компиляция JS                                                |
| `npm run css`     |                                           | Компиляция SCSS/CSS                                          |
| `npm run img`     |                                           | Компиляция картинок                                          |
| `npm run sprite`  |                                           | Компиляция SVG спрайтов                                      |
| `npm run font`    |                                           | Компиляция шрифтов                                           |
| `npm run fs`      |                                           | Компиляция стилей шрифтов для SCSS                           |
| `npm run favicon` |                                           | Компиляция фавиконок                                         |
| `npm run ftp`     |                                           | Загрузка билда проекта по FTP                                |
| `npm run zip`     |                                           | Сборка проекта в ZIP архив                                   |
| `npm run help`    |                                           | Справка по командам [Gulp CLI](https://gulpjs.com/)          |



<br>
https://github.com/pnpm/pnpm/releases/latest

# Структура
```diff
public                - билд проекта
src                   - исходные файлы
project.js            - настройки проекта
projectFTP.js         - настройки FTP доступа
projectSmartGrid.js   - настройки SmartGrid
```

```diff
src/html      - HTML/PHP
src/sass      - SCSS/CSS
src/js        - JS (Webpack)
src/img       - Картинки
src/data      - Данные для HTML шаблонов
src/font      - Шрифты
src/ico       - Favicon
src/php       - PHP Functions (for WP)
```
<br>

<!-- - log-symbols -->
<!-- - enquirer -->
<!-- - yargs -->
<!-- ## gulp  -->
<!-- - gulp-filter -->
<!-- - gulp-flutten (remove or replace rel path of files) -->
<!-- - @gulp-plugin/pandoc (md) -->
<!-- - gulp-sharp-responsive (next) -->
<!-- - gulp-cache -->
<!-- - gulp-avif -->

# Настройки проекта
Вы можете настроить сборку под каждый проект индивидуально. Конфиг файлы генирируются автоматически если вы запускаете любую из задач, или вы можете сгенерировать их сами с помощью команды `npm run config`

## package.json
По умолчанию папка при билде проекта `./public`, но вы можете изменить путь для билд папки в package.json
```
"buildFolder": "./public", | например на "../build-project"
```

## project.js
Настройки проекта, сервера, прокси, ip и port, компрессии изображений, необходимости в [SmartGrid](https://github.com/dmitry-lavrik/smart-grid) и т.д..

## projectFTP.js
Настройки данных для выгрузки проекта на хостинг по FTP. Если вы заливаете свой проект в git репозиторий, то данный файл не попадет в него. Сделано это ради безопасности. Но вы можете включить его в выгрузку если уберете строчку с названием данног файла из `.gitignore`

## projectSmartGrid.js
Настройки [SmartGrid](https://github.com/dmitry-lavrik/smart-grid). Если вы запускаете сервер/наблюдатель то при любом изменении данного файла, произойдёт повторная сборка CSS файлов. Если в файле `project.js`  вы установили  `smartgrid: false`, то любые остатки от [SmartGrid](https://github.com/dmitry-lavrik/smart-grid) будут автоматически удалены из всех CSS файлов. Файл настроек вы можете удалить сами, или оставить если вновь захотите использовать данную технологию.

<br>

# Возможности
## Кратко
| Возможность                                                        | Статус |                                 Подробнее                                  |
| :----------------------------------------------------------------- | :----: | :------------------------------------------------------------------------: |
| Компиляция HTML + PHP                                              |   ✅    |                                `./src/html`                                |
| Компиляция PHP                                                     |   ✅    |                                `./src/php`                                 |
| Компиляция SCSS/CSS                                                |   ✅    |                                                                            |
| Компиляция JS                                                      |   ✅    | [Webpack](https://webpack.js.org/) + [ESbuild](https://esbuild.github.io/) |
| Поддержка [SmartGrid](https://github.com/dmitry-lavrik/smart-grid) |   ✅    |                         `./project.js > smartGrid`                         |
| Компиляция SVG спрайтов                                            |   ✅    |                          Mono-color / Multi-color                          |
| Компрессия SVG картинок                                            |   ✅    |                              Minify + Cleaner                              |
| Компрессия изображений                                             |   ✅    |                         PNG / JPEG / SVG / ~~GIF~~                         |
| Поддержка WEBP изображений                                         |   ✅    |                       авто подключение в HTML + PHP                        |
| Поддержка AVIF изображений                                         |   ❌    |                                                                            |
| Конвертация шрифтов                                                |   ✅    |                         OTF/TTF/WOFF/WOFF2/~~EOT~~                         |
| Авто подключение шрифтов                                           |   ✅    |                                                                            |
| Синхронизация файлов вне директорий                                |   ✅    |                             файлы в `./src/*`                              |
| Легкая очистка директорий                                          |   ✅    |                              `npm run clear`                               |
| Архивирование всего проекта                                        |   ✅    |                            только `./public/*`                             |
| Деплой проекта по FTP                                              |   ✅    |                            только `./public/*`                             |
| Компиляция Markdown                                                |   ❌    |                                                                            |
| Публикация на GitHub Pages                                         |   ❌    |                                                                            |
| Сервер для сборки (BrowserSync)                                    |   ✅    |                              `npm run server`                              |
| Поддержка LocalTunnel                                              |   ✅    |                      `online: true` в `./project.js`                       |
| Информация по командам                                             |   ✅    |                               `npm run help`                               |
| Нативная поддержка задач VScode                                    |   ⭕    |                            `only default task`                             |

## Подробно
- **Gulp**
  - [x] Console Messages
  - [x] Style console logs
  - [ ] Loading Animation
    <!-- - [ ] ora (meaby) -->
    <!-- - [ ] listr -->
    <!-- - [ ] spinner -->
    <!-- - [ ] spinner-cli -->
    <!-- - [ ] cli-progress (good idea) -->
  - [ ] Progress Line
  - [x] FTP upload (`./public`)
  - [x] Hidden advanced settings (.vscode, .eslintrc, etc)
  - [ ] .vscode/snippets & extensions file
  - [x] Help Menu (task help)
  - [x] Aliases for tasks (gulp html > gulp h)
  - [x] Hiding system messages (silent default)
  - [x] Auto create file config for project
  - [x] Auto create file config for FTP
  - [x] Auto create file config for smart-grid
  - [x] Settings for disable smart-grid
  - [x] Errors do not break the build
- **HTML**
  - [x] Compile
  - [x] Include/Import
  - [x] Templating
  - [x] Foreach (Repeater)
  - [x] Minify
  - [x] Sorting Classes
  - [x] Typograf
- **SASS/SCSS**
  - [x] Compile
  - [x] Include & Import Glob
  - [x] Import on Imported (recursive)
  - [x] Import from `node_modules` without all path
  - [x] Minify
  - [x] Partials
  - [x] Reset CSS [sanitize.css](https://csstools.github.io/sanitize.css/)
  - [x] [SmartGrid](https://github.com/dmitry-lavrik/smart-grid)
- **JS**
  - [x] [Webpack](https://webpack.js.org/) Stream (w/ [ESbuild](https://esbuild.github.io/))
  - [x] Minify (only `--prod`)
  - [x] Using all JS files without underscore in the file name
- **Font**
  - [x] OTF to TTF
  - [x] TTF to WOFF
  - [x] TTF to WOFF2
  - [x] ~~TTF to EOT~~
  - [x] Generate fontface to _fonts.scss (auto included)
- **Image**
  - [x] Compress (Imagemin) 
  - [x] Convert to WEBP
  - [ ] Convert to AVIF
  - [x] Сonvert only newer or changed images
  - [x] Auto \<pictures\> tags on HTML with `.WEBP` images
  - [ ] Responsive images (1x, 2x, 3x, 4x)
- **SVG**
  - [x] SVG minify
  - [x] Sprites compiler from `img/sprite-mode.svg/*` to `img/sprite/mode.svg`
  - [ ] Icons (svg,png) from img/icons to img/icons/*
  - [x] Exclude `sprite.svg/*` files from gulp.dest
  - [ ] Exclude `icons/*` files from gulp.dest
- **Markdown**
  - [ ] Compile with `gulp-markdown`
  - [ ] Minify
- **Favicon**
  - [x] Generate files
  - [x] Load files into folder
  - [x] Generate HTML meta's
  - [x] Automate include HTML into HEADER
- **PHP/WordPress**
  - [x] Watch php files
  - [x] BrowserSync can read PHP files
  - [x] Do not edit php tags (typograf)
  - [x] Can useless for development themes
- **Server ([BrowserSync](https://browsersync.io/))**
  - [x] Custom UI for server info
  - [x] Enable/Disable UI
  - [x] Enable/Disable Online mode
  - [x] Enable/Disable [LocalTunnel](https://LocalTunnel.me)
- **VScode**
  - [x] Recommended extensions
  - [x] Snippets
  - [x] HTML
  - [x] JS
  - [x] CSS


<!-- ```js
.on('data', () => { $.log("__data"); })
.on('readable', () => { $.log("__readable"); })
.on('unpipe', () => { $.log("__unpipe"); })
.on('finish', () => { $.log("__finish"); })
.on('end', () => { $.log("__end"); })

.on('drain', () => { $.log("__drain"); })
.on('pipe', () => { $.log("__pipe"); })
.on('close', () => { $.log("__close"); })
``` -->

# Contributing
1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE:** Be sure to merge the latest from "upstream" before making a pull request!
