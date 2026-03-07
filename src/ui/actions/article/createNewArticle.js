
import { test } from '@playwright/test';

export async function createNewArticle(CreateArticlePage, article) {
  await test.step(`Create a new article`, async () => {
    await CreateArticlePage.fillTitleField(article.title);
    await CreateArticlePage.fillDescriptionField(article.description);
    await CreateArticlePage.fillTextField(article.text);
    await CreateArticlePage.fillTagField(article.tags ?? []);
    await CreateArticlePage.clickPublishArticleButton();
  });
};