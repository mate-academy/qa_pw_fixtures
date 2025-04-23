import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(async ({ page, homePage, user, articleWithTwoTags }) => {
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, articleWithTwoTags);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test('Remove the tag for the existing article with tags', async ({
  viewArticlePage,
  createArticlePage
}) => {
  await viewArticlePage.clickEditArticleButton();
  await createArticlePage.fillTitleField('');
  await createArticlePage.clickUpdateArticleButton();
  await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY)
});
