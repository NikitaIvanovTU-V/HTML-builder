const fsPromises = require('fs/promises');
const path = require('node:path'); 

const curFolder = '04-copy-directory';
exports.copyDir = async function copyDir(curFolder,folderToCopy,whereToCopy) {
  try {
    await fsPromises.mkdir(`${curFolder}/${whereToCopy}`,{ recursive: true });
    const folder = await fsPromises.readdir(path.join(`${curFolder}/${folderToCopy}`));
    for (const file of folder) {
      await fsPromises.copyFile(`${curFolder}/${folderToCopy}/${file}`,
      `${curFolder}/${whereToCopy}/${file}`);
    }
  } catch (err) {
    console.error(err.message);
  }
}
exports.copyDir(curFolder,'files','files-copy');