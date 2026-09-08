import { test as base } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

type ArticleData = {
  title: string;
  description: string;
  text: string;
  tags: string[];
};

type ArticleFixtures = {
  createArticlePage: CreateArticlePage;
  viewArticlePage: ViewArticlePage;
  editArticlePage: EditArticlePage;
  articleWithoutTags: ArticleData;
  articleWithOneTag: ArticleData;
  articleWithTwoTags: ArticleData;
};

export const test = base.extend<ArticleFixtures>({
  createArticlePage: async ({ page }, use) => {
    const createArticlePage = new CreateArticlePage(page);

    await use(createArticlePage);
  },
  viewArticlePage: async ({ page }, use) => {
    const viewArticlePage = new ViewArticlePage(page);

    await use(viewArticlePage);
  },
  editArticlePage: async ({ page }, use) => {
    const editArticlePage = new EditArticlePage(page);

    await use(editArticlePage);
  },
  articleWithoutTags: async ({}, use) => {
    await use(generateNewArticleData());
  },
  articleWithOneTag: async ({}, use) => {
    await use(generateNewArticleData(undefined, 1));
  },
  articleWithTwoTags: async ({}, use) => {
    await use(generateNewArticleData(undefined, 2));
  },
});
