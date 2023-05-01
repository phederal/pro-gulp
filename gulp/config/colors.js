
const { reset, bold, dim, underscore, blink, reverse, hidden } = [
    [ "reset", 0 ], [ "bold", 1 ], [ "dim", 2 ], [ "underscore", 4 ],
    [ "blink", 5 ], [ "reverse", 7 ], [ "hidden", 8 ]
].reduce((cols, col) => ({
    ...cols, [col[0]]: f => `\x1b[${col[1]}m${f}\x1b[0m`
}), {});

const { red, green, blue, white, cyan, magenta, yellow, black } = [
    [ "red", 1 ], [ "green", 2 ], [ "blue", 4 ], [ "white", 7 ],
    [ "cyan", 6 ], [ "magenta", 5 ], [ "yellow", 3 ], [ "black", 0 ]
].reduce((cols, col) => ({
    ...cols, [col[0]]: f => `\x1b[3${col[1]}m${f}\x1b[0m`
}), {});

const { redBG, greenBG, blueBG, whiteBG, cyanBG, magentaBG, yellowBG, blackBG } = [
    [ "redBG", 1 ], [ "greenBG", 2 ], [ "blueBG", 4 ], [ "whiteBG", 7 ],
    [ "cyanBG", 6 ], [ "magentaBG", 5 ], [ "yellowBG", 3 ], [ "blackBG", 0 ]
].reduce((cols, col) => ({
    ...cols, [col[0]]: f => `\x1b[4${col[1]}m${f}\x1b[0m`
}), {});

const { redBold, greenBold, blueBold, whiteBold, cyanBold, magentaBold, yellowBold, blackBold } = [
    [ "redBold", 1 ], [ "greenBold", 2 ], [ "blueBold", 4 ], [ "whiteBold", 7 ],
    [ "cyanBold", 6 ], [ "magentaBold", 5 ], [ "yellowBold", 3 ], [ "blackBold", 0 ]
].reduce((cols, col) => ({
    ...cols, [col[0]]: f => `\x1b[1;3${col[1]}m${f}\x1b[0m`
}), {});

export default {
    reset,
    bold,
    dim,
    underscore,
    blink,
    reverse,
    hidden,
    red,
    green,
    blue,
    white,
    cyan,
    magenta,
    yellow,
    black,
    redBold,
    greenBold,
    blueBold,
    whiteBold,
    cyanBold,
    magentaBold,
    yellowBold,
    blackBold,
    redBG,
    greenBG,
    blueBG,
    whiteBG,
    cyanBG,
    magentaBG,
    yellowBG,
    blackBG
};

// console.log(`${c.red("I")} love ${c.green("Italy")}`),
// console.log(`${c.blue("I")} love ${c.white("Italy")}`),
// console.log(`${c.cyan("I")} love ${c.yellow("Italy")}`),
// console.log(`${c.magenta("I")} love ${c.black("Italy")}`),
// console.log("---"),
// console.log(`${c.redBold("I")} love ${c.greenBold("Italy")}`),
// console.log(`${c.blueBold("I")} love ${c.whiteBold("Italy")}`),
// console.log(`${c.cyanBold("I")} love ${c.yellowBold("Italy")}`),
// console.log(`${c.magentaBold("I")} love ${c.blackBold("Italy")}`),
// console.log("---"),
// console.log(`${c.reset("I")} love ${c.bold("Italy")}`),
// console.log(`${c.dim("I")} love ${c.underscore("Italy")}`),
// console.log(`${c.reverse("I")} love ${c.blink("Italy")}`),
// console.log(`${c.hidden("I")} love ${c.hidden("Italy")}`),
