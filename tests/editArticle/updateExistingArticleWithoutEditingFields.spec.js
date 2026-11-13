import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user, articleWithOneTag }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithOneTag);
});

// eslint-disable-next-line max-len
test('Click the [Update] button without editing fields of the existing article with tags', async ({
  viewArticlePage,
  editArticlePage,
  articleWithOneTag,
}) => {
  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.waitFor();
  await viewArticlePage.reload();
  await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithOneTag.text);
  await viewArticlePage.assertArticleTagListIsVisible(articleWithOneTag.tags);
});
