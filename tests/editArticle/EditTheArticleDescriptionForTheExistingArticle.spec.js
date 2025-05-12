import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { faker } from '@faker-js/faker';

const newDescription = faker.lorem.sentence();

test.beforeEach(async ({ page, user, articleWithoutTags, homePage }) => {
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, articleWithoutTags);
});

test('Edit the article description for the existing article', async ({ 
  viewArticlePage,
  createArticlePage,
  homePage,
  articleWithoutTags
}) => {
  await viewArticlePage.clickEditArticleButton();
  await createArticlePage.fillDescriptionField(newDescription);
  await createArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTitleContainsText(articleWithoutTags.title);
  await homePage.open();
  await homePage.clickGlobalFeedTab();
  await homePage.assertArticlePreviewToContainText(newDescription);
});

test.afterEach(async ({ page }) => {
  await page.close();
});