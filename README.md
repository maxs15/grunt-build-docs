# grunt-build-docs

> Generate the documentation of your projects using YUIDOC


## Getting Started
If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-build-docs --save-dev
```

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md


## docs task
_Run this task with the `grunt docs` command._

_This task is a [multi task][] so any targets, files and options should be specified according to the [multi task][] documentation._
[multi task]: https://github.com/gruntjs/grunt/wiki/Configuring-tasks


This plugin is compatible with grunt 0.4.0rc7

### Options

Settings mirror [YUIDoc config](http://yui.github.com/yuidoc/args/index.html).


### Usage examples


First possibility: Create a documentation for each directory
```js
docs: {
    compile: {
        name: "Example",
        description: 'Example Description',
        version: '1.0',
        url: 'http://www.example.com',
        options: {
          outdir: "docs" // path or name of the documentation directory
        },
        files: [{expand: true, flatten: true, cwd: "test/tests", src: "*", dest: "test/tests"}]
    }
}
```

If you want to create a index page that list and link all the available documentations 
(Usefull if several parts of your project own a documentation)
```js
options: {
      indexdir: "test/tmp/indexdocs", // Path to the index page
      indextheme: "themes/simpleIndex" // Optional, if you want to use a custom theme
}
```

Second possibility: Create commun documentation

```js
docs: {
    compile: {
        name: "Example",
        description: 'Example Description',
        version: '1.0',
        url: 'http://www.example.com',
        options: {
          outdir: "../docs"
        },
        files: [{expand: true, flatten: true, cwd: "test/tests", src: "*", dest: "test/tmp"}]
    }
}
```

All these examples are tested in the plugin, you can see how it works by runnning "grunt test" inside the plugin.



## Release History

* 2013-02-25   v0.4.0rc7   Creation of the plugin, compatible with grunt rc7
