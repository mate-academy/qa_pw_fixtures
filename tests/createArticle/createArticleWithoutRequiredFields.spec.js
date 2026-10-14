
import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ARTICLE_ERROR_MESSAGES } from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Creat an article without required fields', async ({
  homePage,
  createArticlePage,
}) => {
  await homePage.clickNewArticleLink();

  await createArticlePage.clickPublishArticleButton();

  await createArticlePage.assertErrorMessageContainsText(
    ARTICLE_ERROR_MESSAGES.TITLE_EMPTY,
  );
});
