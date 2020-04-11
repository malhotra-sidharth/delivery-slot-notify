const { src, dest, series } = require('gulp');
const clean = require('gulp-clean');
const cleanhtml = require('gulp-cleanhtml');
const merge = require('gulp-merge-json');

// @Ref: https://gist.github.com/lykmapipo/eec3888e41d5be70a4eb
// clean dist directory
const cleanDist = () => {
  return src('dist/*', { read: false })
    .pipe(clean());
}

// copy static files to dist directory
const copy = () => {
  src('src/assets/img/**')
    .pipe(dest('dist/src/assets/img/'))

  return src('src/**/*.css')
      .pipe(dest('dist/src/'))
}

// compress and copy html
const html = () => {
  return src('src/**/*.html')
    .pipe(cleanhtml())
    .pipe(dest('dist/src/'))
}

const manifest = () => {
  return src(['manifest.json'])
    .pipe(merge({
        fileName: 'manifest.json'
    }))
    .pipe(dest('dist/src/'));
}

exports.default = series(cleanDist, copy, html, manifest);
