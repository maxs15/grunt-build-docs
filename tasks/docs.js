/* 
 *
 * Copyright (c) 2013 Maxime Mezrahi
 * Licensed under the MIT license.
 */


'use strict';

module.exports = function(grunt) {

	var Y = require('yuidocjs');

	var createDoc = function(options, component, doneCallback) {

		var json;

		grunt.log.writeln("Compiling " + component.src.toString() + " to " + component.dest);
		options.outdir = component.dest;

		// ensure destination dir is available
		grunt.file.mkdir(options.outdir);

		options.paths = component.src;

		json = (new Y.YUIDoc(options)).run();

		options = Y.Project.mix(json, options);

		if (!options.parseOnly) {
			var builder = new Y.DocBuilder(options, json);
			builder.compile(doneCallback);
		}
	};

	var createIndexDoc = function(components, docPath, themePath, project) {
		var fs = require("fs");
		var ejs = require("ejs");
		var path = require('path');
		var wrench = require('wrench');
		var mod_path;

		try{
			mod_path = path.dirname(require.resolve('grunt-build-docs')) + "/";
		} catch(e) {
			mod_path = "";
		}
		var data = fs.readFileSync(mod_path + themePath + '/layouts/main.ejs', 'utf8');
		var content = ejs.render(data, {htmlTitle: "Index", components: components, project: project});

		wrench.copyDirSyncRecursive(mod_path + themePath, docPath);
		wrench.rmdirSyncRecursive(docPath + "/layouts", true);
		grunt.file.write(docPath + "/index.html", content);
	};

	grunt.registerMultiTask('docs', 'Create the docs, only a component if specified.\nExample: docs:componentName', function() {

		var target = grunt.option("target");

		var path = require("path");
		var options = this.options({quiet: true});
		var components = [];
		var done = this.async();
		var starttime = (new Date()).getTime();
		var kindOf = grunt.util.kindOf;
		var cpt = 0;

		// process project data templates
		var projectData = {};
		grunt.util._.each(this.data, function(value, key) {
			if (kindOf(value) === 'string') {
				projectData[key] = value;
			}
		});

		options.project = projectData;

		grunt.verbose.writeflags(options, 'Options');

		grunt.log.writeln('Starting compilation...');

		var mergeComponent = function(component) {
			for (var i=0;i<components.length;i++)
			{
				if (components[i].dest === component.dest)
				{
					return components[i].src.push(component.src[0]);
				}
			}
			components.push(component);
		};

		this.files.forEach(function(f) {

			var componentName = path.basename(f.src[0]);
			if (!options.outdir) { options.outdir = ""; }
			var dest = path.normalize(f.dest + "/" + options.outdir);
			var component = {name: componentName, src: f.src, dest: dest};
			if (options.indexdir) {
				component.relativepath = path.relative(options.indexdir, "") + "/" + component.dest;
			}
			if (!target || componentName === target) {
				mergeComponent(component);
			}
		});

		if (!components.length)
		{
			grunt.log.error("No source directories found");
		}

		var docFinished = function() {
			++cpt;
			if (cpt >= components.length)
			{
				var endtime = (new Date()).getTime();
				grunt.log.writeln('Docs compile completed in ' + ((endtime - starttime) / 1000) + ' seconds');
				done();
			}
		};

		var startCreation = function() {
			for (var i=0; i<components.length;i++)
			{
				createDoc(options, components[i], docFinished);
			}
		};

		// Create the index.html than links all the documentions if specified
		if (options.indexdir) {
			console.log("creating index..");
			if (!options.indextheme) {
				options.indextheme = "themes/simpleIndex";
			}
			createIndexDoc(components, options.indexdir, options.indextheme, options.project);
		}
		else {
			console.log("not creatring index..");
		}
		
		startCreation();

	});

};