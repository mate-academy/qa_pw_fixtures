import { test as base, expect } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import type { Logger } from '../../src/common/logger/Logger';

export type ArticleData = {
  title: string;
  description: string;
  text: string;
  tags?: string[];
};

export const test = base.extend<
  {
    createArticlePage: CreateArticlePage;
    viewArticlePage: ViewArticlePage;
    editArticlePage: EditArticlePage;
    articleWithoutTags: ArticleData;
    articleWithOneTag: ArticleData;
    articleWithTwoTags: ArticleData;
  },
  {
    logger: Logger;
  }
>({
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
    const article: ArticleData = generateNewArticleData(logger, 0);
    await use(article);
  },

  articleWithOneTag: async ({ logger }, use) => {
    const article: ArticleData = generateNewArticleData(logger, 1);
    await use(article);
  },

  articleWithTwoTags: async ({ logger }, use) => {
    const article: ArticleData = generateNewArticleData(logger, 2);
    await use(article);
  },
});

export { expect };
