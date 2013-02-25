var grunt = require('grunt');

exports['docs'] = {
  main: function(test) {
    'use strict';

    var expect, result, data;
    test.expect(5);

    // Index documentation
    expect = true;
    result = grunt.file.exists('test/tmp/indexdocs/index.html');
    test.equal(result, expect, 'Should generate the template file index.html');

    expect = true;
    result = grunt.file.exists('test/tmp/docs/assets');
    test.equal(result, expect, 'Should copy the theme assets');

    // Individual documentations
    expect = true;
    result = grunt.file.exists('test/tests/test-doc/docs/index.html');
    test.equal(result, expect, 'Should create the documentation in test-doc');

    expect = true;
    result = grunt.file.exists('test/tests/test-doc2/docs/index.html');
    test.equal(result, expect, 'Should create the documentation in test-doc2');

    // Common documentation
    expect = true;
    result = grunt.file.exists('test/tmp/docs/index.html');
    test.equal(result, expect, 'Should create the common ducumentation');


    test.done();
  }
};
