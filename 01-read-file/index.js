const fs = require('fs');
const path = require('node:path'); 
const istream = fs.createReadStream(path.join('text.txt'),'utf-8');
istream.on('data',(data) => { 
  console.log(data);
});
