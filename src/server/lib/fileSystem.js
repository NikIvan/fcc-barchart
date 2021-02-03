const fs = require('fs');
const util = require('util');
const path = require('path');
const childProcess = require('child_process');
const execFile = util.promisify(childProcess.execFile);
const config = require('../config/config');

async function readFile(pathToFile) {
  let getMimetypeResult = null;
  let stats = null;
  let mimetype = '';

  try {
    [getMimetypeResult, stats] = await Promise.all([
      execFile('file', ['-b','--mime-type', pathToFile]),
      fs.promises.stat(pathToFile),
    ]);
  } catch (err) {
    console.dir({err});
    if (err.code === 'ENOENT') {
      console.log('Cannot find requested file');
    } else {
      throw new Error(err);
    }
  }

  if (stats == null) {
    return null;
  }

  if (getMimetypeResult) {
    mimetype = getMimetypeResult.stdout.replace(/\n/, '');
  }

  return {
    readStream: fs.createReadStream(pathToFile),
    stats,
    mimetype,
  };
}

async function findStaticFile(input) {
  // TODO: sanitize input
  let pathToFile = path.join(config.publicFolder, input);
  let stats = await fs.promises.stat(pathToFile);

  if (stats && stats.isFile()) {
    return {
      pathToFile,
      stats,
    };
  }
}

async function sendFile(req, res, pathToFile) {
  try {
    const {readStream, stats, mimetype} = await readFile(pathToFile);
    console.dir({stats, mimetype});

    res.writeHead(200, {
      'Content-Type': mimetype,
      'Content-Length': stats.size,
    });

    readStream.pipe(res);
  } catch (err) {
    console.error(`Error while trying to send file ${pathToFile}: ${err}`);
  }
}

module.exports = {
  readFile,
  findStaticFile,
  sendFile,
}
