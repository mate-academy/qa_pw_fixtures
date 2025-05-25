import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

import { BODY_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(async ({ user, articleWithoutTags, page, homePage }) => {
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, articleWithoutTags);
});

test('Remove an article body text for the existing article', async ({
  viewArticlePage,
  editArticlePage,
  createArticlePage,
}) => {
  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.editTextField('');
  await editArticlePage.clickUpdateArticleButton();

  await createArticlePage.assertErrorMessageContainsText(BODY_CANNOT_BE_EMPTY);
});
