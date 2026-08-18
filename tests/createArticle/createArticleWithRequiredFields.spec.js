import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';



test.describe('Create an article with required fields', () => {
  test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Create an article without tags', 
  async ({ articleWithoutTags, homePage, createArticlePage, viewArticlePage }) => {

  await homePage.clickNewArticleLink();
  await createArticlePage.fillTitleField(articleWithoutTags.title);
  await createArticlePage.fillDescriptionField(articleWithoutTags.description);
  await createArticlePage.fillTextField(articleWithoutTags.text);
  await createArticlePage.clickPublishArticleButton();
  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
});

test('Create an article with tags', 
  async ({ articleWithTwoTags, homePage, createArticlePage, viewArticlePage }) => {
  await homePage.clickNewArticleLink();
  await createArticlePage.fillTitleField(articleWithTwoTags.title);
  await createArticlePage.fillDescriptionField(articleWithTwoTags.description);
  await createArticlePage.fillTextField(articleWithTwoTags.text);
  await createArticlePage.fillTagsField(articleWithTwoTags.tags);
  await createArticlePage.clickPublishArticleButton();
  await viewArticlePage.assertArticleTitleIsVisible(articleWithTwoTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithTwoTags.text);
  await viewArticlePage.assertArticleTagIsVisible(articleWithTwoTags.tags);
});

});
