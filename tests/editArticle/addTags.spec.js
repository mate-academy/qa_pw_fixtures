import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';


test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test.describe('Add tags', () => {
test('Add the tag for the existing article without tags', 
  async ({ page, articleWithoutTags, editArticlePage, viewArticlePage}) => {
  await createNewArticle(page, articleWithoutTags);
  
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTagsField([articleWithoutTags.newTag]);
  await editArticlePage.clickUpdateButton();
  await page.waitForTimeout(5000);
  await page.reload();
  await page.waitForTimeout(5000);
  await viewArticlePage.assertArticleTagIsVisible([articleWithoutTags.newTag]);
  
  
});

test('Add the tag for the existing article with tags', 
  async ({ page, articleWithOneTag, editArticlePage, viewArticlePage}) => {
  await createNewArticle(page, articleWithOneTag);

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTagsField([articleWithOneTag.newTag]);
  await editArticlePage.clickUpdateButton();
  const expectedTags = ([...articleWithOneTag.tags, articleWithOneTag.newTag]);
  await page.waitForTimeout(5000);
  await page.reload();
  await page.waitForTimeout(5000);
  await viewArticlePage.assertArticleTagIsVisible(expectedTags);
  
});
});