import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { fileURLToPath } from 'node:url';

const functionsDir = fileURLToPath(new URL('../functions/', import.meta.url));
const framework = fileURLToPath(new URL('../functions/node_modules/@google-cloud/functions-framework/build/src/main.js', import.meta.url));
const cases = [['sixpackCalendarBegin', 401], ['sixpackCalendarDisconnect', 401], ['sixpackCalendarCallback', 400]];
for (let index = 0; index < cases.length; index++) {
  const [target, expected] = cases[index];
  const port = 18091 + index;
  let logs = '';
  const child = spawn(process.execPath, [framework, `--target=${target}`, `--port=${port}`], {
    cwd: functionsDir,
    env: { ...process.env, GCLOUD_PROJECT: 'demo-sixpack', FIREBASE_CONFIG: '{"projectId":"demo-sixpack"}', SIXPACK_CALENDAR_CLIENT_ID: 'mock-client', SIXPACK_CALENDAR_CLIENT_SECRET: 'mock-secret' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  child.stdout.on('data', data => { logs += data; });
  child.stderr.on('data', data => { logs += data; });
  const exited = once(child, 'exit');
  try {
    let response;
    for (let attempt = 0; attempt < 150; attempt++) {
      if (child.exitCode !== null) throw new Error(`Functions Framework exited during startup: ${logs}`);
      try {
        response = await fetch(`http://127.0.0.1:${port}/`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"data":{}}', signal: AbortSignal.timeout(1500),
        });
        break;
      } catch { await new Promise(resolve => setTimeout(resolve, 100)); }
    }
    assert(response, `Functions Framework did not start: ${logs}`);
    assert.equal(response.status, expected, `${target}: startup and unauthenticated request guard`);
  } finally {
    child.kill('SIGTERM');
    await exited;
  }
}
console.log('Functions Framework: production runtime boots; Begin/Disconnect reject anonymous requests and Callback rejects missing OAuth state.');
