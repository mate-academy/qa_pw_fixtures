import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Creat an article with required fields', async ({ 
  homePage, 
  editArticlePage, 
  createArticlePage,
  viewArticlePage,
  articleWithoutTags
}) => {
  await homePage.clickNewArticleLink();

  await editArticlePage.fillTitleField(articleWithoutTags.title);
  await editArticlePage.fillDescriptionField(articleWithoutTags.description);
  await editArticlePage.fillTextField(articleWithoutTags.text);
  await createArticlePage.clickPublishArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
});
