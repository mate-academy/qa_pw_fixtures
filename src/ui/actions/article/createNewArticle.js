import { test } from '../../../../tests/_fixtures/fixtures';

export async function createNewArticle(
  article,
  homePage,
  createArticlePage,
  viewArticlePage,
) {
  await test.step('Create a new article', async () => {
    await homePage.clickNewArticleLink();

    // eslint-disable-next-line playwright/no-conditional-in-test
    if (article.tags.length > 0) {
      await createArticlePage.createArticleTagFields(article);
    } else {
      await createArticlePage.createArticleWithRequiredFields(article);
    }

    await viewArticlePage.assertArticleTitleIsVisible(article.title);
    await viewArticlePage.assertArticleTextIsVisible(article.text);

    // eslint-disable-next-line playwright/no-conditional-in-test
    if (article.tags.length > 0) {
      await viewArticlePage.assertTagsVisible(article.tags);
    }
  });
}
