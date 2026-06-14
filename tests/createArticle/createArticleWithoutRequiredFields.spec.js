import { test } from '../_fixtures/fixtures';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user, logger }) => {
  await signUpUser(page, user, logger);
});

test('Create an article without required fields', async ({
  homePage,
  createArticlePage,
}) => {
  await homePage.clickNewArticleLink();

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});
