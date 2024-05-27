/*

nextTick is executed immediately after the current operation completes and before
the next event loop tick starts

Why use process.nextTick()?
There are two main reasons: 

Allow users to handle errors, cleanup any then unneeded resources, 
or perhaps try the request again before the event loop continues.

At times it's necessary to allow a callback to run after 
the call stack has unwound but before the event loop continues.
*/

function badImplementation() {
  let bar;
  // this has an asynchronous signature, but calls callback synchronously
  function someAsyncApiCall(callback) {
    callback();
  }
  // the callback is called before `someAsyncApiCall` completes.
  someAsyncApiCall(() => {
    // since someAsyncApiCall hasn't completed, bar hasn't been assigned any value
    console.log('bar', bar); // undefined
  });
  bar = 1;
}

function correctImplementation() {
  let bar;

  function someAsyncApiCall(callback) {
    process.nextTick(callback);
  }

  someAsyncApiCall(() => {
    console.log('bar', bar); // 1
  });

  bar = 1;
}

badImplementation();
correctImplementation();

function badImplementation2() {
  const EventEmitter = require('node:events');
  class MyEmitter extends EventEmitter {
    constructor() {
      super();
      this.emit('event');
    }
  }
  const myEmitter = new MyEmitter();
  myEmitter.on('event', () => {
    console.log('an event occurred!');
  });
}

function correctImplementation2() {
  const EventEmitter = require('node:events');
  class MyEmitter extends EventEmitter {
    constructor() {
      super();
      // use nextTick to emit the event once a handler is assigned
      process.nextTick(() => {
        this.emit('event');
      });
    }
  }
  const myEmitter = new MyEmitter();
  myEmitter.on('event', () => {
    console.log('an event occurred!');
  });
}

badImplementation2();
correctImplementation2();