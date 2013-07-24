/*global module:false*/
module.exports = function (grunt) {
    'use strict';

    var pkgConfig = {
        app: 'tabbed',
        src: 'src',
        dist: 'dist'
    };

    // configurable paths
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: pkgConfig,
        watch: {
            livereload: {
                files: [
                    '<%= config.src %>}/{,*/}*.less',
                    '<%= config.src %>}/{,*/}*.js'
                ],
                tasks: ['livereload']
            }
        },
        regarde: {
            js: {
                files: ['<%= config.src %>/**/*.js'],
                tasks: ['jshint'],
                spawn: true
            },
            css: {
                files: '<%= config.src %>/**/*.less',
                tasks: ['less:dist', 'autoprefixer:dist'],
                spawn: true
            }
        },
        clean: [
            '<%= config.dist %>/*'
        ],
        jshint: {
            all: [
                'Gruntfile.js',
                '<%= config.app %>/src/{,*/}*.js'
            ]
        },
        uglify: {
            options: {
                banner:
                    '/*! Hatchd Digital, <%= pkg.name %> - v<%= pkg.version %> - ' +
                    ' <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    ' <%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>; \n' +
                    ' */'
            },
            dist: {
                files: {
                    '<%= config.dist %>/<%= config.app %>.min.js': ['<%= config.src %>/*.js']
                }
            }
        },
        less: {
            dist: {
                options: {
                    paths: ['<%= config.src %>'],
                    yuicompress: true
                },
                files: {
                    '<%= config.dist %>/<%= config.app %>.css': '<%= config.src %>/*.less'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 3 versions', '> 1%', 'ie 8', 'ie 7']
            },
            dist: {
                files: {
                    '<%= config.dist %>/<%= config.app %>.css': '<%= config.dist %>/<%= config.app %>.css'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-regarde');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Simply watch script which does a build on entry
    grunt.registerTask('watch', [
        'default',
        'regarde'
    ]);

    // Build dist version of latest code
    grunt.registerTask('default', [
        'clean',
        'jshint',
        'less:dist',
        'autoprefixer:dist',
        'uglify'
    ]);


};
