import { test } from '../_fixtures/fixtures';

test.describe('Create Article', () => {
  test.beforeEach(async ({ signUpPage, homePage, user }) => {
    await signUpPage.open();
    await signUpPage.submitSignUpForm(user);
    await homePage.assertYourFeedTabIsVisible();
    await homePage.clickNewArticleLink();
  });

  test('Create article without tags', async ({
    createArticlePage,
    viewArticlePage,
    articleWithoutTags,
  }) => {
    await createArticlePage.fillTitleField(articleWithoutTags.title);
    await createArticlePage.fillDescriptionField(
      articleWithoutTags.description,
    );
    await createArticlePage.fillTextField(articleWithoutTags.text);
    await createArticlePage.clickPublishArticleButton();
    await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
    await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  });

  test('Create article with one tag', async ({
    createArticlePage,
    viewArticlePage,
    articleWithOneTag,
  }) => {
    await createArticlePage.fillTitleField(articleWithOneTag.title);
    await createArticlePage.fillDescriptionField(articleWithOneTag.description);
    await createArticlePage.fillTextField(articleWithOneTag.text);
    await createArticlePage.clickPublishArticleButton();
    await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
    await viewArticlePage.assertArticleTextIsVisible(articleWithOneTag.text);
  });

  test('Create article with two tags', async ({
    createArticlePage,
    viewArticlePage,
    articleWithTwoTags,
  }) => {
    await createArticlePage.fillTitleField(articleWithTwoTags.title);
    await createArticlePage.fillDescriptionField(
      articleWithTwoTags.description,
    );
    await createArticlePage.fillTextField(articleWithTwoTags.text);
    await createArticlePage.clickPublishArticleButton();
    await viewArticlePage.assertArticleTitleIsVisible(articleWithTwoTags.title);
    await viewArticlePage.assertArticleTextIsVisible(articleWithTwoTags.text);
  });
});
