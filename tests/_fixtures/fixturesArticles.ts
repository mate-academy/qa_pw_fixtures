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
    articleWithoutTags: ReturnType<typeof generateNewArticleData>;
    articleWithOneTag: ReturnType<typeof generateNewArticleData>;
    articleWithTwoTags: ReturnType<typeof generateNewArticleData>;
  },
  {
    logger: Logger;
  }
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
  articleWithoutTags: async ({ logger }, use) => {
    const article0tags = generateNewArticleData(logger, 0);

    await use(article0tags);
  },
  articleWithOneTag: async ({ logger }, use) => {
    const article1tag = generateNewArticleData(logger, 1);

    await use(article1tag);
  },
  articleWithTwoTags: async ({ logger }, use) => {
    const article2tags = generateNewArticleData(logger, 2);

    await use(article2tags);
  },
});
