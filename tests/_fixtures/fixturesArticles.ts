import { test as base } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

type ArticleFixtures = {
  createArticlePage: CreateArticlePage;
  viewArticlePage: ViewArticlePage;
  editArticlePage: EditArticlePage;
  articleWithoutTags: ReturnType<typeof generateNewArticleData>;
  articleWithOneTag: ReturnType<typeof generateNewArticleData>;
  articleWithTwoTags: ReturnType<typeof generateNewArticleData>;
};
export const test = base.extend<ArticleFixtures>({
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
    await use(generateNewArticleData(logger, 0));
  },

  articleWithOneTag: async ({ logger }, use) => {
    await use(generateNewArticleData(logger, 1));
  },

  articleWithTwoTags: async ({ logger }, use) => {
    await use(generateNewArticleData(logger, 2));
  },
});

export { expect } from '@playwright/test';
