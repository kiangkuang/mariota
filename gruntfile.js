module.exports = function(grunt) {

    grunt.initConfig({

    // Directories
    srcDir:{
        base: 'build',

        // Source build directory: Global
        jade: 'build/jade',
        sass: 'build/sass',
        js: 'build/js',
        image: 'build/images'
    },

    distDir:{
        base: 'public',

        // Destination public directory: Global
        view: 'public/views',
        css: 'public/css',
        js: 'public/js',
        image: 'public/images'
    },

    // Tasks & Configurations

    // Task no. 1: Jade
    jade: {
        compile: {
            options: {
                basedir: '<%= srcDir.jade %>',
                pretty: true,
                compileDebug: true,
                wrap: false
            },
            files: [{
                expand: true,
                cwd: '<%= srcDir.jade %>',
                src: ['**/*.jade'],
                dest: '<%= distDir.view %>',
                ext: '.html'
            }]
        }
    },

    // Task no. 2: HTMLmin
    htmlmin:{
        dist: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            files: {
                '<%= distDir.base %>/index.html': '<%= distDir.view %>/index.html',
            }
        },
    },

    // Task no. 3: Sass
    sass:{
        options:{
            style: 'compressed', // Sass file style
            update: true // Only compile changed files
        },
        dist:{
            files:[{
                expand: true,
                cwd: '<%= srcDir.sass %>',
                src: '**/*.{sass,scss}',
                dest: '<%= distDir.css %>',
                ext:'.css'
            }]
        },
    },

    // Task no. 4: Uglify
    uglify:{
        options:{
            mangle: false, // Avoid functions - variables rename
            preserveComments: /(?:^!|@(?:license|preserve|cc_on))/
            // Preserve all comments that start with a bang (!)
        },
        dist:{
            files:[{
                '<%= distDir.js %>/script.min.js': [
                    '<%= srcDir.js %>/libs/**/*.js',
                    '<%= srcDir.js %>/script.js'
                ],
                '<%= distDir.js %>/service-worker.min.js': '<%= srcDir.js %>/service-worker.js'
            }]
        },
    },

    // Task no. 5: Image
    image:{
        dynamic:{
            files:[{
                expand: true,
                cwd: '<%= srcDir.image %>',
                src: ['**/*.{png,jpg,gif,svg}'],
                dest: '<%= distDir.image %>'
            }]
        },
    },

    // Task no. 6: Copy files
    copy:{
        main:{
            files:[{
                expand: true,
                cwd: '<%= srcDir.base %>',
                src: ['manifest.json'],
                dest: '<%= distDir.base %>'
            }]
        },
    },

    // Task no. 7: Watch
    watch:{
        options:{
            spawn: false,
            livereload: true
        },
        jade: {
            files: '<%= srcDir.jade %>/**/*.jade',
            tasks: ['jade', 'htmlmin']
        },
        sass: {
            files: '<%= srcDir.sass %>/**/*.{scss,sass}',
            tasks: ['sass']
        },
        js: {
            files: '<%= srcDir.js %>/**/*.js',
            tasks: ['uglify']
        },
    },

    });

    // Combined Tasks

    // Build
    grunt.registerTask('build',['jade', 'htmlmin', 'sass', 'uglify', 'image', 'copy']);

    // Default
    grunt.registerTask('default',['watch']);

    // Depenent plugins
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-image');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

};
