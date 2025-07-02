import { test as base } from '@playwright/test';
import  { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage'
import  { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage'
import  { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage'
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData'
import { Logger } from '../../src/common/logger/Logger'

export const test = base.extend<{
  createArticlePage;
  viewArticlePage;
  editArticlePage;
  articleWithoutTags;
  articleWithOneTag;
  articleWithTwoTags;
}>({
  createArticlePage: async ({ page }, use) => {
    const createArticlePage = new CreateArticlePage(page);
    await use(createArticlePage);
  },
  viewArticlePage: async ({ page }, use) => {
    const articlePage = new ViewArticlePage(page);
    await use(articlePage);
  },
  editArticlePage: async ({ page }, use) => {
    const editArticlePage = new EditArticlePage(page);
    await use(editArticlePage);
  },
  articleWithoutTags: async ({}, use) => {
    const debugLogger = new Logger('debug');
    const artDataWithoutTags = generateNewArticleData(
      debugLogger, 0
    );
    await use(artDataWithoutTags);
  },
  articleWithOneTag: async ({}, use) => {
    const debugLogger = new Logger('debug');
    const artWithOneTag = generateNewArticleData(
      debugLogger, 1
    );
    await use(artWithOneTag);
  },
  articleWithTwoTags: async ({}, use) => {
    const debugLogger = new Logger('debug');
    const artWithTwoTags = generateNewArticleData(
      debugLogger, 1
    );
    await use(artWithTwoTags);
  },
})
