import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test('Creat an article with required fields', async ({
  homePage,
  createArticlePage,
  page,
  user,
  articleWithoutTags,
  viewArticlePage,
}) => {
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createArticlePage.fillTitleField(articleWithoutTags.title);
  await createArticlePage.fillDescriptionField(articleWithoutTags.description);
  await createArticlePage.fillTextField(articleWithoutTags.text);
  await createArticlePage.clickPublishArticleButton();

  await viewArticlePage.assertArticleHasCorrectTitle(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
});
