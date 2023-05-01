import fs from "fs";
import globAll from "glob-all";

// Функция удаления одного файла по пути
function deleteFiles(files, func, callback) {
    let i = files.length;
    files.forEach(function (filepath) {
        func(filepath, { force: true, recursive: true }, function (err) {
            i--;
            if (err) {
                callback(err);

            } else if (i <= 0) {
                callback(null);
            }
        });
    });
}

// Функция удаления всех файлов по заданному regex пути (на замену модуля "del")
export const del = (paths, msg) => globAll(paths, { stat: true }, function (er, files) {
    if (!er) { deleteFiles(files, fs.rmSync, err => { if (err) throw err; else msg; }) } else { throw er };
});

// Функция удаления всех файлов по заданному regex пути (на замену модуля "del")
export const delAsync = (paths, msg) => globAll(paths, { stat: true }, function (er, files) {
    if (!er) { deleteFiles(files, fs.rm, err => { if (err) throw err; else msg; }) } else { throw er };
});

// DEBUG: Выводим массив в виде строк с путями до файлов которые были удалены
// globAll(path.rootFiles.clear, { stat: true }, function (er, files) { if (!er) { console.log(files) } else (console.log(er)); });
