import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { faker } from '@faker-js/faker';

let newDescription;

test.beforeEach(async ({ page, user, createArticlePage, viewArticlePage, articleWithoutTags }) => {
  newDescription = faker.lorem.sentence(4);

  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);
});

test('Edit the article description for the existing article', async ({ viewArticlePage, createArticlePage }) => {
  await viewArticlePage.clickEditArticleLink();
  await createArticlePage.fillDescriptionField(newDescription);
  await createArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleDescriptionIsNotVisible(newDescription);
});