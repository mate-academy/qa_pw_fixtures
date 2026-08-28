import { test } from '../_fixtures/fixtures';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(
  async ({ page, viewArticlePage, articleWithOneTag, logger }) => {
    const user = generateNewUserData(logger);

    await signUpUser(page, user);
    await createNewArticle(page, articleWithOneTag);
    await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  },
);

test('Remove an article title for the existing article', async ({
  viewArticlePage,
  editArticlePage,
}) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.removeArticleTitleField();
  await editArticlePage.clickUpdateArticleButton();
  await editArticlePage.assertEmptyTitleError(TITLE_CANNOT_BE_EMPTY);
});
