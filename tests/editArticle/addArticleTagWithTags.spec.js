import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(
  async ({
    page,
    user,
    articleWithOneTag,
    homePage,
    viewArticlePage,
    createArticlePage,
  }) => {
    await signUpUser(page, user);
    await createArticle(
      articleWithOneTag,
      homePage,
      viewArticlePage,
      createArticlePage,
    );
  },
);

test('Edit tag for article if there tags', async ({
  viewArticlePage,
  editArticlePage,
  articleWithTwoTags,
}) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.editArticleTags(articleWithTwoTags);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTagsAreVisible(articleWithTwoTags.tags);
});
