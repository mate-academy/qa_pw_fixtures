import { test as base } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

type ArticleFixtures = {
  createArticlePage: CreateArticlePage;
  editArticlePage: EditArticlePage;
  viewArticlePage: ViewArticlePage;
  articleWithoutTags: { title: string; description: string; text: string };
  articleWithOneTag: { title: string; description: string; text: string; tags: string[] };
  articleWithTwoTags: { title: string; description: string; text: string; tags: string[] };
};

export const test = base.extend<ArticleFixtures>({
  createArticlePage: async ({ page }, use) => {
    await use(new CreateArticlePage(page));
  },
  editArticlePage: async ({ page }, use) => {
    await use(new EditArticlePage(page));
  },
  viewArticlePage: async ({ page }, use) => {
    await use(new ViewArticlePage(page));
  },
  articleWithoutTags: async ({ logger }: any, use) => {
    const article = generateNewArticleData(logger, { tagsCount: 0 });
    await use(article);
  },
  articleWithOneTag: async ({ logger }: any, use) => {
    const article = generateNewArticleData(logger, { tagsCount: 1 });
    await use(article);
  },
  articleWithTwoTags: async ({ logger }: any, use) => {
    const article = generateNewArticleData(logger, { tagsCount: 2 });
    await use(article);
  },
});