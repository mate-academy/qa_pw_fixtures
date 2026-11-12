import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { BODY_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user, articleWithoutTags }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);
});

test('Remove the article text for the existing article', async ({
  viewArticlePage,
  createArticlePage,
}) => {
  await viewArticlePage.clickEditArticleButton();

  await createArticlePage.textField.clear();
  await createArticlePage.clickUpdateArticleButton();
  await createArticlePage.assertErrorMessageContainsText(BODY_CANNOT_BE_EMPTY);
});
