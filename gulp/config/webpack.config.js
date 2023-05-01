const esbuild = require("esbuild");
const isProd = process.argv.includes("--prod");

export default {

    mode: isProd ? "production" : "development",
    watch: false,

    experiments: {
        topLevelAwait: true
    },

    module: {
        rules: [
            // {
            //     test: /\.m?js$/,
            //     exclude: /(node_modules|bower_components)/,
            //     use: {
            //         loader: "babel-loader"
            //     }
            // }

            {
                test: /\.m?js$/,
                loader: "esbuild-loader",
                options: {
                    target: "es2022", // Syntax to compile to (see options below for possible values)
                    implementation: esbuild,
                    legalComments: "none"
                }
            }
        ]
    },

    plugins: [],

    // Если объединяем все файлы в один, иначе закомментировать это
    output: {
        filename: "app.js"
    },

    stats: {
        // Логирование / режим
        // 'none' - disable logging
        // 'error' - errors only
        // 'warn' - errors and warnings only
        // 'info' - errors, warnings, and info messages
        // 'log', true - errors, warnings, info messages, log messages, groups, clears. Collapsed groups are displayed in a collapsed state.
        // 'verbose' - log everything except debug and trace. Collapsed groups are displayed in expanded state.
        logging: "warn",
        preset: "errors-only",

        // Дата сборки и время сборки
        builtAt: false,

        nestedModules: false,

        // Причины по которым оптимизация не помогла
        optimizationBailout: true,

        // Производительность
        performance: false,

        // Активы внутри модулей
        moduleAssets: false,

        // Ассеты
        assets: false,
        assetsSort: "!size",

        // Цвета
        colors: true,

        // Hash сборки
        hash: false,

        // Версия Webpack
        version: false,

        // Времени потрачено
        timings: false,

        // Инфо о чанках
        chunks: false,
        chunkRelations: false,
        chunkModulesSpace: 3,
        modules: false,

        // Причины
        reasons: false,
        children: false,

        // Исходные пути
        source: false,

        // Ошибки
        errors: true,
        errorDetails: true,

        // Предупреждения
        warnings: true,

        // Пути
        publicPath: false,

        // Выходной путь
        outputPath: false


    }


};
