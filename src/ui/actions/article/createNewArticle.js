import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { HomePage } from '../../pages/HomePage';
import { test } from '@playwright/test';

export async function createNewArticle(page, article) {
  await test.step(`Create new article`, async () => {
    const createArticlePage = new CreateArticlePage(page);
    const homePage = new HomePage(page);

    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);
    await createArticlePage.clickPublishArticleButton();
  });
}