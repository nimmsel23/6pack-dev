// Run the retained Skills regressions against the integrated source.
import { spawnSync } from 'node:child_process';
const suites = ['tests/legal-pages.test.mjs', 'tests/progression.test.mjs', 'tests/navigation.test.mjs', 'tests/core-skills.test.mjs', 'tests/local.test.mjs', 'tests/store.test.mjs', 'tests/design-progress.test.mjs', 'scripts/test-exercise-videos.mjs', 'tests/exp.test.mjs', 'tests/runner.test.mjs', 'scripts/test-design-integration.mjs', 'scripts/test-runner-integration.mjs'];
for (const suite of suites) {
  const result = spawnSync(process.execPath, ['--experimental-test-module-mocks', `skills/${suite}`], { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}
