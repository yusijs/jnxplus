import { ExecutorContext, logger } from '@nrwl/devkit';
import { getProjectPath, runCommand } from '../../utils/command';
import { BuildExecutorSchema } from './schema';

export default async function runExecutor(
  options: BuildExecutorSchema,
  context: ExecutorContext
) {
  logger.info(`Executor ran for Build: ${options}`);
  const command = `${getProjectPath(context)}:${context.targetName}`;
  return runCommand(command);
}
