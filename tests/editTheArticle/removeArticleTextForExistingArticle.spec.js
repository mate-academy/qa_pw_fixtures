import { test } from '../_fixtures/fixtures';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { BODY_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(
  async ({ page, viewArticlePage, articleWithOneTag, logger }) => {
    const user = generateNewUserData(logger);

    await signUpUser(page, user);
    await createNewArticle(page, articleWithOneTag);
    await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  },
);

test('Remove an article text for the existing article', async ({
  // eslint-disable-next-line no-unused-vars
  page,
  viewArticlePage,
  editArticlePage,
}) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.removeArticleTextField();
  await editArticlePage.clickUpdateArticleButton();
  await editArticlePage.assertEmptyTextError(BODY_CANNOT_BE_EMPTY);
});
