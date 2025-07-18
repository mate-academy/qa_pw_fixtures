import { Logger, test as base } from '@playwright/test';
import { CreateArticlePage } from "../../src/ui/pages/article/CreateArticlePage";
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';


export const test = base.extend<{
  createArticlePage: CreateArticlePage;
  viewArticlePage : ViewArticlePage;
  editArticlePage: EditArticlePage;
  articleWithoutTags: ReturnType<typeof generateNewArticleData>;
  articleWithOneTag: ReturnType<typeof generateNewArticleData>;
  articleWithTwoTags: ReturnType<typeof generateNewArticleData>;
}, {
  logger: Logger,
}>({
  createArticlePage: async ({ page }, use) => {
    await use(new CreateArticlePage(page));
  },
  viewArticlePage: async ({ page }, use) => {
    await use(new ViewArticlePage(page));
  },
  editArticlePage: async ({page}, use) => {
    await use(new EditArticlePage(page));
  },
  articleWithoutTags: async ({ logger }, use) => {
    const article = generateNewArticleData(logger);
    await use(article);
  },
  articleWithOneTag: async ({ logger }, use) => {
    const article = generateNewArticleData(logger, 1);
    await use(article);
  },
  articleWithTwoTags: async ({ logger }, use) => {
    const article = generateNewArticleData(logger, 2);
    await use(article);
  }
});