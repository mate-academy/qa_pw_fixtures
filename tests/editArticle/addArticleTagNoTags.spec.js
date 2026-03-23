import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/article/createNewArticle';

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

test('Edit tag for article if no tags', async ({
  viewArticlePage,
  editArticlePage,
  articleWithTwoTags,
}) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.editArticleTags(articleWithTwoTags);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTagsAreVisible(articleWithTwoTags.tags);
});
