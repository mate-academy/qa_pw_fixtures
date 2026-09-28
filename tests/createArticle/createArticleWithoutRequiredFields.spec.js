import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { articleErrorMessages } from '../../src/ui/constants/articleErrorMessages';

test('Creat an article without required fields', async ({
  page,
  user,
  homePage,
  createArticlePage,
}) => {
  await signUpUser(page, user);

  await homePage.clickNewArticleLink();

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    articleErrorMessages.TITLE_CANNOT_BE_EMPTY,
  );
});