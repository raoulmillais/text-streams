var Stream = require('stream');
var util = require('util');

function ReadableStream(dataToEmit) {
	Stream.call(this);
	this.readable = true;
}

util.inherits(ReadableStream, Stream);

module.exports = ReadableStream;
