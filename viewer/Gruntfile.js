module.exports = function(grunt) {
	'use strict';
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			}
		},
		jshint: {
			files: ['gruntfile.js', 'src/js/*.js'],
			options: {
				globals: {
					jQuery: true,
					console: true,
					window: true,
					hdv: true,
					_: true,
					Handlebars: true,
					L: true
				},
				laxbreak: true
			}
		},
		rev: {
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 8
			},
			assets: {
				files: [{
					src: ['dist/{css,js}/*.{js,css}']
				}]
			}
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint']
		},
		useminPrepare: {
			html: 'src/index.html',
			options: {
				dest: 'dist/'
			}
		},
		usemin: {
			html: ['dist/**/*.html'],
			css: ['dist/**/*.css'],
			options: {
				dirs: ['dist/']
			}
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: 'src/',
					dest: 'dist/',
					src: ['*.{ico,png,txt,html}', 'img/{,*/}*.{gif}', 'socialshareprivacy/*', 'data/*.geojson']
				}]
			}
		},
		clean: {
			dist: {
				files: [{
					dot: true,
					src: ['dist/{css,js,img}']
				}]
			}
		},
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'src/img',
					src: '{,*/}*.{png,jpg,jpeg}',
					dest: 'dist/img'
				}]
			}
		},
		jsonmin: {
			dist: {
				options: {
					stripWhitespace: true,
					stripComments: true
				},
				files: [{
					expand: true,
					cwd: 'src/data',
					src: ['**/*.json'],
					dest: 'dist/data',
					ext: '.json'
				}]
			}
		},
		testacular: {
			unit: {
				options: {
					configFile: 'test/testacular.conf.js',
					autoWatch: true,
					keepalive: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-jsonmin');
	grunt.loadNpmTasks('grunt-rev');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-testacular');

	grunt.registerTask('test', ['testacular']);
	grunt.registerTask('dataupdate', ['jsonmin:dist']);
	grunt.registerTask('build', ['clean:dist', 'useminPrepare', 'imagemin', 'concat', 'cssmin', 'uglify', 'copy:dist', 'rev', 'usemin']);
	grunt.registerTask('default', ['build']);
};