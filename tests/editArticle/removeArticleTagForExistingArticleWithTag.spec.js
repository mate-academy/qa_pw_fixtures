import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/createArticle';
import { test } from '../_fixtures/fixtures';

test.beforeEach(async ({ page, user, articleWithTwoTags }) => {
  await signUpUser(page, user);
  await createArticle(page, articleWithTwoTags);
});

test('Remove tag for existing article with tags', async ({
  page,
  createArticlePage,
  viewArticlePage,
}) => {
  await viewArticlePage.clickOnEditArticleButton();
  await createArticlePage.clickOnDeleteTagButton();
  await page.waitForTimeout(2000);
  await createArticlePage.clickOnUpdateArticleButton();
  await viewArticlePage.assertEditArticleButtonIsHere();
  await viewArticlePage.assertTagTextIsHidden();
});
