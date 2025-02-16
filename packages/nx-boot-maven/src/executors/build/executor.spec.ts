import { ExecutorContext } from '@nx/devkit';
import { runCommand } from '../../utils/command';
import executor from './executor';
import { BuildExecutorSchema } from './schema';
jest.mock('../../utils/command');

const options: BuildExecutorSchema = {
  mvnArgs: '--no-transfer-progress',
  skipClean: true,
};

const context: ExecutorContext = {
  root: '/root',
  cwd: '/root',
  projectName: 'my-app',
  targetName: 'build',
  workspace: {
    version: 2,
    projects: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'my-app': <any>{
        root: 'apps/wibble',
        sourceRoot: 'apps/wibble',
      },
    },
    npmScope: 'test',
  },
  isVerbose: false,
};

describe('Build Executor', () => {
  beforeEach(async () => {
    (runCommand as jest.Mock).mockReturnValue({ success: true });
  });

  xit('can run', async () => {
    const output = await executor(options, context);
    expect(output.success).toBe(true);
  });
});
