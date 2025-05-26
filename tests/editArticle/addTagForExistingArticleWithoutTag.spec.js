import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { test } from '../_fixtures/fixtures';
import { createArticle } from '../../src/ui/actions/createArticle';

test.beforeEach(async ({ page, articleWithoutTags, user }) => {
  await signUpUser(page, user);
  await createArticle(page, articleWithoutTags);
});

test('Add tag for existeng article without tag', async ({
  page,
  createArticlePage,
  viewArticlePage,
}) => {
  await viewArticlePage.clickOnEditArticleButton();
  await createArticlePage.fillTagField('aheafjefh');
  await page.waitForTimeout(2000);
  await createArticlePage.clickOnUpdateArticleButton();
  await viewArticlePage.assertEditArticleButtonIsHere();
  await viewArticlePage.assertTagTextIsHere();
});
