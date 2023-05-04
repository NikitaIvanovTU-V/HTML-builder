const fsPromises = require('fs/promises');
const path = require('node:path'); 

async function filesInFolder(folderName){
  try {
    const folder = await fsPromises.readdir(path.join(folderName),{withFileTypes: true});
    for (const file of folder) {
      if (file.isFile()) {
        console.log(file);
      } else if (file.isDirectory()) {
       filesInFolder(`${folderName}/${file.name}`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}
filesInFolder('secret-folder');