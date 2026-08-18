import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';



test.describe('Edit Article', () => {
test.beforeEach(async ({ page, user, articleWithoutTags }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);
});

test('Edit the article title for the existing article', 
  async ({ page, viewArticlePage, editArticlePage, articleWithoutTags }) => {
    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.fillTitleField(articleWithoutTags.newTitle);
    await editArticlePage.clickUpdateButton();
    await page.waitForTimeout(5000);
    await page.reload();
    await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.newTitle);
});

test('Edit the article description for the existing article', 
  async ({ page, viewArticlePage, editArticlePage, headerPage, viewProfilePage, articleWithoutTags }) => {
    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.fillDescriptionField(articleWithoutTags.newDescription);
    await editArticlePage.clickUpdateButton();
    await headerPage.clickProfileLink(); 
    await page.reload();
    await page.waitForTimeout(5000);
    await viewProfilePage.assertArticleDescription(articleWithoutTags.newDescription);
});

test('Edit the article text for the existing article', 
  async ({ page, viewArticlePage, editArticlePage, articleWithoutTags }) => {
    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.fillTextField(articleWithoutTags.newText);
    await editArticlePage.clickUpdateButton();
    await page.waitForTimeout(5000);
    await page.reload();
    await page.waitForTimeout(5000);
    await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.newText);
});
});