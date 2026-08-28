import { test as base } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { CreateArticleWithoutTagsPage } from '../../src/ui/pages/article/Tags/CreateArticleWithoutTagsPage';
import { CreateArticleWithOneTagPage } from '../../src/ui/pages/article/Tags/CreateArticleWithOneTagPage';
import { CreateArticleWithTwoTagPage } from '../../src/ui/pages/article/Tags/CreateArticleWithTwoTagPage';

export const test = base.extend<{
  createArticlePage: CreateArticlePage;
  viewArticlePage: ViewArticlePage;
  editArticlePage: EditArticlePage;
  articleWithoutTags: CreateArticleWithoutTagsPage;
  articleWithOneTag: CreateArticleWithOneTagPage;
  articleWithTwoTags: CreateArticleWithTwoTagPage;
}>({
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
  articleWithoutTags: async ({ page }, uses) => {
    const articleWithoutTags = new CreateArticleWithoutTagsPage(page);

    await uses(articleWithoutTags);
  },
  articleWithOneTag: async ({ page }, use) => {
    const articleWithOneTag = new CreateArticleWithOneTagPage(page);

    await use(articleWithOneTag);
  },
  articleWithTwoTags: async ({ page }, use) => {
    const articleWithTwoTags = new CreateArticleWithTwoTagPage(page);

    await use(articleWithTwoTags);
  },
});
