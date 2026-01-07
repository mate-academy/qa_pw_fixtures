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

test('Add the tag for the existing article without tags', async ({ page, viewArticlePage }) => {
  const newTag = faker.lorem.word();

  await editArticle(page, { addTags: [newTag] });

  await viewArticlePage.assertTagIsVisible(newTag);
});
