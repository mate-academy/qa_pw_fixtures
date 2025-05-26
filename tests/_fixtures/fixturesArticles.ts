import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { test as base } from './fixturesGeneric';
import { HomePage } from '../../src/ui/pages/HomePage';

export const test = base.extend<{
  createArticlePage: CreateArticlePage;
  viewArticlePage: ViewArticlePage;
  editArticlePage: EditArticlePage;
  homePage: HomePage;
  articleWithoutTags: {
    title: string;
    description: string;
    text: string;
    tags: string[];
  };
  articleWithOneTag: {
    title: string;
    description: string;
    text: string;
    tags: string[];
  };
  articleWithTwoTags: {
    title: string;
    description: string;
    text: string;
    tags: string[];
  };
}>({
  createArticlePage: async ({ page }, use) => {
    await use(new CreateArticlePage(page));
  },
  viewArticlePage: async ({ page }, use) => {
    await use(new ViewArticlePage(page));
  },
  editArticlePage: async ({ page }, use) => {
    await use(new EditArticlePage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
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
