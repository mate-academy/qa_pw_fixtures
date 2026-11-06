import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(
  async ({ page, user, homePage, viewArticlePage, articleWithOneTag }) => {
    await signUpUser(page, user);

    await homePage.clickNewArticleLink();
    await createNewArticle(page, articleWithOneTag);
    await viewArticlePage.assertArticleTagsAreVisible(articleWithOneTag.tags);
  },
);

test('Remove an article tag for the existing article with tag', async ({
  viewArticlePage,
  createArticlePage,
  articleWithOneTag,
}) => {
  await viewArticlePage.clickEditArticleLink();
  await createArticlePage.clickRemoveTagButton(articleWithOneTag.tags[0]);
  await createArticlePage.clickUpdateArticleButton();
  await viewArticlePage.reload();
  await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage.assertArticleTagsAreNotVisible(articleWithOneTag.tags);
});
