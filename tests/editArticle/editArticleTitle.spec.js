import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { faker } from '@faker-js/faker';

let newTitle;

test.beforeEach(async ({ page, user, createArticlePage, viewArticlePage, articleWithoutTags }) => {
  newTitle = faker.lorem.words();

  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);
});

test('Edit the article title for the existing article', async ({ viewArticlePage, createArticlePage }) => {
  await viewArticlePage.clickEditArticleLink();
  await createArticlePage.fillTitleField(newTitle);
  await createArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTitleIsVisible(newTitle);
});