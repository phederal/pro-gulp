# JS
Все файлы по умолчанию включаются в сборке Webpack
А точнее все из данного каталога, не включая под-каталоги (`modules`)
Поэтому хранить файлы в данном каталоге в стандартном виде, неправильно, ибо они попадут в сборку Webpack.
Для того, чтобы они не попадали, в названии файла поставьте профикс `_`.
Таким образом файл `test.js` станет `_test.js` и он не попадет в общую сборку Webpack.
Работет все по тому же принципу, что и SCSS/SASS.

# Структура
```diff
components/*    <- компоненты
modules/*       <- модули
app.js          <- основной файл
test.js         <- второстепенный файл
webp.js         <- поддержка WEBP (не удаляйте файл)
```

Когда Webpack собирает бандл, то все файлы имеют свой приоритет.
Приоритет строится по названию файла в алфовитном порядке.
Очередь сборки: основной файл + components + modules + второстепенные файлы... 
