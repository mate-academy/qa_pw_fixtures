import { test } from '../../../../tests/_fixtures/fixtures';

export async function createArticle(
  article,
  homePage,
  viewArticlePage,
  createArticlePage,
) {
  await test.step('Create article', async () => {
    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);
    await createArticlePage.fillArticleTags(article.tags);
    await createArticlePage.clickPublishArticleButton();
    await viewArticlePage.assertArticleTextIsVisible(article.title);
  });
}
