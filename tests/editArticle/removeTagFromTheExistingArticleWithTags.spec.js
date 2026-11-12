import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user, articleWithOneTag }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithOneTag);
});

test('Add the tag for the existing article with tags', async ({
  viewArticlePage,
  createArticlePage,
  articleWithOneTag,
}) => {
  await viewArticlePage.clickEditArticleButton();

  await createArticlePage.clickDeleteTagIcon();
  await createArticlePage.clickUpdateArticleButton();

  await viewArticlePage.assertArticleTagIsHidden(articleWithOneTag.tags);
});
