/*
 *
 * Copyright (c) 2013 Maxime Mezrahi
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['test/tmp/docs', 'test/tests/test-doc/docs', 'test/tests/test-doc2/docs', 'test/tmp/indexdocs']
    },

    // Configuration to be run (and then tested).
    docs: {
      // Create one doc for each component
      compile1: {
        name: "Grunt Test <%= 'Title' %>",
        description: 'Grunt Test Description for <%= pkg.name %>',
        version: '1.0',
        url: 'http://www.test.com',
        options: {
          outdir: "docs",
          indexdir: "test/tmp/indexdocs",
          indextheme: "themes/simpleIndex"
        },
        files: [{expand: true, flatten: true, cwd: "test/tests", src: "*", dest: "test/tests"}]
      },
      // Create a common doc for all the components
      compile2: {
        name: "Grunt Test <%= 'Title' %>",
        description: 'Grunt Test Description for <%= pkg.name %>',
        version: '1.0',
        url: 'http://www.test.com',
        options: {
          outdir: "../docs"
        },
        files: [{expand: true, flatten: true, cwd: "test/tests", src: "*", dest: "test/tmp"}]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'docs', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);
};