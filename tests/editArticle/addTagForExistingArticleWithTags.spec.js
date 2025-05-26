import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/createArticle';
import { test } from '../_fixtures/fixtures';

test.beforeEach(async ({ page, user, articleWithOneTag }) => {
  await signUpUser(page, user);
  await createArticle(page, articleWithOneTag);
});

test('Add tag for existing article with tag', async ({
  page,
  createArticlePage,
  viewArticlePage,
}) => {
  await viewArticlePage.clickOnEditArticleButton();
  await createArticlePage.fillTagField('mjufmfnbj');
  await page.waitForTimeout(2000);
  await createArticlePage.clickOnUpdateArticleButton();
  await viewArticlePage.assertEditArticleButtonIsHere();
  await page.waitForTimeout(2000);
  await viewArticlePage.assertTagTextIsHere();
});
