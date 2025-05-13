import { test } from '../_fixtures/fixtures';

import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test('Creat an article without required fields', async ({
  signUpPage,
  homePage,
  createArticlePage,
  user,
}) => {
  await signUpPage.open();
  await signUpPage.submitSignUpForm(user);
  await homePage.assertYourFeedTabIsVisible();
  await homePage.clickNewArticleLink();

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});
