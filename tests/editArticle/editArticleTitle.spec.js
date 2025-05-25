import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { faker } from '@faker-js/faker';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

let newTitle = faker.lorem.words();

test.beforeEach(async ({ user, articleWithoutTags, page, homePage }) => {
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, articleWithoutTags);
});

test('Edit the article title for the existing article', async ({
  viewArticlePage,
  editArticlePage,
}) => {
  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.editTitleField(newTitle);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForNavigationAndReload();

  await viewArticlePage.assertArticleTitleIsVisible(newTitle);
});
