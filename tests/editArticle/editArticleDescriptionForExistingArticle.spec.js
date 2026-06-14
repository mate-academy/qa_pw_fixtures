import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.beforeEach(
  async ({ page, user, logger, homePage, createArticlePage, article }) => {
    await signUpUser(page, user, logger);

    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);
    await createArticlePage.clickPublishArticleButton();
  },
);

test('Edit the article description for the existing article', async ({
  viewArticlePage,
  createArticlePage,
  editArticlePage,
  article,
}) => {
  await viewArticlePage.clickEditArticleButton();

  await createArticlePage.fillDescriptionField(article.description);
  await editArticlePage.clickEditArticleButton();
  await viewArticlePage.clickUserProfile();

  await viewArticlePage.assertArticleDescriptionIsVisible(article.description);
});
