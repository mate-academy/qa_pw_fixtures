import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { editArticle } from '../../src/ui/actions/article/editArticle';

test.beforeEach(async ({ page, user, homePage, articleWithOneTag }) => {
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, articleWithOneTag);
});

test('Remove an article tag for the existing article with tag', async ({ page, viewArticlePage, articleWithOneTag }) => {
  const tagToRemove = articleWithOneTag.tags[0];

  await editArticle(page, { removeTags: [tagToRemove] });

  await viewArticlePage.assertTagIsNotVisible(tagToRemove);
});
