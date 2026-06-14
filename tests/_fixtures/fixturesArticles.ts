import { test as base } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import type { Logger } from '../../src/common/logger/Logger';

export const test = base.extend<{
  createArticlePage: CreateArticlePage;
  editArticlePage: EditArticlePage;
  viewArticlePage: ViewArticlePage;
  article: {
    title: string;
    description: string;
    text: string;
    tags: string[];
  };
  articleWithoutTags: {
    title: string;
    description: string;
    text: string;
    tags: string[];
  };
  articleWithOneTag: {
    title: string;
    description: string;
    text: string;
    tags: string[];
  };
  articleWithTwoTags: {
    title: string;
    description: string;
    text: string;
    tags: string[];
  };
  logger: Logger;
}>({
  createArticlePage: async ({ page }, use) => {
    const { CreateArticlePage } = await import(
      '../../src/ui/pages/article/CreateArticlePage'
    );
    const createArticlePage = new CreateArticlePage(page);

    await use(createArticlePage);
  },
  editArticlePage: async ({ page }, use) => {
    const { EditArticlePage } = await import(
      '../../src/ui/pages/article/EditArticlePage'
    );
    const editArticlePage = new EditArticlePage(page);

    await use(editArticlePage);
  },
  viewArticlePage: async ({ page }, use) => {
    const { ViewArticlePage } = await import(
      '../../src/ui/pages/article/ViewArticlePage'
    );
    const viewArticlePage = new ViewArticlePage(page);

    await use(viewArticlePage);
  },

  article: async ({ logger }, use) => {
    const article = generateNewArticleData(logger, 0);
    await use(article);
  },

  articleWithoutTags: async ({ logger }, use) => {
    const article = generateNewArticleData(logger, 0);
    await use(article);
  },

  articleWithOneTag: async ({ logger }, use) => {
    const article = generateNewArticleData(logger, 1);
    await use(article);
  },

  articleWithTwoTags: async ({ logger }, use) => {
    const article = generateNewArticleData(logger, 2);
    await use(article);
  },
});
