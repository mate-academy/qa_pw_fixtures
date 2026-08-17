import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';



test.describe('Edit Article', () => {
  let articleData;
test.beforeEach(async ({ page, user, article }) => {
  articleData = article();
  await signUpUser(page, user);
  await createNewArticle(page, articleData);
});

test('Edit the article title for the existing article', 
  async ({ page, viewArticlePage, editArticlePage }) => {
    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.fillTitleField(articleData.newTitle);
    await editArticlePage.clickUpdateButton();
    await page.waitForTimeout(5000);
    await page.reload();
    await viewArticlePage.assertArticleTitleIsVisible(articleData.newTitle);
});

test('Edit the article description for the existing article', 
  async ({ page, viewArticlePage, editArticlePage, headerPage, viewProfilePage }) => {
    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.fillDescriptionField(articleData.newDescription);
    await editArticlePage.clickUpdateButton();
    await headerPage.clickProfileLink(); 
    await page.reload();
    await page.waitForTimeout(5000);
    await viewProfilePage.assertArticleDescription(articleData.newDescription);
});

test('Edit the article text for the existing article', 
  async ({ page, viewArticlePage, editArticlePage }) => {
    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.fillTextField(articleData.newText);
    await editArticlePage.clickUpdateButton();
    await page.waitForTimeout(5000);
    await page.reload();
    await page.waitForTimeout(5000);
    await viewArticlePage.assertArticleTextIsVisible(articleData.newText);
});
});