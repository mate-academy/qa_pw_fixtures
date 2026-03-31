import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user, articleWithOneTag }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithOneTag);
});

test('Edit article text for existing article', 
  async ({ page, articleWithOneTag, articleWithoutTags, 
    viewArticlePage, editArticlePage }) => {
  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.fillTextField(articleWithoutTags.text);
  await editArticlePage.clickUpdateArticleButton();
  
  await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  await page.reload({ waitUntil: 'commit' });
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertTagsAreVisible(articleWithOneTag.tags);
});
