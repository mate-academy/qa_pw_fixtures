import { expect } from '@playwright/test';
import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});
test('Remove an article tag for the existing article with tag', async ({
  page,
  articleWithOneTag,
  viewArticlePage,
  createArticlePage,
  homePage,
}) => {
  await createNewArticle(
    articleWithOneTag,
    homePage,
    createArticlePage,
    viewArticlePage,
  );
  await viewArticlePage.clickEditArticleButton();
  await createArticlePage.clickRemoveTagButton(articleWithOneTag.tags);
  await createArticlePage.clickUpdateArticleButton();
  await expect(page).toHaveURL(/article/);
  await page.reload();

  await viewArticlePage.assertArticleTagsAreNotVisible([
    ...articleWithOneTag.tags,
  ]);
});
