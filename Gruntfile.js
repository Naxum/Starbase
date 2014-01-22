$scale = 5;

module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			libs: {
				src: [
					'node_modules/*/dist/jquery.min.js',
					'dev/js-libs/**/*.js',
					'build/js/templates.js'
				],
				dest: 'build/js/build.libs.js'
			},
			main: {
				src: ['dev/js/**/*.js'],
				dest: 'build/js/build.custom.js'
			},
			css: {
				src: ['build/css/temp/**/*.css'],
				dest: 'build/css/build.css'
			},
			combine: {
				/*src: ['build/js/build.libs.js','build/js/build.custom.min.js'],*/
				src: ['build/js/build.libs.js','build/js/build.custom.js'],
				dest: 'build/js/production.min.js'
			}
		},	
		uglify: {
			build: {
				src: 'build/js/build.custom.js',
				dest: 'build/js/build.custom.min.js'
			}
		},
		cssmin: {
			minify: {
				src: 'build/css/build.prefixed.css',
				dest: 'build/css/production.min.css'
			}
		},
		imagemin: {
			base: {
				files: [{
					expand: true,
					cwd: 'dev/images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'build/images/'
				}] 
			},
			upscaled: {
				files: [{
					expand: true,
					cwd: 'build/images/',
					src: ['**/*-upscaled.{png,gif,jpg}'],
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
				files: ['dev/js/**/*.{js,handlebars,hbs}'],
				tasks: ['concat:libs','concat:main', 'uglify','concat:combine'],
				options: {
					spawn: false
				}
			},
			images: {
				files: ['dev/images/**/*.{png,jpg,gif}'],
				tasks: ['imagemin:base', 'responsive_images', 'imagemin:upscaled'],
				options: {
					spawn: false
				}
			},
			css: {
				files: ['dev/css/**/*.scss'],
				tasks: ['sass', 'concat:css', 'autoprefixer', 'cssmin'],
				options: { 
					spawn: false
				}
			},
			html: {
				files: ['dev/**/*.html'],
				tasks: ['copy'],
				options: {
					spawn: false
				}
			}
		},
		sass: {
			target: {
				expand:true,
				cwd: 'dev/css/',
				src:['**/*.scss'],
				dest:'build/css/temp',
				ext: '.css'
			}
		},
		autoprefixer: {
			dist: {
				files: {
					'build/css/build.prefixed.css': 'build/css/build.css'
				}
			}
		},
		copy: {
			target: {
				expand: true,
				cwd: 'dev/',
				src:  ['**/*.html'],
				dest: 'build/'
			}
		},
		responsive_images: {
			options: {
				sizes: [{
					name: "upscaled",
					width: $scale+"00%",
					height: $scale+"00%",
					upscale: true,
					filter: 'Point'
				}]
			},
			files: {
				expand: true,
				src: ["**/*.{png,gif,jpg}"],
				cwd: 'dev/images/',
				dest: 'build/images/'
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-responsive-images');
	
	//could add custom tasks for concat here!
	grunt.registerTask('default', ['watch']);
}