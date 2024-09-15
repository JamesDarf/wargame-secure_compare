const compare = require('secure-compare');

console.log(compare('password', 'pass'))
console.log(compare('password', 'password'))
console.log(compare('password', 'qwerasdf'))