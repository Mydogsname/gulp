var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var postcss = require('gulp-postcss');
var pxtoviewport = require('postcss-px-to-viewport');
var plumber = require('gulp-plumber');
// var ts = require('gulp-typescript')
// var tsProject = ts.createProject("tsconfig.json");
var processors = [
    pxtoviewport({ 
        viewportWidth: 1080, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750 
        // viewportHeight: 4087,  //视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置 
        unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除） 
        viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw 
        //selectorBlackList: ['.ignore', '.hairlines'],  指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名 
        minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值 
        mediaQuery: false // 允许在媒体查询中转换`px` 
    })
];
gulp.task('watch', async function () {
    gulp.watch('./src/**/*.sass', async function () {
        gulp.src('./src/**/*.sass')
            .pipe(plumber())
            .pipe(sass())
            .pipe(postcss(processors))
            .pipe(gulp.dest('dist'))
    })
    gulp.watch('./src/**/*.pug', async function () {
        gulp.src('./src/**/*.pug')
            .pipe(plumber())
            .pipe(pug({basedir:"./src",pretty:true}))
            .pipe(gulp.dest('dist'))
    })
    gulp.watch('./src/**/*.js', async function () {
        gulp.src('./src/**/*.js')
            .pipe(plumber())
            .pipe(gulp.dest('dist'))
    })
    // gulp.watch('./src/**/*.ts', async function () {
    //     gulp.src('./src/**/*.ts')
                // .pipe(plumber())
    //         .pipe(ts())
    //         .pipe(gulp.dest('dist'))
    // })
})

gulp.task('dist', async function () {
    gulp.src('./src/**/*.sass')
            .pipe(plumber())
            .pipe(sass())
            .pipe(postcss(processors))
            .pipe(gulp.dest('dist'))
    gulp.src('./src/**/*.css')
            .pipe(plumber())
            .pipe(gulp.dest('dist'))
    gulp.src('./src/**/*.pug')
            .pipe(plumber())
            .pipe(pug({basedir:"./src",pretty:true}))
            .pipe(gulp.dest('dist'))
    gulp.src('./src/**/*.js')
            .pipe(plumber())
            .pipe(gulp.dest('dist'))
})