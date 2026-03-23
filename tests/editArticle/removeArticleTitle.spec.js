import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/article/createNewArticle';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(
  async ({
    page,
    user,
    articleWithoutTags,
    homePage,
    viewArticlePage,
    createArticlePage,
  }) => {
    await signUpUser(page, user);
    await createArticle(
      articleWithoutTags,
      homePage,
      viewArticlePage,
      createArticlePage,
    );
  },
);

test('Remove title for article', async ({
  viewArticlePage,
  editArticlePage,
}) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.removeTitle();
  await editArticlePage.clickUpdateArticleButton();
  await editArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});
