var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var del          = require('del');
var htmlmin      = require('gulp-htmlmin');
var imagemin     = require('gulp-imagemin');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var shell        = require('gulp-shell');
var runSequence  = require('run-sequence');
var critical     = require('critical').stream;
var uncss        = require('gulp-uncss');
var reload       = browserSync.reload;


var cssnano = require('gulp-cssnano');
var sass         = require('gulp-sass'); 
sass.compiler    = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('./_assets/sass/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./_assets/sass/styles.scss', ['sass']);
});

// Task for Jekyll
gulp.task('jekyll', function(done) {
  return gulp.src('index.html', { read: false })
      .pipe(shell([
          'bundle exec jekyll build'
      ]));
done();
});

// Handle UNCSS task
gulp.task('uncss', function () {
    return gulp.src('./css/styles.css')
        .pipe(uncss({
          // timeout      : 1000,
          ignore: [
            /\.is-active/
          ],
            html: [
              'http://127.0.0.1:4000/kid/2016/10/01/kids-cake50/',
'http://127.0.0.1:4000/infant/2016/10/01/infant-cake54/',
'http://127.0.0.1:4000/wedding/2016/09/30/wedding-cake56/',
'http://127.0.0.1:4000/nude/2016/09/30/nude-cake30/',
'http://127.0.0.1:4000/nude/2016/09/27/nude-cake241/',
'http://127.0.0.1:4000/kid/2016/09/26/kids-cake48/',
'http://127.0.0.1:4000/man/2016/09/25/man-cake21/',
'http://127.0.0.1:4000/nude/2016/09/12/nude-cake26/',
'http://127.0.0.1:4000/candybar/2016/08/29/candybar-cake8/',
'http://127.0.0.1:4000/wedding/2016/08/28/wedding-cake55/',
'http://127.0.0.1:4000/infant/2016/08/27/infant-cake52/',
'http://127.0.0.1:4000/wedding/2016/08/11/wedding-cake52/',
'http://127.0.0.1:4000/infant/2016/08/10/infant-cake49/',
'http://127.0.0.1:4000/kid/2016/08/06/kids-cake44/',
'http://127.0.0.1:4000/nude/2016/08/05/nude-cake24/',
'http://127.0.0.1:4000/infant/2016/07/29/infant-cake50/',
'http://127.0.0.1:4000/nude/2016/07/23/nude-cake17/',
'http://127.0.0.1:4000/wedding/2016/07/15/wedding-cake54/',
'http://127.0.0.1:4000/nude/2016/06/29/nude-cake22/',
'http://127.0.0.1:4000/kid/2016/06/27/kids-cake32/',
'http://127.0.0.1:4000/infant/2016/06/27/infant-cake38/',
'http://127.0.0.1:4000/kid/2016/06/26/kids-cake33/',
'http://127.0.0.1:4000/infant/2016/06/26/infant-cake6/',
'http://127.0.0.1:4000/wedding/2016/05/24/wedding-cake53/',
'http://127.0.0.1:4000/nude/2016/05/17/nude-cake16/',
'http://127.0.0.1:4000/man/2015/02/09/man-cake14/',
'http://127.0.0.1:4000/wedding/2014/06/24/wedding-cake21/',
'http://127.0.0.1:4000/man/2014/03/02/man-cake18/',
'http://127.0.0.1:4000/infant/2013/12/21/infant-cake43/',
'http://127.0.0.1:4000/man/2013/11/07/man-cake8/',
'http://127.0.0.1:4000/wedding/2013/10/19/wedding-cake42/',
'http://127.0.0.1:4000/blog/',
'http://127.0.0.1:4000/candybar/',
'http://127.0.0.1:4000/celebration/',
'http://127.0.0.1:4000/contacts/',
'http://127.0.0.1:4000/corporate/',
'http://127.0.0.1:4000/fillings/',
'http://127.0.0.1:4000/',
'http://127.0.0.1:4000/infants/',
'http://127.0.0.1:4000/kids/',
'http://127.0.0.1:4000/man/',
'http://127.0.0.1:4000/tatatort-cakes/',
'http://127.0.0.1:4000/sweets/',
'http://127.0.0.1:4000/wedding-cakes/',
            ]
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('_includes/critical/'));
});

// watch files for changes and reload
gulp.task('serve',['sass', 'jekyll'], function() {
  browserSync.init({
    server: {
        baseDir: "./_site"
    }
});

  gulp.watch("_assets/sass/*.{scss|sass}", ['sass','jekyll']);
  gulp.watch("./*.html", ['jekyll']);
  gulp.watch("./_site/*.html").on('change', browserSync.reload);
});

// clean temp files
gulp.task('clean:temp', function () {
  return del([
    // here we use a globbing pattern to match everything inside the `_site` folder
    '_site/**/*',
    './img/**/*',
    './js/**/*'
  ]);
});

//build main.js scripts
gulp.task('build:scripts', function() {
  return gulp.src(['_assets/js/**/*.js' ])
  .pipe(uglify())
  .pipe(gulp.dest('./js'))
});

//// Optimize and copy images to 'assests'.
//gulp.task('build:images', function() {
//    return gulp.src('_assets/img/**/*')
////        .pipe(imagemin(
////		{
////			verbose: true}))
//        .pipe(gulp.dest('./img'))
//        .pipe(browserSync.stream());
//});

// Task to minify html - used in 'gulp build'
gulp.task('minify', function() {
  return gulp.src('_site/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('_site'));
});


// Default task

gulp.task('build', function(callback) {
    runSequence( 'build:scripts', 'jekyll', 'minify',
        callback);
});

gulp.task('site:img', function() {
	return gulp.src('_site/img/cakes/**/*.jpg')
	.pipe(imagemin(
		{
			interlaced: true,
      progressive: true,
      optimizationLevel: 8,
			verbose: true
		}
	))
	.pipe(gulp.dest('_site/img/cakes/'));
});

// Experimenting with critical CSS

gulp.task('critical', function () {
  return gulp.src('_site/**/*.html')
    .pipe(critical({
      base: '_site/',
      css: ['_site/css/main.css'],
      minify: true,
      dimensions: [{
            height: 1024,
            width: 768
        }, {
            height: 1400,
            width: 1024
        }, {
            height: 1200,
            width: 1440
        }]
    }))
    .on('error', function (err) {
      gutil.log(gutil.colors.red(err.message));
    })
    .pipe(gulp.dest('_includes/critical/'));
});

// Default Task: builds site.
gulp.task('default', ['build']);