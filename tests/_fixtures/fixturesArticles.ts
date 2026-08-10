import { expect } from '@playwright/test';
import { test as base } from './fixturesGeneric';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

type NewArticleData = ReturnType<typeof generateNewArticleData>;

type ArticleFixtures = {
  createArticlePage: CreateArticlePage;
  viewArticlePage: ViewArticlePage;
  editArticlePage: EditArticlePage;
  articleWithoutTags: NewArticleData;
  articleWithOneTag: NewArticleData;
  articleWithTwoTags: NewArticleData;
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

export { expect };


