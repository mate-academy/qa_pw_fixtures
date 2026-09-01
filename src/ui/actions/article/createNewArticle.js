import { test } from '@playwright/test';
import { CreateArticlePage } from '../../../ui/pages/article/CreateArticlePage';
import { HomePage } from '../../pages/HomePage';
import { generateNewArticleData } from '../../../../src/common/testData/generateNewArticleData';
import { Logger } from '../../../common/logger/Logger';

export async function createNewArticle(page, customArticleData = null) {
  const logger = new Logger();
  await test.step('Create article', async () => {
    const createArticlePage = new CreateArticlePage(page);
    const homePage = new HomePage(page);
    const article = customArticleData ?? generateNewArticleData(logger, 1);
    const tags = [].concat(article.tags || []);

    await homePage.clickNewArticleLink();

    await createArticlePage.fillInputField('Article Title', article.title);
    await createArticlePage.fillInputField(
      `What's this article about?`,
      article.description,
    );
    await createArticlePage.fillInputField(
      'Write your article (in markdown)',
      article.text,
    );

    for (const tag of tags) {
      await createArticlePage.fillTagInputField(tag);
    }
    await createArticlePage.clickPublishArticleButton();
  });
}
