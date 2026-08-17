import { test as base } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { HeaderPage } from '../../src/ui/pages/article/HeaderPage';
import { ViewProfilePage } from '../../src/ui/pages/article/ViewProfilePage';

export const test = base.extend<{
  createArticlePage;
  viewArticlePage;
  viewProfilePage;
  editArticlePage;
  headerPage;
  homePage;
}>({
  createArticlePage: async ({ page }, use) => {
    const createArticlePage = new CreateArticlePage(page);

    await use(createArticlePage);
  },
  viewArticlePage: async ({ page }, use) => {
    const viewArticlePage = new ViewArticlePage(page);

    await use(viewArticlePage);
  },
  viewProfilePage: async ({ page }, use) => {
    const viewProfilePage = new ViewProfilePage(page);

    await use(viewProfilePage);
  },
  editArticlePage: async ({ page }, use) => {
    const editArticlePage = new EditArticlePage(page);

    await use(editArticlePage);
  },
  headerPage: async ({ page }, use) => {
    const headerPage = new HeaderPage(page);

    await use(headerPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);

    await use(homePage);
  },
});
