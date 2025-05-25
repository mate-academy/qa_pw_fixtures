import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { faker } from '@faker-js/faker';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

let newTag = faker.lorem.words();

test.beforeEach(async ({ user, articleWithTwoTags, page, homePage }) => {
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, articleWithTwoTags);
});

test('Add the tag for the existing article with tags', async ({
  viewArticlePage,
  createArticlePage,
  editArticlePage,
}) => {
  await viewArticlePage.clickEditArticleButton();

  await createArticlePage.fillTagField(newTag);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForNavigationAndReload();

  await viewArticlePage.assertArticleTagIsVisible(newTag);
});
