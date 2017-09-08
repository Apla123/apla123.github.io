module.exports = function (gulp, modules, dir) {
	return function() {
		gulp.src(dir.folder + '/*.{php,html}')
		.pipe(modules.usemin({
			css: ['concat'/*, modules.cssMinify(), modules.rev(), modules.rename({suffix:"." + new Date().getTime(),extname:".css?"})*/ ],
			js: [modules.ngAnnotate(), modules.uglify()/*, modules.rev()*/ ]
		}))
		.pipe(modules.uncache())
		.pipe(modules.replaceTask({
			patterns: [{
				match: /\"\/?js\//g,
				replacement: '"' + dir.replace + 'js/'
			},{
				match: /\"\/?css\//g,
				replacement: '"' + dir.replace + 'css/'
			},{
				match: /\"\/?images\//g,
				replacement: '"' + dir.replace + 'images/'
			},{
				match: /\"\/?uploads\//g,
				replacement: '"' + dir.replace + 'docs/'
			},{
				match: /\"\/?favicon.ico/g,
				replacement: '"' + dir.replace + 'favicon.ico'
			}]
		}))
		.pipe(gulp.dest(dir.dist));
		
		return gulp.src(dir.folder + '/view/**/*.html')
		.pipe(modules.usemin({
			path: dir.folder,
			css: ['concat'/*, modules.cssMinify(),modules.rev()*/ ],
			js1: [modules.uglify() ],
			js2: [modules.uglify() ],
			js3: [modules.uglify() ],
			js4: [modules.uglify() ],
			js5: [modules.uglify() ],
			js6: [modules.uglify() ],
			js7: [modules.uglify() ]
		})).pipe(modules.replaceTask({
			patterns: [{
				match: /\"\/?js\//g,
				replacement: '"' + dir.replace + 'view/js/'
			},{
				match: /\"\/?css\//g,
				replacement: '"' + dir.replace + 'css/'
			},{
				match: /\"\/?images\//g,
				replacement: '"' + dir.replace + 'images/'
			},{
				match: /\"\/?uploads\//g,
				replacement: '"' + dir.replace + 'docs/'
			}]
		}))
		.pipe(gulp.dest(dir.dist + '/view'));
	};
};
