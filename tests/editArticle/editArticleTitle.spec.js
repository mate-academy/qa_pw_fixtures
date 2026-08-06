import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user, articleWithOneTag }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithOneTag);
});

test('Edit the article title for existing article', async ({
  editArticlePage,
  viewArticlePage,
}) => {
  const title = faker.lorem.words();

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.editTitleField(title);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTitleIsVisible(title);
});
