const process = require('process');
const cp = require('child_process');
const path = require('path');


// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_K8SDEPLOY-KEY'] = 'dummy-key';
  process.env['INPUT_K8SDEPLOY-SECRET'] = 'dummy-secret';
  process.env['INPUT_K8SDEPLOY-ID'] = 'dummy-id';

  const f = path.join(__dirname, 'index.js');
  const result = cp.execSync(`node ${f}`, {env: process.env}).toString();

  console.log(result);
})
