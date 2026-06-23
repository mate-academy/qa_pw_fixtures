import { test as usersTest } from './fixtures';

import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

export const test = usersTest.extend({
  createArticlePage: async ({ page }, use) => {
    await use(new CreateArticlePage(page));
  },

  viewArticlePage: async ({ page }, use) => {
    await use(new ViewArticlePage(page));
  },

  editArticlePage: async ({ page }, use) => {
    await use(new EditArticlePage(page));
  },

  articleWithoutTags: async ({}, use) => {
    await use(
      generateNewArticleData({
        tags: [],
      }),
    );
  },

  articleWithOneTag: async ({}, use) => {
    await use(
      generateNewArticleData({
        tags: ['tag1'],
      }),
    );
  },

  articleWithTwoTags: async ({}, use) => {
    await use(
      generateNewArticleData({
        tags: ['tag1', 'tag2'],
      }),
    );
  },
});

export { expect } from '@playwright/test';