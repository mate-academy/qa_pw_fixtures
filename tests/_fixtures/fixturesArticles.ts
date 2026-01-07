import { test as base } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

export const test = base.extend<{
  createArticlePage: any;
  viewArticlePage: any;
  editArticlePage: any;
  articleWithoutTags: any;
  articleWithOneTag: any;
  articleWithTwoTags: any;
}>({
  createArticlePage: async ({ page }, use: any) => {
    const createArticlePage = new CreateArticlePage(page);

    await use(createArticlePage);
  },
  viewArticlePage: async ({ page }, use: any) => {
    const viewArticlePage = new ViewArticlePage(page);

    await use(viewArticlePage);
  },
  editArticlePage: async ({ page }, use: any) => {
    const editArticlePage = new EditArticlePage(page);

    await use(editArticlePage);
  },
  articleWithoutTags: async ({ logger }, use: any) => {
    const article = generateNewArticleData(logger);

    await use(article);
  },
  articleWithOneTag: async ({ logger }, use: any) => {
    const article = generateNewArticleData(logger, 1);

    await use(article);
  },
  articleWithTwoTags: async ({ logger }, use: any) => {
    const article = generateNewArticleData(logger, 2);

    await use(article);
  },
});
