import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user, articleWithoutTags }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);
});

test('Remove the article title for the existing article', async ({
  viewArticlePage,
  editArticlePage,
}) => {
  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.titleField.clear();
  await editArticlePage.clickUpdateArticleButton();
  await editArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});
