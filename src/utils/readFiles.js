const fs = require('fs');
const path = require('path');

function readFilesInDirectory(directory) {
  const files = fs.readdirSync(directory);
  return files.map((file) => path.join(directory, file));
}

module.exports = readFilesInDirectory;
