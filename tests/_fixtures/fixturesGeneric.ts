import { test as base } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

export const test = base.extend<
  {
    user: any;
    infoTestLog: any;
  },
  {
    logger: any;
  }
>({
  user: async ({ logger }, use) => {
    const user = generateNewUserData(logger);

    await use(user);
  },
  //here we change the levels of logging for the tests, so we can see the logs in the console (info, error, warn, debug)
  logger: [
    async ({}, use) => {
      const logger = new Logger('error');

      await use(logger);
    },
    { scope: 'worker' },
  ],
  infoTestLog: [
    async ({ logger }, use, testInfo) => {
      const indexOfTestSubfolderStart = testInfo.file.indexOf('/tests') + 7;
      const fileName = testInfo.file.substring(indexOfTestSubfolderStart);

      logger.info(`Test started: ${fileName}`);

      await use('infoTestLog');

      logger.info(`Test completed: ${fileName}`);
    },
    { scope: 'test', auto: true },
  ],
});
