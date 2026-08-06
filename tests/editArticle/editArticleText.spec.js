import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user, articleWithOneTag }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithOneTag);
});

test('Edit article text for existing article', async ({
  editArticlePage,
  viewArticlePage,
}) => {
  const text = faker.lorem.sentences(2);

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.editTextField(text);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTextIsVisible(text);
});
