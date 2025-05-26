import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/createArticle';
import { test } from '../_fixtures/fixtures';

test.beforeEach(async ({ page, user, articleWithTwoTags }) => {
  await signUpUser(page, user);
  await createArticle(page, articleWithTwoTags);
});

test('Edit article text for an existing article', async ({
  page,
  createArticlePage,
  viewArticlePage,
}) => {
  await viewArticlePage.clickOnEditArticleButton();
  await createArticlePage.fillTextField('ZoofhgFE77');
  await page.waitForTimeout(2000);
  await createArticlePage.clickOnUpdateArticleButton();
  await viewArticlePage.assertEditArticleButtonIsHere();
  await viewArticlePage.assertArticleTextIsVisible('ZoofhgFE77');
});
