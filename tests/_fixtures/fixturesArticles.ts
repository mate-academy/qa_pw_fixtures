import {test as base} from '@playwright/test';
import {CreateArticlePage} from '../../src/ui/pages/article/CreateArticlePage';
import {ViewArticlePage} from '../../src/ui/pages/article/ViewArticlePage';
import {EditArticlePage} from '../../src/ui/pages/article/EditArticlePage';
import {generateNewArticleData} from '../../src/common/testData/generateNewArticleData';
import { HomePage } from "../../src/ui/pages/HomePage";

export const test = base.extend<{
  createArticlePage;
  viewArticlePage;
  editArticlePage;
  homePage;

  articleWithoutTags;
  articleWithOneTag;
  articleWithTwoTags;
},
{
  logger;
}
>({
  createArticlePage: async ({page}, use) => {
    const createArticlePage = new CreateArticlePage(page);

    await use(createArticlePage);
  },

  viewArticlePage: async ({page}, use) => {
    const viewArticlePage = new ViewArticlePage(page);

    await use(viewArticlePage);
  },

  editArticlePage: async ({page}, use: any) => {
    const editArticlePage = new EditArticlePage(page);

    await use(editArticlePage);
  },

  homePage: async ({page}, use) => {
    const homePage = new HomePage(page);

    await use(homePage);
  },

  articleWithoutTags: async ({ logger }, use) => {
      const articleWithoutTags = generateNewArticleData(logger, 0);
  
      await use(articleWithoutTags);
  },

  articleWithOneTag: async ({ logger }, use) => {
    const articleWithOneTag = generateNewArticleData (logger, 1);

    await use(articleWithOneTag);
  },

  articleWithTwoTags: async ({ logger }, use) => {
    const articleWithTwoTags = generateNewArticleData (logger, 2);

    await use(articleWithTwoTags);
  }
});
