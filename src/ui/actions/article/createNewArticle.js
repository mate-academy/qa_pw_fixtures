import { test } from '@playwright/test';

//user should be logged in
export async function createNewArticle(
  { homePage, createArticlePage, viewArticlePage }, article) {
  await test.step(`Create new article`, async () => {
    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);
    await createArticlePage.fillInTags(article.tags);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTitleIsVisible(article.title);
    await viewArticlePage.assertArticleTextIsVisible(article.text);
  });
}
