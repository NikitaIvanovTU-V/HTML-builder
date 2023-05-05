const fsPromises = require('fs/promises');
const path = require('node:path'); 
exports.copyDir = async function copyDir(curFolder, folderToCopy, whereToCopy) {
  try {
    await fsPromises.mkdir(`${curFolder}/${whereToCopy}`, { recursive: true });
    const folder = await fsPromises.readdir(path.join(`${curFolder}/${folderToCopy}`,), { withFileTypes: true });
    for (const file of folder) {
      if (file.isFile()) {
        await fsPromises.copyFile(`${curFolder}/${folderToCopy}/${file.name}`,
          `${curFolder}/${whereToCopy}/${file.name}`);
      } else if (file.isDirectory()) {
        copyDir(curFolder, `${folderToCopy}/${file.name}`, `${whereToCopy}/${file.name}`);
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}