import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { editArticle } from '../../src/ui/actions/article/editArticle';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user, homePage, articleWithoutTags }) => {
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, articleWithoutTags);
});

test('Edit the article title for the existing article', async ({ page, viewArticlePage }) => {
  const newTitle = faker.lorem.words();

  await editArticle(page, { title: newTitle });

  await viewArticlePage.assertArticleTitleIsVisible(newTitle);
});
