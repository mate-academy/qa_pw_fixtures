import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user, articleWithTwoTags }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithTwoTags);
});

test('Add tag for existing article with tags', 
  async ({ page, articleWithTwoTags, articleWithOneTag, 
    viewArticlePage, editArticlePage }) => {
  const expectedAllTags = [...articleWithTwoTags.tags, 
    ...articleWithOneTag.tags];
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.waitForTagsVisible(articleWithTwoTags.tags);
  await editArticlePage.fillTagsField(articleWithOneTag.tags);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTitleIsVisible(articleWithTwoTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithTwoTags.text);
  await page.reload({ waitUntil: 'commit' });
  await viewArticlePage.assertTagsAreVisible(expectedAllTags);
});
