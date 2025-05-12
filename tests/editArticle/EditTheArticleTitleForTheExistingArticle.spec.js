import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

const newTitle = 'New title';

test.beforeEach(async ({ page, user, articleWithoutTags, homePage  }) => {
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, articleWithoutTags);
});

test('Edit the article title for the existing article', async ({viewArticlePage, createArticlePage, articleWithoutTags}) => {
  await viewArticlePage.clickEditArticleButton();
  await createArticlePage.fillTitleField(newTitle);
  await createArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTitleContainsText(articleWithoutTags.title);
  await viewArticlePage.reload();
  await viewArticlePage.assertArticleTitleContainsText(newTitle);
});

test.afterEach(async ({ page }) => {
  await page.close();
});