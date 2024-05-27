/*

setImmediate is executed after the current synchronous code but
before the next I/O phase. It is part of the microtasks queue

if we run the following script which is not within an I/O cycle 
(i.e. the main module), the order in which the two timers are executed is non-deterministic, 
as it is bound by the performance of the process:
*/
const fs = require('node:fs');
console.log('non-deterministic');
setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});

/*
However, if you move the two calls within an I/O cycle, 
the immediate callback is always executed first:
*/

fs.readFile(__filename, () => {
  console.log('immediate is executed first');
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});