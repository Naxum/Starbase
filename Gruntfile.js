module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			dist: {
				src: [
					'node_modules/*/dist/*.min.js',
					'js/*.js'
				],
				dest: 'build/js/production.js'
			}
		},
		uglify: {
			build: {
				src: 'build/js/production.js',
				dest: 'build/js/production.min.js'
			}
		},
		cssmin: {
			minify: {
				src: 'build/css/production.prefixed.css',
				dest: 'build/css/production.min.css'
			}
		},
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'build/images/'
				}] 
			}
		},
		watch: {
			options: {
				livereload: true,
				atBegin: true
			},
			scripts: {
				files: ['js/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false
				}
			},
			images: {
				files: ['images/**/*.{png,jpg,gif}'],
				tasks: ['imagemin']
			},
			css: {
				files: ['css/*.scss'],
				tasks: ['sass', 'autoprefixer', 'cssmin'],
				options: { 
					spawn: false
				}
			}
		},
		sass: {
			dist: {
				// options: {
				// 	style: 'compressed'
				// },
				files: {
					'build/css/production.css': 'css/*.scss'
				}
			}
		},
		autoprefixer: {
			dist: {
				files: {
					'build/css/production.prefixed.css': 'build/css/production.css'
				}
			}
		}
		//achievements, objectives, impediments
		//schedule
	});
	
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	
	grunt.registerTask('default', ['watch']);
}