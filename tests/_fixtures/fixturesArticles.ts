import { test as base } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { Logger } from '../../src/common/logger/Logger';

// Define test-scoped fixtures
type TestFixtures = {
  createArticlePage: CreateArticlePage;
  editArticlePage: EditArticlePage;
  viewArticlePage: ViewArticlePage;
};

// Define worker-scoped fixtures
type WorkerFixtures = {
  logger: Logger;
};

// Extend base with correct types
export const test = base.extend<TestFixtures, WorkerFixtures>({
  logger: [
    async ({}, use) => {
      const logger = new Logger('error');
      await use(logger);
    },
    { scope: 'worker' },
  ],

  createArticlePage: async ({ page }, use) => {
    await use(new CreateArticlePage(page));
  },

  editArticlePage: async ({ page }, use) => {
    await use(new EditArticlePage(page));
  },

  viewArticlePage: async ({ page }, use) => {
    await use(new ViewArticlePage(page));
  },
});