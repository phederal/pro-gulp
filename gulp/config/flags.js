const isProd = process.argv.includes("--prod") || process.argv.includes("backend");
const isDev = !isProd;
const isFavicon = process.argv.includes("--fav") || process.argv.includes("--favicon");
const isProxy = process.argv.includes("proxy") || process.argv.includes("P");

export default {
    isProd,
    isDev,
    isFavicon,
    isProxy
};
