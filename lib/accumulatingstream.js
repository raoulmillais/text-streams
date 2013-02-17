var Stream = require('stream');
var util = require('util');

function AccumulatingStream() {
	Stream.call(this);
	this.writable = true;
	this.readable = true;
	this.dataBuffer = '';
}

util.inherits(AccumulatingStream, Stream);

AccumulatingStream.prototype.write = function write(data) {
	if (data) {
		this.dataBuffer += data;
	}
};

AccumulatingStream.prototype.end = function end(data) {
	if (data) {
		this.dataBuffer += data;
	}

	this.emit('data', this.dataBuffer);
	this.emit('end');
	this.emit('close');
};

AccumulatingStream.prototype.getData = function getData() {
	return this.dataBuffer;
};

module.exports = AccumulatingStream;
