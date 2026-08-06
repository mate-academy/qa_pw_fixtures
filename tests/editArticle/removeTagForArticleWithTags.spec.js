import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user, articleWithOneTag }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithOneTag);
});

test('Remove article tag for article with tags', async ({
  editArticlePage,
  viewArticlePage,
  articleWithOneTag,
}) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.removeTag();
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTagIsNotVisible(articleWithOneTag.tags[0]);
});
