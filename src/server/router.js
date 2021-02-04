const path = require('path');

const HttpRouter = require('./lib/HttpRouter');
const {sendFile, sendJSON} = require('./lib/responseHelpers');
const config = require('./config/config');
const API_PREFIX = '/api/v1';

const router = new HttpRouter();

router.set(
  '/', {
    method: HttpRouter.METHOD_GET,
    isExact: true
  }, async (req, res) => {
  const pathToFile = path.join(config.publicFolder, '/index.html');
  await sendFile(req, res, pathToFile);
});

router.set(
  `${API_PREFIX}/data`,
  {
    method: HttpRouter.METHOD_GET,
    isExact: true
  },
  async (req, res) => {
  const data = [{key: 'value'}];
  const body = JSON.stringify(data);

  sendJSON(res, body);
});

module.exports = router;
