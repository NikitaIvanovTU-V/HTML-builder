const fsPromises = require('fs/promises');
const path = require('node:path'); 
const curFolder = '04-copy-directory';
const { copyDir } = require('../04-copy-directory/copyDir');
copyDir(curFolder,'files','files-copy');

