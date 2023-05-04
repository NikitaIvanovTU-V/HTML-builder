const fs = require('fs');
const path = require('node:path'); 

const curFolder = '01-read-file';
const istream = fs.createReadStream(path.join(`${curFolder}/text.txt`),'utf-8');
istream.on('data',(data) => { 
  console.log(data);
});
