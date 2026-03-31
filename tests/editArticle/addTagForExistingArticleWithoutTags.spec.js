import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user, articleWithoutTags }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);
});

test('Add tag for existing article without tags', 
  async ({ page, articleWithoutTags,articleWithOneTag, 
    viewArticlePage, editArticlePage }) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTagsField(articleWithOneTag.tags);
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await page.reload({waitUntil: 'commit'});
  await viewArticlePage.assertTagsAreVisible(articleWithOneTag.tags);
});
