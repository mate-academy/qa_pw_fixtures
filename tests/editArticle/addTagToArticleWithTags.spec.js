import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { editArticle } from '../../src/ui/actions/article/editArticle';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user, homePage, articleWithTwoTags }) => {
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, articleWithTwoTags);
});

test('Add the tag for the existing article with tags', async ({ page, viewArticlePage, articleWithTwoTags }) => {
  const newTag = faker.lorem.word();

  await editArticle(page, { addTags: [newTag] });

  await viewArticlePage.assertTagIsVisible(newTag);
  await viewArticlePage.assertTagIsVisible(articleWithTwoTags.tags[0]);
  await viewArticlePage.assertTagIsVisible(articleWithTwoTags.tags[1]);
});
