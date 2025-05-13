import { test as base } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { HomePage } from '../../src/ui/pages/HomePage';

export const test = base.extend<{
  createArticlePage: CreateArticlePage;
  editArticlePage: EditArticlePage;
  viewArticlePage: ViewArticlePage;
  articleWithoutTags: any;
  articleWithOneTag: any;
  articleWithTwoTags: any;
}>({
  createArticlePage: async ({ page }, use) => {
    await use(new CreateArticlePage(page));
  },
  editArticlePage: async ({ page }, use) => {
    await use(new EditArticlePage(page));
  },
  viewArticlePage: async ({ page }, use) => {
    await use(new ViewArticlePage(page));
  },
  articleWithoutTags: async ({}, use) => {
    await use(generateNewArticleData());
  },
  articleWithOneTag: async ({}, use) => {
    const article = generateNewArticleData();
    article.tags = ['tag1'];
    await use(article);
  },
  articleWithTwoTags: async ({}, use) => {
    const article = generateNewArticleData();
    article.tags = ['tag1', 'tag2'];
    await use(article);
  },
});
