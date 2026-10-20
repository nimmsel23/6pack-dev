import { execFileSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const tryGit = (...args) => {
  try { return git(...args); } catch { return ''; }
};
const readEvent = async () => {
  if (!process.env.GITHUB_EVENT_PATH) return null;
  try {
    return JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH, 'utf8'));
  } catch {
    return null;
  }
};

const event = await readEvent();
const sha = process.env.GITHUB_SHA || tryGit('rev-parse', 'HEAD') || `local-${Date.now()}`;
const repository = process.env.GITHUB_REPOSITORY
  ? `https://github.com/${process.env.GITHUB_REPOSITORY}`
  : (tryGit('remote', 'get-url', 'origin') || 'https://github.com/nimmsel23/6pack-dev')
      .replace(/^git@github\.com:/, 'https://github.com/')
      .replace(/\.git$/, '');
const pushedCommits = Array.isArray(event?.commits)
  ? event.commits.map((commit) => ({
      sha: commit.id,
      message: (commit.message || '').split('\n')[0],
    }))
  : [];
const commits = pushedCommits.length
  ? pushedCommits
  : [{ sha, message: tryGit('log', '-1', '--format=%s', sha) || '6Pack update' }];

await writeFile('public/release-info.json', `${JSON.stringify({
  id: sha,
  repository,
  commits,
}, null, 2)}\n`);
