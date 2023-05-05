const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('node:path');
const merge = require('../05-merge-styles/index');
const curFolder = '06-build-page';

async function buildPage() {
  try {
    await fsPromises.mkdir(path.join(`${curFolder}/project-dist`), { recursive: true });
    function fileToString(stream) {
      const chunks = [];
      return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (error) => reject(error));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString()));
      })
    };

    let templateData = await fileToString(fs.createReadStream(`${curFolder}/template.html`));
    const components = await fsPromises.readdir(path.join(`${curFolder}/components`));
    for (const file of components) {
      const fileData = await fileToString(fs.createReadStream(`${curFolder}/components/${file}`));
      templateData = templateData.replace(`{{${path.basename(file, '.html')}}}`, fileData);
    }
    const result = fs.createWriteStream(`${curFolder}/project-dist/index.html`);
    result.write(templateData);
    merge.mergeStyles(curFolder,'/project-dist/style.css');
  } catch (err) {
    console.error(err.message);
  }
}
buildPage();