module.exports = function(grunt){
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

// ================================================================================

grunt.initConfig({
        sass: {
            dist: {
                files: [{ 
                    expand: true,
                    cwd: 'css',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },

// ================================================================================

        watch: {
            files: ['css/*.scss'],
            tasks: ['css']
        },

// ================================================================================

        browserSync: {
            dev: {
                bsFiles: { //browser files
                    src: [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                         ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './' // Directorio base para nuestro servidor
         
                            }
                        }
            }  
        },

// ================================================================================

        imagemin: {
            dynamic: {
                files: [{ 
                    expand: true,
                    cwd: './',
                    src: 'img/*.{png,gif,jpg,jpeg}',
                    dest: 'dist/'
                }]    
            },  
        },

// ================================================================================

        copy: {
            html: {
                files: [{ 
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: '*.html}',
                    dest: 'dist/'
                }]    
            },  
        },

// ================================================================================

        clean:{
            build:{
                src:[dist/]
            }
        };

// ================================================================================

        cssmin:{
            dist:{}
        },
// ================================================================================

        uglify:{
            dist:{}
        },

// ================================================================================
       
        filerev:{
            options: {
                encoding:'utf8',
                algorithm: 'md5',
                lenght:20
            },
            
            release:{
                // filerev:release hashes(md5) all assets (images, js and css)
                // in dist directory
                files:[{
                    src:[
                        'dist/js/*.js',
                        'dist/css/*.css',
                    ]
                }]
            }

        },

// ================================================================================

        concat:{
            options:{
                separator:';'
            
                    },
            dist:{}
        },

// ================================================================================

        useminPrepare{
            foo: {
                dest:'dist',
                src: ['index.html', 'nosotros.html', 'contacto.html', 'precios.html']
            },
            options: {
                flow:{
                    steps:{
                        css:['cssmin'],
                        js:['uglify']
                    },
                    post:{
                        css:[{
                            name: 'cssmin',
                            createConfig: function(context, block) {
                                var generated =  context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0,
                                    rebase: false
                                }
                            }
                        }]
                    }
                }
            }
        },

// ================================================================================

        usemin:{
            html:['dist/index.html', 'dist/nosotros.html', 'dist/contacto.html', 'dist/precios.html'],
            options:{
                assetsDir:['dist', 'dist/css', 'dist/js']
            }
        }

});       
// ================================================================================

// ================================================================================
// ================================================================================

    //grunt.registerTask('default',['dev']);
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('img:compress', ['imagemin']);

};