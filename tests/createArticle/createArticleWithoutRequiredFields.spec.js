import { test } from '../_fixtures/fixtures';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test('Create an article without required fields', 
  async ({ page, user, homePage, createArticlePage }) => {
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});
