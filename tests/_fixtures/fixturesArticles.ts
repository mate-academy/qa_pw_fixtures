import { test as base } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { updateArticle } from '../../src/ui/actions/article/updateArticle';


export const test = base.extend<{
  createArticlePage;
  editArticlePage;
  viewArticlePage;
}>({
  createArticlePage: async ({page}, use) => {
    const createArticlePage = new CreateArticlePage(page);

    await use(createArticlePage);
  },
  editArticlePage: async ({page}, use) => {
    const editArticlePage = new EditArticlePage(page);

    await use(editArticlePage);
  },
  viewArticlePage: async ({page}, use) => {
    const viewArticlePage = new ViewArticlePage(page);

    await use(viewArticlePage);
  },
});
