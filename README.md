# gulp-jossy
> gulp plugin for [Jossy bundler](https://github.com/Kolyaj/Jossy "Jossy")

*Issues with the output should be reported on the Jossy [issue tracker](https://github.com/Kolyaj/Jossy/issues).*

## Install

```
$ npm install --save gulp-jossy
```

## Usage
```js
const gulp = require('gulp');
const jossy = require('gulp-jossy');

gulp.task('build', () => {
    return gulp.src('./sources/*.js')
        .pipe(jossy())
        .pipe(gulp.dest('./public/js'));
});
```

## API

### jossy([options])

#### options

See the Jossy [options](https://github.com/Kolyaj/Jossy#Использование-сборщика-из-nodejs)
