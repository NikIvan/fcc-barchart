const {readFile} = require('./fileSystem');

function sendJSON(res, data) {
  const body = JSON.stringify((data))

  res
    .writeHead(200, {
      'Content-Type': 'application/json',
      'Content-Length': body.length,
    })
    .end(body);
}

async function sendFile(req, res, pathToFile) {
  try {
    const {readStream, stats, mimetype} = await readFile(pathToFile);

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
  sendJSON,
  sendFile,
};


