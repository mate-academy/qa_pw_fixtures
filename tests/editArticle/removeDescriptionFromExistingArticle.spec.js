import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { DESCRIPTION_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user, articleWithoutTags }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);
});

test('Remove the article description for the existing article', async ({
  viewArticlePage,
  editArticlePage,
}) => {
  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.descriptionField.clear();
  await editArticlePage.clickUpdateArticleButton();
  await editArticlePage.assertErrorMessageContainsText(
    DESCRIPTION_CANNOT_BE_EMPTY,
  );
});
