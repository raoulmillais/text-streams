Text Streams
============

Some duplex streams to help working with raw text streams.  Note these streams
use the node `<=0.8` stream API.

Accumulating Stream
-------------------

A stream that when piped to accumulates all the data receives and emits a single
data event with the accumulated data.

Line Stream
-----------

A stream that emits exactly one data event for each line of text received,
whether those lines span multiple data events on the underlying readable stream
or multiple lines are in one data event.
