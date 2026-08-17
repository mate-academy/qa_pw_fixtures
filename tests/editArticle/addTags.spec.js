import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';


test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test.describe('Add tags', () => {
test('Add the tag for the existing article without tags', 
  async ({ page, article, editArticlePage, viewArticlePage}) => {
  const articleData = article(0);
  await createNewArticle(page, articleData);
  
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTagsField([articleData.newTag]);
  await editArticlePage.clickUpdateButton();
  await page.waitForTimeout(5000);
  await page.reload();
  await page.waitForTimeout(5000);
  await viewArticlePage.assertArticleTagIsVisible([articleData.newTag]);
  
  
});

test('Add the tag for the existing article with tags', 
  async ({ page, article, editArticlePage, viewArticlePage}) => {
  const articleData = article(3);
  await createNewArticle(page, articleData);

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTagsField([articleData.newTag]);
  await editArticlePage.clickUpdateButton();
  const expectedTags = ([...articleData.tags, articleData.newTag]);
  await page.waitForTimeout(5000);
  await page.reload();
  await page.waitForTimeout(5000);
  await viewArticlePage.assertArticleTagIsVisible(expectedTags);
  
});
});