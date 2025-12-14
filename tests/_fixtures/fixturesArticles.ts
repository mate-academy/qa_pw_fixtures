import { test as base } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { Logger } from './logger'; // upewnij się, że masz fixture logger

export type ArticleData = {
  title: string;
  description: string;
  text: string;
  tags?: string[];
};

export const test = base.extend<{
  createArticlePage: CreateArticlePage;
  viewArticlePage: ViewArticlePage;
  editArticlePage: EditArticlePage;
  articleWithoutTags: ArticleData;
  articleWithOneTag: ArticleData;
  articleWithTwoTags: ArticleData;
  logger: Logger;
}>({
  createArticlePage: async ({ page }, use) => {
    await use(new CreateArticlePage(page));
  },

  viewArticlePage: async ({ page }, use) => {
    await use(new ViewArticlePage(page));
  },

  editArticlePage: async ({ page }, use) => {
    await use(new EditArticlePage(page));
  },

  articleWithoutTags: async ({ logger }, use) => {
    const article = generateNewArticleData(logger, { tags: [] });
    await use(article);
  },

  articleWithOneTag: async ({ logger }, use) => {
    const article = generateNewArticleData(logger, { tags: ['tag1'] });
    await use(article);
  },

  articleWithTwoTags: async ({ logger }, use) => {
    const article = generateNewArticleData(logger, { tags: ['tag1', 'tag2'] });
    await use(article);
  },
});
