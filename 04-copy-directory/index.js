const fsPromises = require('fs/promises');
const path = require('node:path'); 

const curFolder = '04-copy-directory';
async function copyDir() {
  try {
    await fsPromises.mkdir(`${curFolder}/files-copy`,{ recursive: true });
    const folder = await fsPromises.readdir(path.join(`${curFolder}/files`));
    for (const file of folder) {
      await fsPromises.copyFile(`${curFolder}/files/${file}`,
      `${curFolder}/files-copy/${file}`);
    }
  } catch (err) {
    console.error(err.message);
  }
}
copyDir();