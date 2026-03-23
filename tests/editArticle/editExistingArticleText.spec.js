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

test('Edit text for article', async ({
  viewArticlePage,
  editArticlePage,
  articleWithoutTags,
}) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.editArticleText(articleWithoutTags);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
});
