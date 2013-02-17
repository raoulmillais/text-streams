var Stream = require('stream');
var util = require('util');

function LineStream() {
	Stream.call(this);
	this.readable = true;
	this.writable = true;
	this.lineBuffer = '';
}

util.inherits(LineStream, Stream);

LineStream.prototype.processData = function processData(data) {
	var indexOfNextNewLine = data.indexOf('\n');
	if (indexOfNextNewLine === -1) {
		this.lineBuffer += data;
		return;
	}

	var unconsumed = data;
	while (indexOfNextNewLine !== -1) {
		this.lineBuffer += unconsumed.substr(0, indexOfNextNewLine);
		unconsumed = unconsumed.substr(indexOfNextNewLine + 1);

		this.emit('data', this.lineBuffer + '\n');

		this.lineBuffer = '';
		indexOfNextNewLine = unconsumed.indexOf('\n');
	}

	this.lineBuffer += unconsumed;
};

LineStream.prototype.write = function write(data) {
	this.processData(data.toString());
	return true;
};

LineStream.prototype.end = function end(data) {
	if (data) {
		this.processData(data.toString());
	}
	if (this.lineBuffer !== '') {
		this.emit('data', this.lineBuffer);
	}

	this.emit('end');
	this.emit('close');
	return true;
};

module.exports = LineStream;
