import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user, articleWithTwoTags }) => {

  await signUpUser(page, user);
  await createNewArticle(page, articleWithTwoTags);
});

test('Remove an article tag for existing article with tags', 
  async ({ page, viewArticlePage, editArticlePage, articleWithTwoTags }) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.removeAllTags(articleWithTwoTags.tags);
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(articleWithTwoTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithTwoTags.text);
  await page.reload({ waitUntil: 'commit' });
  await viewArticlePage.assertTagsAreNotVisible(articleWithTwoTags.tags);
});
