import { test as base } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

export const test = base.extend<{
  createArticlePage;
  editArticlePage;
  viewArticlePage;
  articleWithoutTags;
  articleWithOneTag;
  articleWithTwoTags;
}>({

    createArticlePage: async ({ page }, use) => {
      const createArticlePage = new CreateArticlePage(page);

      await use(createArticlePage);
    },

    editArticlePage: async ({ page }, use) => {
      const editArticlePageInstance = new EditArticlePage(page);

      await use(editArticlePageInstance);
    },

    viewArticlePage: async ({ page }, use) => {
      const viewArticlePageInstance = new ViewArticlePage(page);

      await use(viewArticlePageInstance);
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
  }
);