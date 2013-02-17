var assert = require('assert');
var Stream = require('stream');
var LineStream = require('../lib/linestream');

describe('LineStream', function () {

	it('should be a duplex stream', function () {
		var stream = new LineStream();
		assert.ok(stream.pipe, 'stream did not have pipe');
		assert.equal(stream.readable, true, 'stream was not readable');
		assert.equal(stream.writable, true, 'stream was not writable');
	});

	it('should split data events with multiple lines', function (done) {
		var stream = new LineStream();
		var dataEvents = [];

		process.nextTick(function () {
			stream.write('hello\nworld');
		});
		process.nextTick(function () {
			stream.end('!');
		});

		stream.on('data', function (data) {
			dataEvents.push(data);
		});

		stream.on('end', function () {
			assert.equal(dataEvents.length, 2, 'did not 2 data events');
			assert.equal(dataEvents[0], 'hello\n');
			assert.equal(dataEvents[1], 'world!');
			done();
		});
	});

	it('should accumulate data events until a line break', function (done) {
		var stream = new LineStream();
		var dataEvents = [];

		process.nextTick(function () {
			stream.write('hello world ');
		});

		process.nextTick(function () {
			stream.write('from tests\n');
		});

		process.nextTick(function () {
			stream.write('another line\n');
		});

		process.nextTick(function () {
			stream.end();
		});

		stream.on('data', function (data) {
			dataEvents.push(data);
		});

		stream.on('end', function () {
			assert.equal(dataEvents.length, 2, 'did not emit 2 data events');
			assert.equal(dataEvents[0], 'hello world from tests\n');
			assert.equal(dataEvents[1], 'another line\n');
			done();
		});
	});
});
