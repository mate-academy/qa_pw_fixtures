// tests/_fixtures/fixturesArticles.ts
import { test as base, expect } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

export const test = base.extend({
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
    await use({
      title: 'Title ' + Date.now(),
      description: 'Description',
      body: 'Body',
      tags: [],
    });
  },

  articleWithOneTag: async ({}, use) => {
    await use({
      title: 'Title ' + Date.now(),
      description: 'Description',
      body: 'Body',
      tags: ['tag1'],
    });
  },

  articleWithTwoTags: async ({}, use) => {
    await use({
      title: 'Title ' + Date.now(),
      description: 'Description',
      body: 'Body',
      tags: ['tag1', 'tag2'],
    });
  },
});

export { expect };
