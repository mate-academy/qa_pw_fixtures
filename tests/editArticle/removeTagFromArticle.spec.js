import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/article/createNewArticle';

let tagToRemove;

test.beforeEach(
  async ({
    page,
    user,
    articleWithTwoTags,
    homePage,
    viewArticlePage,
    createArticlePage,
  }) => {
    await signUpUser(page, user);
    await createArticle(
      articleWithTwoTags,
      homePage,
      viewArticlePage,
      createArticlePage,
    );
    tagToRemove = articleWithTwoTags.tags[0];
  },
);

test('Remove tag from article', async ({
  viewArticlePage,
  editArticlePage,
}) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.removeArticleTag(tagToRemove);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.verifyThatTagRemoved(tagToRemove);
});
