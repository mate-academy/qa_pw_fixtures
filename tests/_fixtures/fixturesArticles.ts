// - `createArticlePage` to initialize the `CreateArticlePage` page
// - `viewArticlePage` to initialize the `ViewArticlePage` page
// - `editArticlePage` to initialize the `EditArticlePage` page
// - `articleWithoutTags` to generate random article test data
// - `articleWithOneTag` to generate random article test data
// - `articleWithTwoTags` to generate random article test data

import { test as base } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { Logger } from '../../src/common/logger/Logger';

export const test = base.extend<
  {
    createArticlePage: CreateArticlePage;
    editArticlePage: EditArticlePage;
    viewArticlePage: ViewArticlePage;
    articleWithTwoTags: Object;
    articleWithOneTag: Object;
    articleWithoutTags: Object;
  },
  { logger: Logger }
>({
  createArticlePage: async ({ page }, use) => {
    const createArticlePage = new CreateArticlePage(page);

    await use(createArticlePage);
  },
  editArticlePage: async ({ page }, use) => {
    const editArticlePage = new EditArticlePage(page);

    await use(editArticlePage);
  },
  viewArticlePage: async ({ page }, use) => {
    const viewArticlePage = new ViewArticlePage(page);

    await use(viewArticlePage);
  },
  articleWithTwoTags: async ({ logger }, use) => {
    await use(generateNewArticleData(logger, 2));
  },
  articleWithOneTag: async ({ logger }, use) => {
    await use(generateNewArticleData(logger, 1));
  },
  articleWithoutTags: async ({ logger }, use) => {
    await use(generateNewArticleData(logger));
  },
});
