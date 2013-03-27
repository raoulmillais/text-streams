var assert = require('assert');
var LoggingStream = require('../lib/loggingstream');

describe('LoggingStream', function () {

	it('should call log on data', function () {
		var testMsg = 'hello';
		var fakeLogger = {
			log: function (msg) {
				assert.equal(msg, testMsg);
			}
		};
		var loggingStream = new LoggingStream(fakeLogger);

		loggingStream.write(testMsg);
	});

	it('should call log on end', function () {
		var testEndMsg = 'testEndMessage';
		var fakeLogger = {
			log: function (msg) {
				assert.equal(msg, testEndMsg);
			}
		};
		var loggingStream = new LoggingStream(fakeLogger);

		loggingStream.end(testEndMsg);
	});

	it('should not call log on end when no data', function () {
		var slice = Array.prototype.slice;
		var logCalls = [];
		var fakeLogger = {
			log: function () {
				logCalls = slice.call(arguments);
			}
		};
		var loggingStream = new LoggingStream(fakeLogger);

		loggingStream.end();
		assert.equal(logCalls.length, 0, 'log was called');
	});

	it('should pass through data events', function (done) {
		var fakeLogger = {
			log: function () {}
		};

		var loggingStream = new LoggingStream(fakeLogger);

		var testMsg = 'testMsg';
		loggingStream.on('data', function (msg) {
			assert.equal(msg, testMsg);
			done();
		});

		process.nextTick(function () {
			loggingStream.write(testMsg);
		});
	});

	it('should pass through end event', function (done) {
		var fakeLogger = {
			log: function () {}
		};

		var loggingStream = new LoggingStream(fakeLogger);

		var testMsg = 'testMsg';
		loggingStream.on('end', function (msg) {
			assert.equal(msg, testMsg);
			done();
		});

		process.nextTick(function () {
			loggingStream.end(testMsg);
		});
	});

	it('should close', function (done) {
		var fakeLogger = {
			log: function () {}
		};

		var loggingStream = new LoggingStream(fakeLogger);

		loggingStream.on('close', function () {
			done();
		});

		process.nextTick(function () {
			loggingStream.end();
		});
	
	});
});
