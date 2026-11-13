import { test as base } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { UserProfilePage } from '../../src/ui/pages/user/UserProfilePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { Logger } from '../../src/common/logger/Logger';

type ArticleData = ReturnType<typeof generateNewArticleData>;

export const test = base.extend<{
  logger: Logger;
  createArticlePage: CreateArticlePage;
  viewArticlePage: ViewArticlePage;
  editArticlePage: EditArticlePage;
  userProfilePage: UserProfilePage;
  articleWithoutTags: ArticleData;
  articleWithOneTag: ArticleData;
  articleWithTwoTags: ArticleData;
}>({
  logger: async ({}, use) => {
    const logger = new Logger('error');

    await use(logger);
  },

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

  userProfilePage: async ({ page }, use) => {
    const userProfilePage = new UserProfilePage(page);

    await use(userProfilePage);
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
