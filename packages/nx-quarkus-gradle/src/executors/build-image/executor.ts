import { ExecutorContext, logger, workspaceRoot } from '@nx/devkit';
import { getProjectRoot, runCommand } from '../../utils/command';
import { BuildImageExecutorSchema } from './schema';
import { join } from 'path';

export default async function runExecutor(
  options: BuildImageExecutorSchema,
  context: ExecutorContext
) {
  logger.info(`Executor ran for Build Image: ${JSON.stringify(options)}`);

  let imageNameSuffix = '';

  if (options.imageNameSuffix) {
    imageNameSuffix = `-${options.imageNameSuffix}`;
  } else {
    if (options.imageType === 'jvm') {
      imageNameSuffix = `-jvm`;
    }

    if (options.imageType === 'legacy-jar') {
      imageNameSuffix = `-legacy-jar`;
    }
  }

  const workDir = join(workspaceRoot, getProjectRoot(context));

  return runCommand(
    `docker build -f src/main/docker/Dockerfile.${options.imageType} -t ${options.imageNamePrefix}/${context.projectName}${imageNameSuffix} .`,
    workDir
  );
}
