var assert = require('assert');
var Stream = require('stream');
var AccumulatingStream = require('../lib/accumulatingstream');

describe('AccumulatingStream', function() {

	it('should be a duplex stream', function () {
		var stream = new AccumulatingStream();
		assert.ok(stream.pipe, 'stream did not have pipe');
		assert.equal(stream.readable, true, 'stream was not readable');
		assert.equal(stream.writable, true, 'stream was not writable');
	});

	it('should collect all the data written', function (done) {
		var stream = new AccumulatingStream();

		process.nextTick(function () {
			stream.write('hello ');
		});
		
		process.nextTick(function () {
			stream.write('world');
		});

		process.nextTick(function () {
			stream.end('!');
		});

		stream.on('data', function (data) {
			assert.equal(data, 'hello world!', 'did not collect all data');
		});

		stream.on('end', function () {
			done();
		});
	});

});
