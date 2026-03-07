import { test as base } from '@playwright/test';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

export const test = base.extend<{
  articleWithTwoTags
}>({
  articleWithTwoTags: async ({ logger }, use) => {
    const article = generateNewArticleData(logger, 2);

    await use(article);
  }
})
