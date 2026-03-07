import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Create an article with required fields', 
  async ({ homePage, createArticlePage, viewArticlePage, articleData }) => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField(articleData.title);
  await createArticlePage.fillDescriptionField(articleData.description);
  await createArticlePage.fillTextField(articleData.text);
  await createArticlePage.clickPublishArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(articleData.title);
  await viewArticlePage.assertArticleTextIsVisible(articleData.text);
});
