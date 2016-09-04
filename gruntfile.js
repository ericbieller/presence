module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    env: {
      build: {
        NODE_ENV: 'production'
      }
    },

    browserify: {
      dev: {
        options: {
          debug: true,
          transform: ['reactify']
        },
        files: {
          'main.js': 'app/js/**/*.jsx'
        }
      },
      build: {
        options: {
          debug: false,
          transform: ['reactify']
        },
        files: {
          'main.js': 'app/js/**/*.jsx'
        }
      }
    },

    watch: {
      browserify: {
        files: ['app/js/**/*.js', 'app/js/**/*.jsx'],
        tasks: ['browserify:dev']
      },
      options: {
        nospawn: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-env');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['env:build', 'browserify:build']);
};