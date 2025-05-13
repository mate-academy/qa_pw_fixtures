import { test } from '../_fixtures/fixtures';

test('Creat an article with required fields', async ({
  signUpPage,
  homePage,
  createArticlePage,
  viewArticlePage,
  articleWithoutTags,
  user,
}) => {
  await signUpPage.open();
  await signUpPage.submitSignUpForm(user);
  await homePage.assertYourFeedTabIsVisible();
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField(articleWithoutTags.title);
  await createArticlePage.fillDescriptionField(articleWithoutTags.description);
  await createArticlePage.fillTextField(articleWithoutTags.text);
  await createArticlePage.clickPublishArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
});
