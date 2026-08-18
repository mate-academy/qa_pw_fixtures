import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import {
  TITLE_CANNOT_BE_EMPTY,
  DESC_CANNOT_BE_EMPTY,
  BODY_CANNOT_BE_EMPTY
} from '../../src/ui/constants/articleErrorMessages';



test.describe('Remove fields', () => {
test.beforeEach(async ({ page, user, articleWithOneTag }) => {

  await signUpUser(page, user);
  await createNewArticle(page, articleWithOneTag);
});

test('Remove an article tag for the existing article with tag', 
  async ({ page, viewArticlePage, editArticlePage, articleWithOneTag }) => {
 await viewArticlePage.clickEditArticleButton();
 await editArticlePage.clickRemoveTagButton(0);
 await editArticlePage.clickUpdateButton();
 await page.reload();
 await page.waitForTimeout(5000);
 await viewArticlePage.assertTagIsRemoved(articleWithOneTag.tags[0]);
});

test('Remove an article title for the existing article', 
  async ({ viewArticlePage, editArticlePage }) => {
    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.removeArticleTitle();
    await editArticlePage.clickUpdateButton();
    await editArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});

test('Remove an article description for the existing article', 
  async ({ viewArticlePage, editArticlePage }) => {
    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.removeArticleDescription();
    await editArticlePage.clickUpdateButton();
    await editArticlePage.assertErrorMessageContainsText(DESC_CANNOT_BE_EMPTY);
});

test('Remove the article body for the existing article', 
  async ({ viewArticlePage, editArticlePage }) => {
    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.removeArticleBody();
    await editArticlePage.clickUpdateButton();
    await editArticlePage.assertErrorMessageContainsText(BODY_CANNOT_BE_EMPTY);
});
});