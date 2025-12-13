import { test as base, expect } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

export type ArticleData = {
  title: string;
  description: string;
  text: string;
  tags?: string[];
};

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
    const article: ArticleData = generateNewArticleData({ tags: [] });
    await use(article);
  },

  articleWithOneTag: async ({}, use) => {
    const article: ArticleData = generateNewArticleData({ tags: ['tag1'] });
    await use(article);
  },

  articleWithTwoTags: async ({}, use) => {
    const article: ArticleData = generateNewArticleData({
      tags: ['tag1', 'tag2'],
    });
    await use(article);
  },
});

export { expect };
