
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var modules = require('gulp-load-plugins')({
	rename: {
		'gulp-minify-html': 'htmlMinify',
		'gulp-minify-css': 'cssMinify',
		'gulp-ruby-sass': 'rubySass',
	}
});

modules.webserver = require('gulp-webserver');
modules.gcmq = require('gulp-group-css-media-queries');
modules.stripCssComments = require('gulp-strip-css-comments');
modules.rename = require('gulp-rename');
modules.uncache = require('gulp-uncache');
modules.cssAdjuster = require('gulp-css-url-adjuster');
modules.beep = require('beepbeep');

modules.swallowError = function(error) {
	modules.beep();
	console.log(error.toString());
	return this.emit('end');
};

var dir = new function(){
	this.root   = __dirname;
	this.base   = '.';
	this.folder = this.base   + '/www';
	this.dist   = '../';
	
	this.replace = '/';
	
	this.js     = this.folder + '/js';
	this.css    = this.folder + '/css';
	this.img    = this.folder + '/images';
	this.dist_css   = this.dist + '/css';
	this.dist_img   = this.dist + '/images';
	this.dist_js    = this.dist + '/js';
};


var getTask = function getTask(task){
	var task;
	
	task = require(__dirname + '/tasks/' + task);
	
	return task(gulp, modules, dir);
};

gulp.task('usemin', getTask('usemin'));
gulp.task('htmlmin', getTask('htmlmin'));
gulp.task('styles', getTask('styles'));
gulp.task('images', getTask('images'));
gulp.task('csso', getTask('csso'));
gulp.task('distcopy', getTask('distcopy'));

gulp.task('build', function() {
	
	modules.sequence = require('run-sequence');
	modules.sequence(
		'distcopy',
		'images',
		'styles',
		'usemin',
		'csso',
		'htmlmin'
	);
});