import { test as base } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { Logger } from '../../src/common/logger/Logger';


type Article = ReturnType<typeof generateNewArticleData>;

export const test = base.extend<
{
  createArticlePage: CreateArticlePage;
  viewArticlePage: ViewArticlePage;
  editArticlePage: EditArticlePage;
  articleWithoutTags: Article;
  articleWithOneTag: Article;
  articleWithTwoTags: Article;
  },
    { logger: Logger }
>({
  createArticlePage: [ 
    async ({page}, use ) => {
    const createArticlePage = new CreateArticlePage(page);
    await use(createArticlePage);
  },
  { scope: 'test' },
  ],


  viewArticlePage: [
    async ({page}, use) => {
    const viewArticlePage = new ViewArticlePage(page);
    await use(viewArticlePage);
  },
  { scope: 'test' },
  ],

  editArticlePage: [
    async ({page}, use) => {
    const editArticlePage = new EditArticlePage(page);
    await use(editArticlePage);
  },
  { scope: 'test' },
  ],

  articleWithoutTags: [
    async ({ logger }, use) => {
      const article = generateNewArticleData(logger);
      await use(article);
    },
    { scope: 'test' },
  ],

  articleWithOneTag: [
    async ({ logger }, use) => {
      const article = generateNewArticleData(logger, 1);
      await use(article);
    },
    { scope: 'test' },
  ],

  articleWithTwoTags: [
    async ({ logger }, use) => {
      const article = generateNewArticleData(logger, 2);
      await use(article);
    },
    { scope: 'test' },
  ],


});
