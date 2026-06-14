import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user, logger }) => {
  await signUpUser(page, user, logger);
});

test('Create an article with required fields', async ({
  homePage,
  createArticlePage,
  viewArticlePage,
  article,
}) => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField(article.title);
  await createArticlePage.fillDescriptionField(article.description);
  await createArticlePage.fillTextField(article.text);
  await createArticlePage.clickPublishArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
});
