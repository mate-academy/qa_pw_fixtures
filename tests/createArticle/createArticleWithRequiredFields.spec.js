import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Create an article with required fields', async ({
  homePage,
  createArticlePage,
  articleWithoutTags,
  viewArticlePage,
}) => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField(articleWithoutTags.title);
  await createArticlePage.fillDescriptionField(articleWithoutTags.description);
  await createArticlePage.fillTextField(articleWithoutTags.text);
  await createArticlePage.clickPublishArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
});

test('Create an article with tags', async ({
  homePage,
  createArticlePage,
  articleWithTwoTags,
  viewArticlePage,
}) => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField(articleWithTwoTags.title);
  await createArticlePage.fillDescriptionField(articleWithTwoTags.description);
  await createArticlePage.fillTextField(articleWithTwoTags.text);
  await createArticlePage.fillTagsField(articleWithTwoTags.tags);
  await createArticlePage.clickPublishArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(articleWithTwoTags.title);
  await viewArticlePage.assertTagIsVisible(articleWithTwoTags.tags[0]);
  await viewArticlePage.assertTagIsVisible(articleWithTwoTags.tags[1]);
});
