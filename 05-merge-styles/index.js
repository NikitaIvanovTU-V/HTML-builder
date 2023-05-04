const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('node:path'); 

const curFolder = '05-merge-styles';

async function mergeStyles() {
  try {
    const folder = await fsPromises.readdir(path.join(`${curFolder}/styles`),
    {withFileTypes: true});
    const bundle = fs.createWriteStream(`${curFolder}/project-dist/bundle.css`)
    for (const file of folder) {
      if(file.isFile() && path.extname(file.name) === '.css') {
        const readFile = fs.createReadStream(`${curFolder}/styles/${file.name}`);
        readFile.pipe(bundle); 
      }
    }

  } catch (err) {
    console.error(err.message);
  }
}
mergeStyles();