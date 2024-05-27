const fs = require('node:fs');

console.log('1. Start of event loop demonstration');

setTimeout(() => {
  console.log('3. setTimeout callback');
}, 0);

setImmediate(() => {
  console.log('4. setImmediate callback');
});

fs.readFile(__filename, () => {
  console.log('5. File read completed');
  
  setTimeout(() => {
    console.log('8. setTimeout callback inside I/O');
    console.log('9. End of event loop demonstration');
  }, 0);

  setImmediate(() => {
    console.log('7. setImmediate callback inside I/O');
  });

  process.nextTick(() => {
    console.log('6. process.nextTick inside I/O');
  });
});

process.nextTick(() => {
  console.log('2. process.nextTick outside I/O');
});


