import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { faker } from '@faker-js/faker';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

let newDescription = faker.lorem.words();

test.beforeEach(async ({ user, articleWithoutTags, page, homePage }) => {
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, articleWithoutTags);
});

test('Edit the article description for the existing article', async ({
  viewArticlePage,
  editArticlePage,
  homePage,
}) => {
  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.editDescriptionField(newDescription);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForNavigationAndReload();

  await homePage.open();
  await homePage.clickGlobalFeedTab();

  await homePage.assertArticleDescriptionIsVisible(newDescription);
});
