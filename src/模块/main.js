// main.js
const mod = require('./lib');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3
mod.counter++;
console.log(mod.counter); // 4
