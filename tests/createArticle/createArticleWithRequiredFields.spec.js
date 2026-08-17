import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';



test.describe('Create an article with required fields', () => {
  test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Create an article without tags', 
  async ({ article, homePage, createArticlePage, viewArticlePage }) => {
  const articleData = article(0);

  await homePage.clickNewArticleLink();
  await createArticlePage.fillTitleField(articleData.title);
  await createArticlePage.fillDescriptionField(articleData.description);
  await createArticlePage.fillTextField(articleData.text);
  await createArticlePage.clickPublishArticleButton();
  await viewArticlePage.assertArticleTitleIsVisible(articleData.title);
  await viewArticlePage.assertArticleTextIsVisible(articleData.text);
});

test('Create an article with tags', 
  async ({ article, homePage, createArticlePage, viewArticlePage }) => {
  const articleData = article(3);
  await homePage.clickNewArticleLink();
  await createArticlePage.fillTitleField(articleData.title);
  await createArticlePage.fillDescriptionField(articleData.description);
  await createArticlePage.fillTextField(articleData.text);
  await createArticlePage.fillTagsField(articleData.tags);
  await createArticlePage.clickPublishArticleButton();
  await viewArticlePage.assertArticleTitleIsVisible(articleData.title);
  await viewArticlePage.assertArticleTextIsVisible(articleData.text);
  await viewArticlePage.assertArticleTagIsVisible(articleData.tags);
});

});
