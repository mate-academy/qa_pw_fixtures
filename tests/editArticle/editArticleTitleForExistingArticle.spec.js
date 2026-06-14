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

test('Edit the article title for the existing article', async ({
  viewArticlePage,
  createArticlePage,
  editArticlePage,
  article,
}) => {
  await viewArticlePage.clickEditArticleButton();

  await createArticlePage.fillTitleField(article.title);
  await editArticlePage.clickEditArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(article.title);
});
