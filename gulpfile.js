"use strict";

const {watch, series, task, src, dest} = require("gulp"),
sass = require("gulp-sass"),
minCSS = require("gulp-clean-css"),
srcMaps = require("gulp-sourcemaps"),
autoprefixer = require("gulp-autoprefixer"),
srcLocale = "assets/scss/**/*.scss";

sass.compiler = require("node-sass");

task("workflow", optimizedSCSS);

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

task("default", function () {
    watch(srcLocale, optimizedSCSS);    
});
