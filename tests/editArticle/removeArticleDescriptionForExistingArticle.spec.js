import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/createArticle';
import { test } from '../_fixtures/fixtures';
import { DESCRIPTION_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(async ({ page, user, articleWithTwoTags }) => {
  await signUpUser(page, user);
  await createArticle(page, articleWithTwoTags);
});

test('Remove article Description for Existing article', async ({
  page,
  createArticlePage,
  viewArticlePage,
}) => {
  await viewArticlePage.clickOnEditArticleButton();
  await createArticlePage.fillDescriptionField('');
  await page.waitForTimeout(2000);
  await createArticlePage.clickOnUpdateArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    DESCRIPTION_CANNOT_BE_EMPTY,
  );
});
