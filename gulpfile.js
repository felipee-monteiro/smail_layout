"use strict";

const {watch, series, task, src, dest} = require("gulp"),
sass = require("gulp-sass"),
imgMini = require("gulp-imagemin"),
htmlMini = require("gulp-htmlmin"),
minCSS = require("gulp-clean-css"),
srcMaps = require("gulp-sourcemaps"),
autoprefixer = require("gulp-autoprefixer"),
srcLocale = "assets/scss/**/*.scss";

sass.compiler = require("node-sass");

task("workflow", optimizedSCSS);
task("img", imgMinify);

async function optimizedSCSS() {
    const css = await src(srcLocale)
    .pipe(sass().on("error", sass.logError))
    .pipe(srcMaps.init())
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
    }))
    .pipe(minCSS())
    .pipe(srcMaps.write("./"))
    .pipe(dest("assets/dist"));

    return css;
}

async function imgMinify(){
    const img = await src("assets/images/*.svg")
    .pipe(imgMini())
    .pipe(dest("assets/dist/images"));
    return img;
}

async function htmlMin(){
    const html = await src("./index.html")
    .pipe(htmlMini({ collapseWhitespace: true }))
    .pipe(dest("assets"));
    return html;
}

task("default", function () {
    watch(srcLocale, optimizedSCSS); 
    watch("index.html", htmlMin);
    watch("assets/images/*.svg", imgMinify);  
});
