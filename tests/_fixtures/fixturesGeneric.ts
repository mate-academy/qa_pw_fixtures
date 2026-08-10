import * as path from 'path';
import { test as base } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

type NewUserData = ReturnType<typeof generateNewUserData>;

export const test = base.extend<
  { user: NewUserData; infoTestLog: void },
  { logger: Logger }
>({
  user: async ({ logger }, use) => {
    const user = generateNewUserData(logger);

    await use(user);
  },
  logger: [
    async ({}, use) => {
      const logger = new Logger('debug');

      await use(logger);
    },
    { scope: 'worker' },
  ],
  infoTestLog: [
    async ({ logger }, use, testInfo) => {
      const fileName = path.relative(process.cwd(), testInfo.file);

      logger.info(`Test started: ${fileName}`);

      await use();

      logger.info(`Test completed: ${fileName}`);
    },
    { scope: 'test', auto: true },
  ],
});
