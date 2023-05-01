/* @ Import Modules ——————————————————————————— */
import app from "../config/app.js";
import path from "../config/path.js";
import theme from "../config/theme.js";
import log from "fancy-log";
import browserSync from "browser-sync";
import Tables from "cli-table3";
import c from "../config/colors.js";

/* @ Styles ——————————————————————————————————— */
const style = {
    reset: c.reset,
    path: c.green,
    title: c.red,
    titleBold: c.redBold,
    titlePrefixBold: c.yellowBold,
    subTitle: c.yellow,
    subTitleBold: c.yellowBold,
    subTitleBoldTwo: c.magentaBold,
    property: c.black
};

/* @ Tables ——————————————————————————————————— */
const table = new Tables({
    colWidths: [ 8, 44, 8 ],
    style: {
        head: [],
        border: [ "red" ]
    },
    wordWrap: false,
    wrapOnWordBoundary: true
});

// @ Task - Server
export const server = () => {
    browserSync({
        server: {
            baseDir: path.root,
            directory: false,
            index: "index.html",
            serveStaticOptions: {
                extensions: app.server.serverExtensions
            }
        },
        tunnel: app.server.tunnel,
        ui: app.server.ui ? { port: app.server.portUI } : false,
        online: app.server.online,
        host: app.server.onlineHost,
        port: app.server.port,
        logPrefix: style.titlePrefixBold("❯❯ ") + style.titleBold("SERVER"),
        logConnections: app.server.logConnections,
        open: app.server.open,
        reloadOnRestart: true,
        logLevel: "info",
        notify: false,
        ghostMode: app.server.ghostMode,
        scrollProportionally: true,
        scrollRestoreTechnique: "window.name"
    }, function (err, bs) {
        // const prefix = bs.options.getIn([ "logPrefix" ]);
        const tunnel = bs.options.get("tunnel");
        const online = bs.options.get("online");
        const mode = bs.options.get("mode");
        const urlTunnel = bs.options.getIn([ "urls", "tunnel" ]);
        const urlLocal = bs.options.getIn([ "urls", "local" ]);
        const uiLocal = bs.options.getIn([ "urls", "ui" ]);
        const urlExt = bs.options.getIn([ "urls", "external" ]);
        const uiExt = bs.options.getIn([ "urls", "ui-external" ]);
        const baseDir = bs.options.get("server").get("baseDir").get(0);
        const ifOnline = bs.options.get("online") ? (app.server.ui ? `${urlExt}\n${uiExt}` : `${urlExt}`) : (`Disabled\nDisabled`);

        if (err) throw err;

        table.push(
            [ { content: style.titlePrefixBold("❯❯") + style.path(` ${baseDir}`), colSpan: 2 }, { content: style.subTitleBold((mode).toUpperCase()), hAlign: "center" } ],
            [ { content: style.titleBold(app.server.ui ? `LOCAL\nUI` : `LOCAL`), hAlign: "right" }, { content: app.server.ui ? `${urlLocal}\n${uiLocal}` : `${urlLocal}`, colSpan: 2 } ]
        );
        online ?
            (table.push([ { content: style.titleBold(app.server.ui ? `ONLINE\nUI` : `ONLINE`), hAlign: "right" }, { content: ifOnline, colSpan: 2 } ]),
            tunnel ?
                table.push([ { content: style.titleBold("TUNNEL"), hAlign: "right" }, { content: urlTunnel, colSpan: 2 } ]) :
                null) :
            null;


        process.stdout.write("\u001b[2J\u001b[0;0H");
        log(theme.server.start);
        console.log(table.toString());
        console.log(theme.server.press + `\n`);
    });
};

export function serverProxy() {
    browserSync.init({
        proxy: app.server.proxyHost,
        host: app.server.proxyDomain,
        tunnel: app.server.tunnel,
        ui: app.server.ui ? { port: app.server.portUI } : false,
        online: app.server.online,
        logPrefix: style.titlePrefixBold("❯❯ ") + style.titleBold("SERVER"),
        logConnections: app.server.logConnections,
        open: app.server.open,
        reloadOnRestart: true,
        logLevel: "info",
        notify: false,
        port: app.server.port,
        ghostMode: app.server.ghostMode,
        scrollProportionally: true,
        scrollRestoreTechnique: "window.name"
    }, function (err, bs) {
        // const prefix = bs.options.getIn([ "logPrefix" ]);
        const tunnel = bs.options.get("tunnel");
        const online = bs.options.get("online");
        const mode = bs.options.get("mode");
        const urlTunnel = bs.options.getIn([ "urls", "tunnel" ]);
        const urlLocal = bs.options.getIn([ "urls", "local" ]);
        const uiLocal = bs.options.getIn([ "urls", "ui" ]);
        const urlExt = bs.options.getIn([ "urls", "external" ]);
        const uiExt = bs.options.getIn([ "urls", "ui-external" ]);
        const ifOnline = bs.options.get("online") ? (app.server.ui ? `${urlExt}\n${uiExt}` : `${urlExt}`) : (`Disabled\nDisabled`);

        if (err) throw err;

        table.push(
            [ { content: style.titlePrefixBold("❯❯") + style.path(` https://${app.server.proxyHost}`), colSpan: 2 }, { content: style.subTitleBoldTwo((mode).toUpperCase()), hAlign: "center" } ],
            [ { content: style.titleBold(app.server.ui ? `LOCAL\nUI` : `LOCAL`), hAlign: "right" }, { content: app.server.ui ? `${urlLocal}\n${uiLocal}` : `${urlLocal}`, colSpan: 2 } ]
        );
        online ?
            (table.push([ { content: style.titleBold(app.server.ui ? `ONLINE\nUI` : `ONLINE`), hAlign: "right" }, { content: ifOnline, colSpan: 2 } ]),
            tunnel ?
                table.push([ { content: style.titleBold("TUNNEL"), hAlign: "right" }, { content: urlTunnel, colSpan: 2 } ]) :
                null) :
            null;

        process.stdout.write("\u001b[2J\u001b[0;0H");
        log(theme.server.start);
        console.log(table.toString());
        console.log(theme.server.press + `\n`);
    });
};
