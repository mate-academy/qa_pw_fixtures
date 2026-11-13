import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user, articleWithOneTag }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithOneTag);
});

test('Remove tag from the existing article with tags', async ({
  viewArticlePage,
  editArticlePage,
  articleWithOneTag,
}) => {
  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.clickDeleteTagIcon();
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.assertArticleTagIsHidden(articleWithOneTag.tags);
});
