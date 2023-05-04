const fs = require('fs');
const path = require('node:path'); 
const readline = require('readline');

const curFolder = '02-write-file';

const rl = readline.createInterface({
  input: process.stdin,
});
const ws = fs.createWriteStream(path.join(`${curFolder}/write.txt`));

console.log('Привет, пиши:')
rl.on('line', (input) => {
  if (input === 'exit' || input === '\u0003') {
    process.exit();
  } else {
    ws.write(input);
  }
});

process.on('exit', () => {
  console.log('Пока пока, писать больше нельзя');
});

process.on('SIGINT', function() {
  process.exit();
});