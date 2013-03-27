var Stream = require('stream');
var util = require('util');

function LoggingStream(logger) {
	Stream.call(this);
	this.logger = logger;
	this.readable = true;
	this.writable = true;
}

util.inherits(LoggingStream, Stream);

LoggingStream.prototype.write = function write(data) {
	this.emit('data', data);
	this.logger.log(data);
};

LoggingStream.prototype.end = function end(data) {
	if (data) {
		this.logger.log(data);
	}
	this.emit('end', data);
	this.emit('close');
};

module.exports = LoggingStream;
